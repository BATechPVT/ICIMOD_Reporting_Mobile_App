import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioButton } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useUpdateEffect } from "react-use";
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import { SheetHeader } from "../../Components/BottomSheetHeader";
import { Button } from "../../Components/Button";
import { InteractiveCell } from "../../Components/InteractiveCell";
import PickerComponent from "../../Components/Picker";
import { BASE_URL } from "../../Config/URLs";
const { height, width } = Dimensions.get("screen");

const SowingForm1 = ({ navigation }) => {
  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("Please Select the Date");
  const [DateAPI, setDateAPI] = useState("");

  const [LegalTypeShow, setLegalTypeShow] = useState(false);
  const [LegalTypeValue, setLegalTypeValue] = useState(null);
  const [LegalTypeValueAPI, setLegalTypeValueAPI] = useState(null);
  const [LegalTypeList, setLegalTypeList] = useState([]);

  const [ActivityShow, setActivityShow] = useState(false);
  const [ActivityValue, setActivityValue] = useState(null);
  const [ActivityValueAPI, setActivityValueAPI] = useState(null);
  const [ActivityList, setActivityList] = useState([]);

  const [ActivityTypeShow, setActivityTypeShow] = useState(false);
  const [ActivityTypeValue, setActivityTypeValue] = useState(null);
  const [ActivityTypeValueAPI, setActivityTypeValueAPI] = useState(null);
  const [ActivityTypeList, setActivityTypeList] = useState([]);

  const [SiteNameShow, setSiteNameShow] = useState(false);
  const [SiteNameValue, setSiteNameValue] = useState(null);
  const [SiteNameValueAPI, setSiteNameValueAPI] = useState(null);
  const [SiteNameList, setSiteNameList] = useState([]);

  const [SpacingShow, setSpacingShow] = useState(false);
  const [SpacingValue, setSpacingValue] = useState(null);
  const [SpacingValueAPI, setSpacingValueAPI] = useState(null);
  const [SpacingList, setSpacingList] = useState([]);

  const [Dimension, setDimension] = useState("");

  const [checked, setChecked] = React.useState("NO");
  const [errorState, setErrorState] = useState({
    activityDate: "",
    legalForestType: "",
    activity: "",
    sowingType: "",
    dimensions: "",
    siteName: "",
    plantSpacing: "",
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
    const backAction = () => {
      Alert.alert("Are you sure?", "Your current progress will be lost.", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate("AddView") },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const NextFunction = () => {
    var error = false;
    if (DateAPI == "" || DateAPI == null) {
      error = true;
      setErrorState({
        ...errorState,
        activityDate: "Please Select Activity Date",
      });
    } else if (LegalTypeValue == "" || LegalTypeValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        legalForestType: "Please Select Legal Forest Type",
      });
    } else if (ActivityValue == "" || ActivityValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        activity: "Please Select activity type",
      });
    } else if (ActivityTypeValue == "" || ActivityTypeValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        sowingType: "Please Select Sowing type",
      });
    } else if (Dimension == "" || Dimension == null) {
      error = true;
      setErrorState({
        ...errorState,
        dimensions: "Please Enter Dimension",
      });
    } else if (SiteNameValue == "" || SiteNameValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        siteName: "Please Enter Site Name",
      });
    } else if (SpacingValue == "" || SpacingValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        plantSpacing: "Please Select Spacing",
      });
    }
    if (!error) {
      navigation.navigate("SowingForm2", {
        DateAPI: DateAPI,
        LegalTypeValueAPI: LegalTypeValue.id,
        ActivityValueAPI: ActivityValue.id,
        ActivityTypeValueAPI: ActivityTypeValue.id,
        SiteNameValueAPI: SiteNameValue.id,
        SpacingValueAPI: SpacingValue.id,
        Dimension: Dimension,
        checked: checked,
      });
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    console.log("current  date ", tempDate);
    setDateAPI(tempDate.toJSON());
    setErrorState({
      ...errorState,
      activityDate: "",
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
  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
        }}
      />
    );
  };

  {
    /*Legal Forest Type list View*/
  }
  const LegalTypeView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setLegalTypeValue(item.name);
          setLegalTypeShow(false);
          setLegalTypeValueAPI(item.id);
          setErrorState({
            ...errorState,
            legalForestType: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  {
    /*Activity list View*/
  }
  const ActivityView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActivityValue(item.name);
          setActivityShow(false);
          setActivityValueAPI(item.id);
          setErrorState({
            ...errorState,
            activity: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  {
    /* Activity Type list View*/
  }
  const ActivityTypeView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActivityTypeValue(item.name);
          setActivityTypeShow(false);
          setActivityTypeValueAPI(item.id);
          setErrorState({
            ...errorState,
            sowingType: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  {
    /*Site name list View*/
  }
  const SiteNameView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSiteNameValue(item.name);
          setSiteNameShow(false);
          setSiteNameValueAPI(item.id);
          setErrorState({
            ...errorState,
            siteName: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  {
    /*Spacing list View*/
  }
  const SpacingView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSpacingValue(item.name);
          setSpacingShow(false);
          setSpacingValueAPI(item.id);
          setErrorState({
            ...errorState,
            plantSpacing: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  {
    /*Function to call Legal Forest Type API*/
  }
  const GetLegalType = async () => {
    try {
      axios
        .get(baseurl + "ANR/GetLegalForestTypeList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "LegalType",
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
  const GetActivities = async () => {
    try {
      axios
        .get(baseurl + "SowingAndDibbling/GetActivityList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "ActivityList",
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
    /*Function to call Activity Type API*/
  }
  const GetActivityType = async () => {
    try {
      axios
        .get(baseurl + "SowingAndDibbling/GetSowingTypeList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "SowingType",
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
    /*Function to call site Name  API*/
  }
  const GetSiteName = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/getsiteslist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "SitesList",
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
    /*Function to call Spacing  API*/
  }
  const GetSpacing = async () => {
    try {
      axios
        .get(baseurl + "Selectlists/getspacingbetweenlist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "Spacing",
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
      case "ActivityList":
        setActivityValue(value);
        setErrorState({ ...errorState, activity: "" });
        break;
      case "LegalType":
        setLegalTypeValue(value);
        setErrorState({ ...errorState, legalForestType: "" });
        break;

      case "SitesList":
        setSiteNameValue(value);
        setErrorState({ ...errorState, siteName: "" });
        break;
      case "SowingType":
        setActivityTypeValue(value);
        setErrorState({ ...errorState, sowingType: "" });
        break;
      case "Spacing":
        setSpacingValue(value);
        setErrorState({ ...errorState, plantSpacing: "" });
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
          Add Sowing/Dibbling Activity
        </Text>
        <View style={styles.Container}>
          <ScrollView>
            <Text style={styles.requiredText}>
              All fields marked with an asterisk (*) are required
            </Text>
            {/* Date of Activity */}
            <View>
              <Text style={styles.sectionText}>Date of Activity *</Text>
              <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                <Text style={styles.buttonText}>{text}</Text>
                <Ionicons name="calendar-outline" color={"black"} size={25} />
              </TouchableOpacity>
              {errorState.activityDate != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.activityDate}
                </Text>
              )}
            </View>
            {/* Select Legal Forest Type */}
            <InteractiveCell
              title="Select Legal Forest Type"
              value={LegalTypeValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetLegalType();
              }}
              errorMessage={errorState.legalForestType}
            />

            {/* Select Activity */}
            <InteractiveCell
              title="Select Activity"
              value={ActivityValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetActivities();
              }}
              errorMessage={errorState.activity}
            />

            {/* Sowing Type  */}
            <InteractiveCell
              title="Sowing Type"
              value={ActivityTypeValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetActivityType();
              }}
              errorMessage={errorState.sowingType}
            />

            {/* Enter Dimensions */}

            <View>
              <Text style={styles.sectionText}>Dimensions *</Text>
              <TextInput
                style={styles.button}
                placeholder={"e-g 20x15"}
                placeholderTextColor="#777"
                value={Dimension}
                onChangeText={(Dimension) => {
                  setDimension(Dimension);
                  setErrorState({
                    ...errorState,
                    dimensions: "",
                  });
                }}
              />
              {errorState.dimensions != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.dimensions}
                </Text>
              )}
            </View>
            {/* Site Name/Location */}
            <InteractiveCell
              title="Site Name/Location"
              value={SiteNameValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSiteName();
              }}
              errorMessage={errorState.siteName}
            />

            {/* Spacing */}
            <InteractiveCell
              title="Spacing between Plants"
              value={SpacingValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSpacing();
              }}
              errorMessage={errorState.plantSpacing}
            />
            {/* Watering */}
            <View>
              <Text style={styles.sectionText}>Watering *</Text>
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

            {/* NEXT BUTTON */}
            <Button onPress={() => NextFunction()} title="Next" />
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
export default SowingForm1;

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
