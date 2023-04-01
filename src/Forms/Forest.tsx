import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  BackHandler,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { BASE_URL } from "../Config/URLs";
import Geolocation from "@react-native-community/geolocation";
import Feather from "react-native-vector-icons/Feather";
import { InteractiveCell } from "../Components/InteractiveCell";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SheetHeader } from "../Components/BottomSheetHeader";
import PickerComponent from "../Components/Picker";
import { useUpdateEffect } from "react-use";
import { ThemeContext } from "../../theme/theme-context";
import { FontSizes } from "../../theme/FontSizes";
import { Button } from "../Components/Button";
const { height, width } = Dimensions.get("screen");

const ForestForm = ({ navigation, route }) => {
  const { siteImage } = route.params;

  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [division, setDivision] = useState("Loading Division");
  const [DivisionValue, setDivisionValue] = useState(null);
  const [DistrictValue, setDistrictValue] = useState(null);
  const [TehsilValue, setTehsilValue] = useState("");
  const [SiteTypeValue, setSiteTypeValue] = useState(null);
  const [siteName, setSiteName] = useState("");
  const [village, setVillage] = useState("");
  const [area, setArea] = useState("");
  const [UnitValue, setUnitValue] = useState(null);

  const [errorMessages, setErrorMessages] = useState({
    division: "",
    district: "",
    tehsil: "",
    siteType: "",
    siteName: "",
    village: "",
    area: "",
    areaUnit: "",
  });
  const bottomSheetRef = useRef(null);
  const [sheetData, setSheetData] = React.useState({
    activeIndex: "Division",
    data: [],
  });

  const [count, setCount] = useState(1);

  const [lat1, setLat1] = useState(0);
  const [long1, setLong1] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [long2, setLong2] = useState(0);
  const [lat3, setLat3] = useState(0);
  const [long3, setLong3] = useState(0);
  const [lat4, setLat4] = useState(0);
  const [long4, setLong4] = useState(0);
  const [lat5, setLat5] = useState(0);
  const [long5, setLong5] = useState(0);
  const [lat6, setLat6] = useState(0);
  const [long6, setLong6] = useState(0);
  const [lat7, setLat7] = useState(0);
  const [long7, setLong7] = useState(0);
  const [lat8, setLat8] = useState(0);
  const [long8, setLong8] = useState(0);
  const [lat9, setLat9] = useState(0);
  const [long9, setLong9] = useState(0);
  const [lat10, setLat10] = useState(0);
  const [long10, setLong10] = useState(0);

  const counter = () => {
    if (count <= 10) {
      switch (count) {
        case 1:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation1", position);
              setCount(count + 1);
              setLong1(position.coords.longitude);
              setLat1(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation1 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 2:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation2", position);
              setCount(count + 1);
              setLong2(position.coords.longitude);
              setLat2(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation2 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 3:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation3", position);
              setCount(count + 1);
              setLong3(position.coords.longitude);
              setLat3(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation3 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 4:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation4", position);
              setCount(count + 1);
              setLong4(position.coords.longitude);
              setLat4(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation4 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 5:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation5", position);
              setCount(count + 1);
              setLong5(position.coords.longitude);
              setLat5(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation5 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 6:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation6", position);
              setCount(count + 1);
              setLong6(position.coords.longitude);
              setLat6(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation6 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 7:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation7", position);
              setCount(count + 1);
              setLong7(position.coords.longitude);
              setLat7(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation7 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 8:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation8", position);
              setCount(count + 1);
              setLong8(position.coords.longitude);
              setLat8(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation8 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 9:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation9", position);
              setCount(count + 1);
              setLong9(position.coords.longitude);
              setLat9(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation9 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        case 10:
          Geolocation.getCurrentPosition(
            (position) => {
              console.log("getLocation10", position);
              setCount(count + 1);
              setLong10(position.coords.longitude);
              setLat10(position.coords.latitude);
            },
            (error) => {
              alert(error.message);
              console.log("getLocation10 Location Denied");
            },
            {
              timeout: 1000,
            }
          );
          break;
        default:
          null;
      }
    } else {
      alert("You have reached limit");
    }
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Are you sure?", "Your current progress will be lost.", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("DashBoard") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const SubmitFunction = () => {
    if (lat1 == 0 || lat2 == 0 || lat3 == 0 || lat4 == 0 || lat5 == 0) {
      Alert.alert("Failure", "Please  Select atleast five points.", [
        {
          text: "OK",
          onPress: () => {
            null;
          },
        },
      ]);
    } else {
      setIsLoading(true);
      const data = {
        point1LongitudeX: long1,
        point1LattitudeY: lat1,

        point2LongitudeX: long2,
        point2LattitudeY: lat2,

        point3LongitudeX: long3,
        point3LattitudeY: lat3,

        point4LongitudeX: long4,
        point4LattitudeY: lat4,

        point5LongitudeX: long5,
        point5LattitudeY: lat5,

        point6LongitudeX: long5,
        point6LattitudeY: lat5,

        point7LongitudeX: long5,
        point7LattitudeY: lat5,

        point8LongitudeX: long5,
        point8LattitudeY: lat5,

        point9LongitudeX: long5,
        point9LattitudeY: lat5,

        point10LongitudeX: long5,
        point10LattitudeY: lat5,

        division: DivisionValue?.id,
        district: DistrictValue?.id,
        tehsil: TehsilValue?.id,
        siteType: SiteTypeValue?.id,
        siteName: siteName,
        village: village,
        area: area,
        unit: UnitValue?.id,
        siteImage: siteImage,
        siteId: 0,
        siteDetailId: 0,
        forestDivisionId: division,
        name: siteName,
        villageNeighborhood: village,
        shapeFile: siteImage,
      };
      axios({
        method: "post",
        url: baseurl + "forest/addsite",
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("success ", response);
          setIsLoading(false);
          Alert.alert("Success", response.data, [
            {
              text: "OK",
              onPress: () => {
                navigation.replace("DashBoard");
              },
            },
          ]);
        })
        .catch((error) => {
          console.log("error ", error);
          setIsLoading(false);
        });
    }
  };

  // variables
  const snapPoints = useMemo(() => ["35%", "50%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    getUserInfo();
    const backAction = () => {
      Alert.alert("Are you sure?", "Your current progress will be lost.", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("DashBoard") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const getUserInfo = () => {
    try {
      axios
        .get(baseurl + "account/getuserinfo")
        .then((response) => {
          if (response.status === 200) {
            setDivision(response.data.division);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  {
    /*  Get Divisions' API*/
  }
  const GetDivision = async () => {
    try {
      axios
        .get(baseurl + "Forest/DivisionsList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "Division",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  {
    /*  Get Districts' API*/
  }
  const GetDistrict = async () => {
    try {
      axios
        .get(baseurl + "Forest/DistrictsList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "District",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  {
    /* Get Tehsil's API */
  }
  const GetTehsil = async () => {
    try {
      axios
        .get(baseurl + "Nursery/TehsilsList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "Tehsil",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  {
    /* Get Site Type's API */
  }
  const GetSiteType = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/SiteTypesList")
        .then((response) => {
          if (response.status === 200) {
            console.log("site type", response.data);
            setSheetData({
              activeIndex: "SiteType",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  {
    /* Get Unit's API */
  }
  const GetUnit = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/SelectUnitList")
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setSheetData({
              activeIndex: "Unit",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useUpdateEffect(() => {
    bottomSheetRef.current.present();
  }, [sheetData]);

  {
    /* NEXT Function */
  }

  const NextFunction = () => {
    var error = false;
    if (DivisionValue == "" || DivisionValue == null) {
      error = true;
      setErrorMessages({ ...errorMessages, division: "Please Select Divion" });
    } else if (DistrictValue == "" || DistrictValue == null) {
      error = true;
      console.log("district error");
      setErrorMessages({
        ...errorMessages,
        district: "Please Select District",
      });
    } else if (TehsilValue == "" || TehsilValue == null) {
      error = true;
      setErrorMessages({ ...errorMessages, tehsil: "Please Select Tehsil" });
    } else if (SiteTypeValue == "" || SiteTypeValue == null) {
      error = true;
      setErrorMessages({
        ...errorMessages,
        siteType: "Please Select Site Type",
      });
    } else if (siteName == "" || siteName == "") {
      error = true;
      setErrorMessages({
        ...errorMessages,
        siteName: "Please Enter Site Name",
      });
    } else if (village == "" || village == null) {
      error = true;
      setErrorMessages({
        ...errorMessages,
        village: "Please Enter Village Name",
      });
    } else if (area == "" || area == null) {
      error = true;
      setErrorMessages({ ...errorMessages, area: "Please Enter Area" });
    } else if (UnitValue == "" || UnitValue == null) {
      error = true;
      setErrorMessages({
        ...errorMessages,
        areaUnit: "Please Select Area Unit ",
      });
    }

    if (!error) {
      SubmitFunction();
    }
  };
  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        closeOnPress={true}
      />
    ),
    []
  );
  const onSelectValue = (value: any) => {
    bottomSheetRef.current.dismiss();
    switch (sheetData.activeIndex) {
      case "Division":
        setDivisionValue(value);
        setErrorMessages({ ...errorMessages, division: "" });
        break;
      case "District":
        setDistrictValue(value);
        setErrorMessages({ ...errorMessages, district: "" });
        break;
      case "Tehsil":
        setTehsilValue(value);
        setErrorMessages({ ...errorMessages, tehsil: "" });
        break;
      case "SiteType":
        setSiteTypeValue(value);
        setErrorMessages({ ...errorMessages, siteType: "" });
        break;
      case "Unit":
        setUnitValue(value);
        setErrorMessages({ ...errorMessages, areaUnit: "" });
        break;

      default:
        break;
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={[styles.mainContainer, { backgroundColor: theme.primary }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "Your current progress will be lost.",
                [
                  {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                  },
                  {
                    text: "YES",
                    onPress: () => navigation.goBack(""),
                  },
                ]
              );
            }}
          >
            <Feather name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => navigation.navigate("DashBoard")}
          >
            <Feather name="home" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontSize: FontSizes.extraLarge,
            fontWeight: "bold",
            marginVertical: 10,
            color: theme.buttonTitle,
          }}
        >
          Add Forest Site
        </Text>
        <View style={styles.Container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.requiredText}>
              All fields marked with an asterisk (*) are required
            </Text>
            {/* DIVISION */}
            <InteractiveCell
              title="Division"
              value={DivisionValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetDivision();
              }}
              errorMessage={errorMessages.division}
            />
            {/* DISTRICT */}
            <InteractiveCell
              title="District"
              value={DistrictValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetDistrict();
              }}
              errorMessage={errorMessages.district}
            />

            {/* TEHSIL */}
            <InteractiveCell
              title="Tehsil"
              value={TehsilValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetTehsil();
              }}
              errorMessage={errorMessages.tehsil}
            />

            {/* Site Type */}
            <InteractiveCell
              title="Site Type"
              value={SiteTypeValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSiteType();
              }}
              errorMessage={errorMessages.siteType}
            />

            {/* Site Name */}
            <View>
              <Text style={styles.sectionText}>Site Name *</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Site Name"}
                placeholderTextColor="#777"
                value={siteName}
                onChangeText={(siteName) => {
                  setSiteName(siteName);
                  setErrorMessages({
                    ...errorMessages,
                    siteName: "",
                  });
                }}
              />
              {errorMessages.siteName != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorMessages.siteName}
                </Text>
              )}
            </View>
            {/* Village */}
            <View>
              <Text style={styles.sectionText}>Village or Neighborhood *</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Village or Neighborhood"}
                placeholderTextColor="#777"
                value={village}
                onChangeText={(village) => {
                  setVillage(village);
                  setErrorMessages({
                    ...errorMessages,
                    village: "",
                  });
                }}
              />
              {errorMessages.village != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorMessages.village}
                </Text>
              )}
            </View>
            {/* Area */}
            <View>
              <Text style={styles.sectionText}>Area</Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                value={area}
                onChangeText={(area) => {
                  setArea(area);
                  setErrorMessages({
                    ...errorMessages,
                    area: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorMessages.area != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorMessages.area}
                </Text>
              )}
            </View>
            {/* Unit */}
            <InteractiveCell
              title="Area Unit"
              value={UnitValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetUnit();
              }}
              errorMessage={errorMessages.areaUnit}
            />

            <View style={styles.Container}>
              {/* Heading Container */}
              <View>
                <Text style={styles.containerHeading}>Add Site's Location</Text>
                <Text style={styles.requiredText}>
                  Please press "Select Point" Button below to mark a point.
                </Text>
                <Text style={styles.requiredText}>
                  Please add a point after 30 seconds.
                </Text>
              </View>
              {/* Button */}
              <Button
                onPress={() => counter()}
                title=" Select Point"
                style={{
                  height: 60,
                  width: 160,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                }}
              />

              <View
                style={{
                  // paddingBottom: 10
                  flex: 1,
                  paddingBottom: 10,
                }}
              >
                <ScrollView>
                  {/* Point 01 */}
                  {lat1 && long1 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 01:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat1}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long1}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 02 */}
                  {lat2 && long2 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 02:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat2}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long2}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 03 */}
                  {lat3 && long3 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 03:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat3}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long3}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 4 */}
                  {lat4 && long4 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 04:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat4}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long4}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 5 */}
                  {lat5 && long5 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 05:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat5}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long5}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 6 */}
                  {lat6 && long6 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 06:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat6}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long6}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 07 */}
                  {lat7 && long7 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 07:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat7}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long7}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 08 */}
                  {lat8 && long8 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 08:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat8}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long8}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 09 */}
                  {lat9 && long9 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 09:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat9}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long9}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Point 10 */}
                  {lat10 && long10 ? (
                    <View>
                      <Text style={styles.sectionText}>Point 10:</Text>
                      <Text style={styles.buttonText}>
                        Latitude (Y): {lat10}
                      </Text>
                      <Text style={styles.buttonText}>
                        Longitude (X): {long10}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Submit Button */}
                  <Button title="Submit" onPress={() => NextFunction()} />
                </ScrollView>
              </View>
            </View>
            <Spinner
              visible={isLoading}
              textContent={"Loading..."}
              textStyle={{ color: "white" }}
            />
          </ScrollView>
        </View>
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        backdropComponent={renderBackDrop}
      >
        <View style={{ flex: 1 }}>
          <SheetHeader title={"Select " + sheetData.activeIndex} />
          <PickerComponent
            data={sheetData.data}
            onSelectValue={onSelectValue}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ForestForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  headerImage: {
    width: width,
    height: "100%",
  },
  headerPosition: {
    position: "absolute",
  },
  headerBackButtonContainer: {
    width: 60,
  },
  headerBack: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  headerTitleContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainerText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 22,
    color: "white",
    textTransform: "capitalize",
  },
  Container: {
    flex: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerHeading: {
    color: "black",
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
  },
  requiredText: {
    color: "#6D6D6D",
    fontFamily: "Montserrat-Regular",
    paddingVertical: 5,
    fontSize: 12,
  },
  sectionText: {
    color: "black",
    fontFamily: "Montserrat-SemiBold",
    paddingVertical: 5,
  },
  button: {
    height: 60,
    width: width * 0.9,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#A8B4BC",
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#000",
    fontFamily: "Montserrat-Medium",
  },
  buttonText: {
    color: "black",
    fontFamily: "Montserrat-Medium",
  },
  dropdown: {
    height: 200,
    width: width * 0.9,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#A8B4BC",
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  dropdownbutton: {
    padding: 10,
  },
  dropdownItem: {
    color: "#34383b",
    fontFamily: "Montserrat-Regular",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  nextButton: {
    height: 60,
    borderRadius: 10,
    width: 100,
    backgroundColor: "#29AA74",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    fontFamily: "Montserrat-SemiBold",
    color: "white",
    fontSize: 16,
  },
  item: {
    padding: 10,
    fontSize: 18,
    // height: 44,
    color: "black",
  },
});
