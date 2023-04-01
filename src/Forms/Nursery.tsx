import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
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
import { RadioButton } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
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
import { BASE_URL } from "../Config/URLs";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import { Button } from "../Components/Button";
import ErrorAlert from "../Components/ErrorAlerts";
const { height, width } = Dimensions.get("screen");

const NurseryForm = ({ navigation }) => {
  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("Please Select the Date");
  const [dateApi, setDateApi] = useState("");
  const [DistrictValue, setDistrictValue] = useState(null);
  const [TehsilValue, setTehsilValue] = useState(null);
  const [NurseryOwnerShipValue, setNurseryOwnerShipValue] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ActivityTypeValue, setActivityTypeValue] = useState(null);
  const [StatusValue, setStatusValue] = useState(null);
  const [UnitValue, setUnitValue] = useState(null);
  const [NurseryName, setNurseryName] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [checked, setChecked] = useState("NO");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorState, setErrorState] = useState({
    startDate: "",
    district: "",
    tehsil: "",
    name: "",
    ownership: "",
    ownerName: "",
    nurseryType: "",
    landStatus: "",
    area: "",
    unit: "",
  });
  const bottomSheetRef = useRef(null);
  const [sheetData, setSheetData] = React.useState({
    activeIndex: "Site Name",
    data: [],
  });

  // variables
  const snapPoints = useMemo(() => ["35%", "50%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  useEffect(() => {
    getLocation();
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

  const PostFunction = () => {
    const data = {
      id: 0,
      nurseryName: NurseryName,
      ownership: NurseryOwnerShipValue.name,
      incharge: ownerName,
      type: ActivityTypeValue.name,
      landStatus: StatusValue.name,
      long: longitude,
      lat: latitude,
      area: area,
      unit: UnitValue.id,
      journal: checked,
      establishDate: dateApi,
      forestDivisionId: 0,
      districtId: DistrictValue.id,
      tehsilId: TehsilValue.id,
      status: 0,
    };
    console.log("data", data);
    setIsLoading(true);
    try {
      axios
        .post(baseurl + "Nursery/SaveNurseryActivity", data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then(async (response) => {
          console.log(response.data);
          setIsLoading(false);
          Alert.alert("Success", response.data, [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("DashBoard");
              },
            },
          ]);
        })
        .catch((error) => {
          console.log("error in axiox", error);
          setErrorMessage(error.toString());
          setIsLoading(false);
          // alert(error)
        });
    } catch (e) {
      console.log("error in catch", e);
      alert(e);
      setIsLoading(false);
    }
  };

  useUpdateEffect(() => {
    if (errorMessage !== "") {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage && errorMessage !== ""]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      },
      (error) => {
        alert(error.message);
        console.log("Location Denied");
      },
      {
        timeout: 30000,
      }
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    setDateApi(tempDate.toJSON());
    setErrorState({
      ...errorState,
      startDate: "",
    });
    if (tempDate.getMonth() + 1 < 10) {
      let fDate =
        "0" +
        (tempDate.getMonth() + 1) +
        " / " +
        tempDate.getDate() +
        " / " +
        tempDate.getFullYear();
      setText(fDate);
    } else {
      let fDate =
        tempDate.getMonth() +
        1 +
        " / " +
        tempDate.getDate() +
        " / " +
        tempDate.getFullYear();
      setText(fDate);
    }
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChange,
      mode: currentMode,
      is24Hour: true,
      maximumDate: new Date(),
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };

  {
    /*Year Seperator View*/
  }

  {
    /*Function to call Legal Forest Type API*/
  }
  const GetDistrict = async () => {
    try {
      axios
        .get(baseurl + "Nursery/DistrictsList")
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
    /*Function to call Activities API*/
  }
  const GetNurseryOwnerShip = async () => {
    try {
      axios
        .get(baseurl + "Nursery/OwnershipsList")
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              id: index,
              name: value,
            }));
            setSheetData({
              activeIndex: "Ownership",
              data: updatedData,
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
    /*Function to call Activity Type API*/
  }
  const GetActivityType = async () => {
    try {
      axios
        .get(baseurl + "Nursery/NurseryTypeList")
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              id: index,
              name: value,
            }));
            setSheetData({
              activeIndex: "NurseryType",
              data: updatedData,
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
    /*Function to call site Name  API*/
  }
  const GetStatus = async () => {
    try {
      axios
        .get(baseurl + "Nursery/LandStatusList")
        .then(async (response) => {
          if (response.status === 200) {
            const updatedData = await response.data.map((value, index) => ({
              id: index,
              name: value,
            }));
            setSheetData({
              activeIndex: "LandStatus",
              data: updatedData,
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
    /*Function to call Units  API*/
  }
  const GetUnit = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/SelectUnitList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "UnitList",
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

  const validateForm = () => {
    var error = false;
    if (dateApi == "" || dateApi == null) {
      error = true;
      setErrorState({
        ...errorState,
        startDate: "Please Select Activity Date",
      });
    } else if (DistrictValue == "" || DistrictValue == null) {
      error = true;
      setErrorState({ ...errorState, district: "Please Select District" });
    } else if (TehsilValue == "" || TehsilValue == null) {
      error = true;
      setErrorState({ ...errorState, tehsil: "Please Select tehsil" });
    } else if (NurseryName == "" || NurseryName == null) {
      error = true;
      setErrorState({ ...errorState, name: "Please Enter Nursery Name" });
    } else if (NurseryOwnerShipValue == "" || NurseryOwnerShipValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        ownership: "Please Select Nursery OwnerShip",
      });
    } else if (ownerName == "" || ownerName == null) {
      error = true;
      setErrorState({ ...errorState, ownerName: "Please Enter owner name" });
    } else if (ActivityTypeValue == "" || ActivityTypeValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        nurseryType: "Please Select Nursery Type",
      });
    } else if (StatusValue == "" || StatusValue == null) {
      error = true;
      setErrorState({ ...errorState, landStatus: "Please Select Land Status" });
    } else if (area == "" || area == null) {
      error = true;
      setErrorState({ ...errorState, area: "Please Enter Area" });
    } else if (UnitValue == "" || UnitValue == null) {
      error = true;
      setErrorState({ ...errorState, unit: "Please Select Area Unit" });
    }
    if (!error) {
      PostFunction();
    }
  };
  useUpdateEffect(() => {
    bottomSheetRef.current.present();
  }, [sheetData]);
  const renderBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        closeOnPress={true}
      />
    ),
    []
  );
  const onSelectValue = (value) => {
    bottomSheetRef.current.dismiss();
    switch (sheetData.activeIndex) {
      case "District":
        setDistrictValue(value);
        setErrorState({ ...errorState, district: "" });
        break;
      case "Tehsil":
        setTehsilValue(value);
        setErrorState({ ...errorState, tehsil: "" });
        break;

      case "Ownership":
        setNurseryOwnerShipValue(value);
        setErrorState({ ...errorState, ownership: "" });
        break;
      case "LandStatus":
        setStatusValue(value);
        setErrorState({ ...errorState, landStatus: "" });
        break;
      case "UnitList":
        setUnitValue(value);
        setErrorState({ ...errorState, unit: "" });
        break;
      case "NurseryType":
        setActivityTypeValue(value);
        setErrorState({ ...errorState, nurseryType: "" });
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
          Add Nursery DashBoard
        </Text>
        <View style={styles.Container}>
          <ScrollView>
            <Text style={styles.requiredText}>
              All fields marked with an asterisk (*) are required
            </Text>
            {/* Date of Activity */}
            <View>
              <Text style={styles.sectionText}>Start Date *</Text>
              <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                <Text style={styles.buttonText}>{text}</Text>
                <Ionicons name="calendar-outline" color={"black"} size={25} />
              </TouchableOpacity>
              {errorState.startDate != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.startDate}
                </Text>
              )}
            </View>
            {/* Select District */}
            <InteractiveCell
              title="Select District"
              value={DistrictValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetDistrict();
              }}
              errorMessage={errorState.district}
            />

            {/* Select Tehsil */}
            <InteractiveCell
              title="Select Tehsil"
              value={TehsilValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetTehsil();
              }}
              errorMessage={errorState.tehsil}
            />

            {/* Nursery Name */}

            <View>
              <Text style={styles.sectionText}>Nursery Name *</Text>
              <TextInput
                style={styles.button}
                placeholder={" Enter Nursery Name"}
                placeholderTextColor="#777"
                value={NurseryName}
                onChangeText={(NurseryName) => {
                  setNurseryName(NurseryName);
                  setErrorState({
                    ...errorState,
                    name: "",
                  });
                }}
              />
              {errorState.name != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.name}
                </Text>
              )}
            </View>
            {/* NurseryOwnerShip */}
            <InteractiveCell
              title="Nursery Ownership"
              value={NurseryOwnerShipValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetNurseryOwnerShip();
              }}
              errorMessage={errorState.ownership}
            />

            {/* Sowing Type  */}
            <View>
              <Text style={styles.sectionText}>
                Nursery Incharge/Owner Name *
              </Text>
              <TextInput
                style={styles.button}
                placeholder={" Enter Nursery Incharge Name"}
                placeholderTextColor="#777"
                value={ownerName}
                onChangeText={(ownerName) => {
                  setOwnerName(ownerName);
                  setErrorState({
                    ...errorState,
                    ownerName: "",
                  });
                }}
              />
              {errorState.ownerName != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.ownerName}
                </Text>
              )}
            </View>

            <InteractiveCell
              title="Nursery Type"
              value={ActivityTypeValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetActivityType();
              }}
              errorMessage={errorState.nurseryType}
            />

            {/* Unit */}
            <InteractiveCell
              title="Land Status"
              value={StatusValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetStatus();
              }}
              errorMessage={errorState.landStatus}
            />

            <View>
              <Text style={styles.sectionText}>Latitude</Text>
              <View
                style={[styles.button, { backgroundColor: "rgba(0,0,0,0.3)" }]}
              >
                <Text style={styles.buttonText}>{latitude}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.sectionText}>longitude</Text>
              <View
                style={[styles.button, { backgroundColor: "rgba(0,0,0,0.3)" }]}
              >
                <Text style={styles.buttonText}>{longitude}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.sectionText}>Area *</Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                keyboardType="numeric"
                placeholderTextColor="#777"
                value={area}
                onChangeText={(area) => {
                  setArea(area);
                  setErrorState({
                    ...errorState,
                    area: "",
                  });
                }}
              />
              {errorState.area != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.area}
                </Text>
              )}
            </View>
            <InteractiveCell
              title="Units of Area"
              value={UnitValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetUnit();
              }}
              errorMessage={errorState.landStatus}
            />

            {/* Watering */}
            <View>
              <Text style={styles.sectionText}>Nursery Journel Maintained</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    width: 30,
                    fontFamily: "Montserrat-Regular",
                  }}
                >
                  NO
                </Text>
                <RadioButton
                  value="NO"
                  status={checked === "NO" ? "checked" : "unchecked"}
                  onPress={() => setChecked("NO")}
                  color="#29AC6F"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    width: 30,
                    fontFamily: "Montserrat-Regular",
                  }}
                >
                  YES
                </Text>
                <RadioButton
                  value="YES"
                  status={checked === "YES" ? "checked" : "unchecked"}
                  onPress={() => setChecked("YES")}
                  color="#29AC6F"
                />
              </View>
            </View>
            {/* Submit BUTTON */}
            <Button title="Submit" onPress={() => validateForm()} />
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
      {errorAlert && (
        <ErrorAlert
          text="Error!"
          description={errorMessage}
          show={errorAlert}
        />
      )}
    </BottomSheetModalProvider>
  );
};
export default NurseryForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#29AC6F",
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
