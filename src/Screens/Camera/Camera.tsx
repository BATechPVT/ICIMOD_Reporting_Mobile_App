import { useIsFocused } from "@react-navigation/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
} from "react-native-gesture-handler";
import { PressableOpacity } from "react-native-pressable-opacity";
import Reanimated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Camera,
  CameraCaptureError,
  CameraDeviceFormat,
  CameraRuntimeError,
  FrameProcessorPerformanceSuggestion,
  PhotoFile,
  VideoFile,
  frameRateIncluded,
  sortFormats,
  useCameraDevices,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  CONTENT_SPACING,
  MAX_ZOOM_FACTOR,
  SAFE_AREA_PADDING,
} from "./Constants";
import type { Routes } from "./Routes";
import { examplePlugin } from "./frame-processors/ExamplePlugin";
import { useIsForeground } from "./hooks/useIsForeground";
import { StatusBarBlurBackground } from "./views/StatusBarBlurBackground";

import { useUpdateEffect } from "react-use";
import ErrorAlert from "../../Components/ErrorAlerts";
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const SCALE_FULL_ZOOM = 3;
const BUTTON_SIZE = 40;

type Props = NativeStackScreenProps<Routes, "CameraPage">;
export function CameraPage(props: any) {
  const camera = useRef<Camera>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const zoom = useSharedValue(0);
  const isPressingButton = useSharedValue(true);

  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocussed && isForeground;

  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back"
  );
  const [enableHdr, setEnableHdr] = useState(false);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [enableNightMode, setEnableNightMode] = useState(false);
  const selectedType: string = props.route.params.selectedKingdom;
  // camera format settings
  const devices = useCameraDevices();
  const device = devices[cameraPosition];
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats == null) return [];
    return device.formats.sort(sortFormats);
  }, [device?.formats]);

  //#region Memos
  const [is60Fps, setIs60Fps] = useState(true);
  const fps = useMemo(() => {
    if (!is60Fps) return 30;

    if (enableNightMode && !device?.supportsLowLightBoost) {
      // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
      return 30;
    }

    const supportsHdrAt60Fps = formats.some(
      (f) =>
        f.supportsVideoHDR &&
        f.frameRateRanges.some((r) => frameRateIncluded(r, 60))
    );
    if (enableHdr && !supportsHdrAt60Fps) {
      // User has enabled HDR, but HDR is not supported at 60 FPS.
      return 30;
    }

    const supports60Fps = formats.some((f) =>
      f.frameRateRanges.some((r) => frameRateIncluded(r, 60))
    );
    if (!supports60Fps) {
      // 60 FPS is not supported by any format.
      return 30;
    }
    // If nothing blocks us from using it, we default to 60 FPS.
    return 60;
  }, [
    device?.supportsLowLightBoost,
    enableHdr,
    enableNightMode,
    formats,
    is60Fps,
  ]);

  const supportsCameraFlipping = useMemo(
    () => devices.back != null && devices.front != null,
    [devices.back, devices.front]
  );
  const supportsFlash = device?.hasFlash ?? false;
  const supportsHdr = useMemo(
    () => formats.some((f) => f.supportsVideoHDR || f.supportsPhotoHDR),
    [formats]
  );
  const supports60Fps = useMemo(
    () =>
      formats.some((f) =>
        f.frameRateRanges.some((rate) => frameRateIncluded(rate, 60))
      ),
    [formats]
  );
  const canToggleNightMode = enableNightMode
    ? true // it's enabled so you have to be able to turn it off again
    : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS
  //#endregion

  const format = useMemo(() => {
    let result = formats;
    if (enableHdr) {
      // We only filter by HDR capable formats if HDR is set to true.
      // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
      result = result.filter((f) => f.supportsVideoHDR || f.supportsPhotoHDR);
    }

    // find the first format that includes the given FPS
    return result.find((f) =>
      f.frameRateRanges.some((r) => frameRateIncluded(r, fps))
    );
  }, [formats, fps, enableHdr]);

  //#region Animated Zoom
  // This just maps the zoom factor to a percentage value.
  // so e.g. for [min, neutr., max] values [1, 2, 128] this would result in [0, 0.0081, 1]
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);
  //#endregion

  //#region Callbacks
  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton]
  );
  // Camera callbacks
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(() => {
    console.log("Camera initialized!");
    setIsCameraInitialized(true);
  }, []);
  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: "photo" | "video") => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      // navigation.navigate('MediaPage', {
      //   path: media.path,
      //   type: type,
      // });
    },
    [props.navigation]
  );
  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === "back" ? "front" : "back"));
  }, []);
  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === "off" ? "on" : "off"));
  }, []);
  //#endregion

  //#region Tap Gesture
  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);
  //#endregion

  //#region Effects
  const neutralZoom = device?.neutralZoom ?? 1;
  useEffect(() => {
    // Run everytime the neutralZoomScaled value changes. (reset zoom when device changes)
    zoom.value = neutralZoom;
  }, [neutralZoom, zoom]);

  useEffect(() => {
    Camera.getMicrophonePermissionStatus().then((status) =>
      setHasMicrophonePermission(status === "authorized")
    );
    Camera.getCameraPermissionStatus().then((status) => {
      if (status !== "authorized") {
        requestCameraPermission();
      }
      console.log("status ", status);
    });
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Bipp App Camera Permission",
          message:
            "Bipp App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        setErrorMessage(
          "Camera Permission is mandatory.Please allow camera permission from app setting. "
        );
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //#endregion

  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
  const onPinchGesture = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    { startZoom?: number }
  >({
    onStart: (_, context) => {
      context.startZoom = zoom.value;
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0;
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP
      );
      zoom.value = interpolate(
        scale,
        [-1, 0, 1],
        [minZoom, startZoom, maxZoom],
        Extrapolate.CLAMP
      );
    },
  });
  //#endregion

  if (device != null && format != null) {
    console.log(
      `Re-rendering camera page with ${
        isActive ? "active" : "inactive"
      } camera. ` +
        `Device: "${device.name}" (${format.photoWidth}x${format.photoHeight} @ ${fps}fps)`
    );
  } else {
    console.log("re-rendering camera page without active camera");
  }

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const values = examplePlugin(frame);
    console.log(`Return Values: ${JSON.stringify(values)}`);
  }, []);

  const onFrameProcessorSuggestionAvailable = useCallback(
    (suggestion: FrameProcessorPerformanceSuggestion) => {
      console.log(
        `Suggestion available! ${suggestion.type}: Can do ${suggestion.suggestedFrameProcessorFps} FPS`
      );
    },
    []
  );

  const onPress = useCallback(async () => {
    try {
      const photo = await camera.current.takeSnapshot({
        quality: 80,
        skipMetadata: true
      });
      console.log("file://" + photo?.path);
      setPhoto("file://" + photo?.path);
    } catch (e) {
      if (e instanceof CameraCaptureError) {
        switch (e.code) {
          case "capture/file-io-error":
            console.error("Failed to write photo to disk!");
            break;
          default:
            console.error(e);
            break;
        }
      }
    }
  }, [camera]);

  useUpdateEffect(() => {
    if (errorMessage !== "") {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
        setErrorMessage("");
        props.navigation.goBack("");
      }, 3000);
    }
  }, [errorMessage && errorMessage !== ""]);
  return (
    <>
      <View style={styles.container}>
        {photo == null ? (
          <View style={{ flex: 1 }}>
            {device != null && (
              <PinchGestureHandler
                onGestureEvent={onPinchGesture}
                enabled={isActive}
              >
                <Reanimated.View style={StyleSheet.absoluteFill}>
                  <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
                    <ReanimatedCamera
                      ref={camera}
                      style={StyleSheet.absoluteFill}
                      device={device}
                      format={format}
                      fps={fps}
                      hdr={enableHdr}
                      lowLightBoost={
                        device.supportsLowLightBoost && enableNightMode
                      }
                      isActive={isActive}
                      onInitialized={onInitialized}
                      onError={onError}
                      enableZoomGesture={false}
                      animatedProps={cameraAnimatedProps}
                      photo={true}
                      // video={true}
                      audio={hasMicrophonePermission}
                      // frameProcessor={device.supportsParallelVideoProcessing ? frameProcessor : undefined}
                      orientation="portrait"
                      frameProcessorFps={1}
                      onFrameProcessorPerformanceSuggestionAvailable={
                        onFrameProcessorSuggestionAvailable
                      }
                    />
                  </TapGestureHandler>
                </Reanimated.View>
              </PinchGestureHandler>
            )}
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                bottom: SAFE_AREA_PADDING.paddingBottom + 20,
              }}
            >
              <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <View
                  style={{
                    backgroundColor: "#189A61",
                    height: 80,
                    width: 80,
                    borderRadius: 80,
                  }}
                ></View>
              </TouchableOpacity>
            </View>

            {/* <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? flash : 'off'}
        enabled={isCameraInitialized && isActive}
        setIsPressingButton={setIsPressingButton}
      /> */}

            <StatusBarBlurBackground />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: SAFE_AREA_PADDING.paddingRight,
                top: SAFE_AREA_PADDING.paddingTop,
              }}
            >
              <PressableOpacity
                style={styles.button}
                onPress={() => props.navigation.goBack("")}
                disabledOpacity={0.4}
              >
                <AntDesign name="arrowleft" color={"#189A61"} size={24} />
              </PressableOpacity>
            </View>
            <View style={styles.rightButtonRow}>
              {supportsCameraFlipping && (
                <PressableOpacity
                  style={styles.button}
                  onPress={onFlipCameraPressed}
                  disabledOpacity={0.4}
                >
                  <IonIcon name="camera-reverse" color="white" size={24} />
                </PressableOpacity>
              )}
              {supportsFlash && (
                <PressableOpacity
                  style={styles.button}
                  onPress={onFlashPressed}
                  disabledOpacity={0.4}
                >
                  <IonIcon
                    name={flash === "on" ? "flash" : "flash-off"}
                    color="white"
                    size={24}
                  />
                </PressableOpacity>
              )}
              {supports60Fps && (
                <PressableOpacity
                  style={styles.button}
                  onPress={() => setIs60Fps(!is60Fps)}
                >
                  <Text style={styles.text}>
                    {is60Fps ? "60" : "30"}
                    {"\n"}FPS
                  </Text>
                </PressableOpacity>
              )}
              {supportsHdr && (
                <PressableOpacity
                  style={styles.button}
                  onPress={() => setEnableHdr((h) => !h)}
                >
                  <MaterialIcon
                    name={enableHdr ? "hdr" : "hdr-off"}
                    color="white"
                    size={24}
                  />
                </PressableOpacity>
              )}
              {canToggleNightMode && (
                <PressableOpacity
                  style={styles.button}
                  onPress={() => setEnableNightMode(!enableNightMode)}
                  disabledOpacity={0.4}
                >
                  <IonIcon
                    name={enableNightMode ? "moon" : "moon-outline"}
                    color="white"
                    size={24}
                  />
                </PressableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={{ uri: photo }}
              resizeMode="cover"
              style={{ flex: 1, justifyContent: "flex-start" }}
            >
              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  bottom: SAFE_AREA_PADDING.paddingBottom + 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  width: widthPercentageToDP(100),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setPhoto(null)}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      height: 80,
                      width: 80,
                      borderRadius: 80,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Entypo name="cross" size={34} color={"#189A61"} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate("ForestForm", {
                      siteImage: photo,
                      selectedType,
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#189A61",
                      height: 80,
                      width: 80,
                      borderRadius: 80,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign name="arrowright" size={24} color={"white"} />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      </View>
      {errorAlert && (
        <ErrorAlert
          text="Error!"
          description={errorMessage}
          show={errorAlert}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  captureButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "rgba(140, 140, 140, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  rightButtonRow: {
    position: "absolute",
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
});
