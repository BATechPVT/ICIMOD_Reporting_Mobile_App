import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";
import { SelectMultiple } from "../Components/SelectMultiple";
import { InteractiveCell } from "../Components/InteractiveCell";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SheetHeader } from "../Components/BottomSheetHeader";
import PickerComponent from "../Components/Picker";
import { useUpdateEffect } from "react-use";
import { DateModal } from "../Components/DatePicker";
import { BASE_URL } from "../Config/URLs";
import { Button } from "../Components/Button";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
const { height, width } = Dimensions.get("screen");

const ANRForm = ({ navigation }) => {
  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("Please Select the Date");
  const [dateApi, setDateApi] = useState("");

  const [SecondDate, setSecondDate] = useState(new Date());
  const [SecondDext, setSecondDext] = useState("Please Select the Date");
  const [secondDateApi, setSecondDateApi] = useState("");

  const [EstablishmentInvolvement, setEstablishmentInvolvement] = useState("");
  const [AverageRegeneration, setAverageRegeneration] = useState("");
  const [AreaofEnclosure, setAreaofEnclosure] = useState("");
  const [TotalRegeneration, setTotalRegeneration] = useState("");
  const [EstimatedDamageNo, setEstimatedDamageNo] = useState("");
  const [EstimatedDamageAcreage, setEstimatedDamageAcreage] = useState("");
  const [UnderlyingCause, setUnderlyingCause] = useState("");
  const [LongTerm, setLongTerm] = useState("");
  const [Plan, setPlan] = useState("");
  const [SiteNameValue, setSiteNameValue] = useState(null);
  const [LegalForestValue, setLegalForestValue] = useState(null);
  const [ProtectionList, setProtectionList] = useState([{}]);
  const [protectionListIndex, setProtectionListIndex] = useState(0);

  const [plantSpeciesList, setPlantSpeciesList] = useState([{}]);
  const [plantSpeciesIndex, setplantSpeciesIndex] = useState(0);
  const [UnitValue, setUnitValue] = useState(null);
  const [InterventionValue, setInterventionValue] = useState(null);
  const [SurvivalRateValue, setSurvivalRateValue] = useState(null);
  const [damageList, setDamageList] = useState([{}]);
  const [damageIndex, setDamageIndex] = useState(0);
  const [showDateModal, setShowDateModal] = useState(false);
  const [activeDateIndex, setActiveDateIndex] = useState(0);
  const [errorState, setErrorState] = useState({
    activityDate: "",
    siteName: "",
    legalForestType: "",
    enclosureDate: "",
    protectionMechanism: "",
    establishmentMechanism: "",
    plantSpecie: "",
    avgRegeneration: "",
    enclosureArea: "",
    selectUnit: "",
    totalRegeneration: "",
    majorIntervention: "",
    successRate: "",
    damagedPlants: "",
    aceragePlants: "",
    damageReason: "",
    degradation: "",
    sustainability: "",
    substitution: "",
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
  // For First Date Picker

  const onChange = (selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    setErrorState({
      ...errorState,
      activityDate: "",
    });
    setDateApi(tempDate?.toJSON());
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
      mode: "date",
      maximumDate: new Date(),
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };

  // For Second Date Picker
  const onSecondChange = (event, selectedSecondDate) => {
    const currentSecondDate = selectedSecondDate || new Date();
    setSecondDate(currentSecondDate);
    let tempSecondDate = new Date(currentSecondDate);
    setSecondDateApi(tempSecondDate?.toJSON());
    setErrorState({
      ...errorState,
      enclosureDate: "",
    });
    if (tempSecondDate.getMonth() + 1 < 10) {
      let fSecondDate =
        "0" +
        (tempSecondDate.getMonth() + 1) +
        " / " +
        tempSecondDate.getDate() +
        " / " +
        tempSecondDate.getFullYear();
      setSecondDext(fSecondDate);
    } else {
      let fSecondDate =
        tempSecondDate.getMonth() +
        1 +
        " / " +
        tempSecondDate.getDate() +
        " / " +
        tempSecondDate.getFullYear();
      setSecondDext(fSecondDate);
    }
  };
  const showSecondMode = (currentSecondMode) => {
    DateTimePickerAndroid.open({
      value: SecondDate,
      onChange: onSecondChange,
      mode: currentSecondMode,
      maximumDate: new Date(),
    });
  };
  const showSecondDatepicker = () => {
    showSecondMode("date");
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
              activeIndex: "SiteName",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetLegalForest = async () => {
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
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetProtectionMechanism = async () => {
    try {
      axios
        .get(baseurl + "ANR/Mechanism/ProtectionList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "ProtectionList",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetSpecies = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/specieslist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "SpeciesList",
              data: response.data,
            });
            setIsLoading(false);
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
  const GetUnits = async () => {
    try {
      axios
        .get(baseurl + "ANR/SelectUnitList")
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
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetIntervention = async () => {
    try {
      axios
        .get(baseurl + "ANR/GetMajorInterventionsList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "InterventionList",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const GetSurvivalRate = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/Plant/EstimatedSurvivalRateList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "SurvivalRate",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const Getsuccess = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/DamageReasonList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "DamageReason",
              data: response.data,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const PostFunction = () => {
    const data = {
      id: 0,
      activityDate: date?.toJSON(),
      site: SiteNameValue.name,
      siteId: SiteNameValue.id,
      legalForestType: LegalForestValue.id,
      enclosureEstablishmentDate: SecondDate?.toJSON(),
      protectionMechanism: ProtectionList.map((a) => a.id).toString(),
      establishmentMechanismCommunityInvolvement: EstablishmentInvolvement,
      keySpecies: plantSpeciesList.map((a) => a.id).toString(),
      keySpeciesIds: "",
      averageRegenerationPerUnit: AverageRegeneration,
      areaofEnclosure: AreaofEnclosure,
      areaUnit: UnitValue.id,
      totalRegeneration: TotalRegeneration,
      majorInterventionforSuplimentingANR: InterventionValue.id,
      successRate: SurvivalRateValue.name,
      demageToPlantationNo: EstimatedDamageNo,
      demageToPlantationAcreage: EstimatedDamageAcreage,
      damageReason: damageList.map((a) => a.id).toString(),
      damageReasonIds: null,
      unCaOfDegAndSol: UnderlyingCause,
      plForSubOfResource: Plan,
      lgSustainMeasures: LongTerm,
    };
    console.log(data, " data", baseurl + "ANR/SaveANRActivity");
    setIsLoading(true);
    try {
      axios
        .post(baseurl + "ANR/SaveANRActivity", data, {
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
          setIsLoading(false);
          // alert(error)
        });
    } catch (e) {
      console.log("error in catch", e);
      alert(e);
      setIsLoading(false);
    }
  };
  const validateForm = () => {
    var error = false;
    if (date == "" || date == null) {
      error = true;
      setErrorState({
        ...errorState,
        activityDate: "Please Select Activity Date",
      });
    } else if (SiteNameValue == "" || SiteNameValue == null) {
      error = true;
      setErrorState({ ...errorState, siteName: "Please Select Site  Name" });
    } else if (LegalForestValue == "" || LegalForestValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        legalForestType: "Please Select Legal Forest Type ",
      });
    } else if (SecondDate == "" || SecondDate == null) {
      error = true;
      setErrorState({
        ...errorState,
        enclosureDate: "Please Select Enclosure Date",
      });
    } else if (
      ProtectionList.length < 1 ||
      ProtectionList[0]?.name == undefined
    ) {
      error = true;
      setErrorState({
        ...errorState,
        protectionMechanism: "Please Select Protection Mechanism",
      });
    } else if (
      EstablishmentInvolvement == "" ||
      EstablishmentInvolvement == null
    ) {
      error = true;
      setErrorState({
        ...errorState,
        establishmentMechanism: "Please Select EstablishmentInvolvement",
      });
    } else if (
      plantSpeciesList.length < 1 ||
      plantSpeciesList[0]?.name == undefined
    ) {
      error = true;
      setErrorState({
        ...errorState,
        plantSpecie: "Please Select Plant Specie",
      });
    } else if (AverageRegeneration == "" || AverageRegeneration == null) {
      error = true;
      setErrorState({
        ...errorState,
        avgRegeneration: "Please Select Average Regeneration",
      });
    } else if (AreaofEnclosure == "" || AreaofEnclosure == null) {
      error = true;
      setErrorState({
        ...errorState,
        enclosureArea: "Please Select Area of Enclosure",
      });
    } else if (UnitValue == "" || UnitValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        selectUnit: "Please Select Unit",
      });
    } else if (TotalRegeneration == "" || TotalRegeneration == null) {
      error = true;
      setErrorState({
        ...errorState,
        totalRegeneration: "Please Enter Regeneration",
      });
    } else if (InterventionValue == "" || InterventionValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        majorIntervention: "Please Select Intervention Value",
      });
    } else if (SurvivalRateValue == "" || SurvivalRateValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        successRate: "Please Select Survival Rate",
      });
    } else if (EstimatedDamageNo == "" || EstimatedDamageNo == null) {
      error = true;
      setErrorState({
        ...errorState,
        damagedPlants: "Please Select Estimated Damage No",
      });
    } else if (EstimatedDamageAcreage == "" || EstimatedDamageAcreage == null) {
      error = true;
      setErrorState({
        ...errorState,
        aceragePlants: "Please Select Estimated Damage Acreage",
      });
    } else if (damageList.length < 1 || damageList[0]?.name == undefined) {
      error = true;
      setErrorState({
        ...errorState,
        damageReason: "Please Select Reason of Damaged",
      });
    } else if (UnderlyingCause == "" || UnderlyingCause == null) {
      error = true;
      setErrorState({
        ...errorState,
        degradation: "Please Select Degradation",
      });
    } else if (LongTerm == "" || LongTerm == null) {
      error = true;
      setErrorState({
        ...errorState,
        sustainability: "Please Select Sustainability",
      });
    } else if (Plan == "" || Plan == null) {
      error = true;
      setErrorState({
        ...errorState,
        substitution: "Please Select Substitution",
      });
    }

    if (!error) {
      PostFunction();
    }
  };

  const addItemProtection = (() => {
    let key = ProtectionList.length;
    return () => {
      ProtectionList.push({});
      setProtectionList(ProtectionList.slice());
      key++;
    };
  })();

  const removeItemProtection = () => {
    ProtectionList.pop();
    setProtectionList(ProtectionList.slice());
  };

  const addItemSpecies = (() => {
    let key = plantSpeciesList.length;
    return () => {
      plantSpeciesList.push({});
      setPlantSpeciesList(plantSpeciesList.slice());
      key++;
    };
  })();

  const removeItemSpecies = () => {
    plantSpeciesList.pop();
    setPlantSpeciesList(plantSpeciesList.slice());
  };
  const addItemDamage = (() => {
    let key = damageList.length;
    return () => {
      damageList.push({});
      setDamageList(damageList.slice());
      key++;
    };
  })();

  const removeItemDamage = () => {
    damageList.pop();
    setDamageList(damageList.slice());
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
      case "SiteName":
        setSiteNameValue(value);
        setErrorState({ ...errorState, siteName: "" });
        break;
      case "LegalType":
        setLegalForestValue(value);
        setErrorState({ ...errorState, legalForestType: "" });
        break;
      case "ProtectionList":
        let updatedProtection = [...ProtectionList];
        updatedProtection[protectionListIndex] = value;
        setProtectionList(updatedProtection);
        setErrorState({ ...errorState, protectionMechanism: "" });
        break;

      case "SpeciesList":
        let updatedSpecies = [...plantSpeciesList];
        updatedSpecies[plantSpeciesIndex] = value;
        setPlantSpeciesList(updatedSpecies);
        setErrorState({ ...errorState, plantSpecie: "" });
        break;

      case "Unit":
        setUnitValue(value);
        setErrorState({ ...errorState, selectUnit: "" });
        break;

      case "InterventionList":
        setInterventionValue(value);
        setErrorState({ ...errorState, majorIntervention: "" });
        break;

      case "SurvivalRate":
        setSurvivalRateValue(value);
        setErrorState({ ...errorState, successRate: "" });
        break;
      case "DamageReason":
        let updatedDamage = [...damageList];
        updatedDamage[damageIndex] = value;
        setDamageList(updatedDamage);
        setErrorState({ ...errorState, damageReason: "" });
        break;

      default:
        break;
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={[styles.mainContainer, { backgroundColor: theme.primary }]}>
        <DateModal
          date={date}
          onConfirm={(date) => {
            if (activeDateIndex == 0) {
              setDate(date);
            } else {
              setSecondDate(date);
            }

            setShowDateModal(false);
          }}
          onCancel={() => setShowDateModal(false)}
          open={showDateModal}
        />
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
          Add ANR DashBoard
        </Text>
        <View style={styles.Container}>
          <ScrollView>
            <Text style={styles.requiredText}>
              All fields marked with an asterisk (*) are required
            </Text>
            {/* Date of Activity **/}
            <View>
              <Text style={styles.sectionText}>Date of Activity *</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowDateModal(true);
                  setActiveDateIndex(0);
                }}
              >
                <Text style={styles.buttonText}>{date?.toDateString()}</Text>
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
            {/* Site Name */}
            <InteractiveCell
              title="Site Name/Location"
              value={SiteNameValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSiteName();
              }}
              errorMessage={errorState.siteName}
            />

            {/* Legal Forest Type */}
            <InteractiveCell
              title="Legal Forest Type"
              value={LegalForestValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetLegalForest();
              }}
              errorMessage={errorState.legalForestType}
            />

            {/* Date of Enclosure Establishment / Dry Afforestation**/}
            <View>
              <Text style={styles.sectionText}>
                Date of Enclosure Establishment / Dry Afforestation *
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowDateModal(true);
                  setActiveDateIndex(1);
                }}
              >
                <Text style={styles.buttonText}>
                  {SecondDate.toDateString()}
                </Text>
                <Ionicons name="calendar-outline" color={"black"} size={25} />
              </TouchableOpacity>
              {errorState.enclosureDate != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.enclosureDate}
                </Text>
              )}
            </View>
            {/* ProtectionMechanism */}
            <SelectMultiple
              data={ProtectionList}
              title={"Mechanism for Protection"}
              onaddItem={() => addItemProtection()}
              onremoveItem={() => removeItemProtection()}
              onPressInteractiveCell={(index) => {
                setProtectionListIndex(index);
                setIsLoading(true);
                GetProtectionMechanism();
              }}
              errorMessage={errorState.protectionMechanism}
            />

            {/* <View>
            <Text style={styles.sectionText}>Protection Mechanism</Text>
            {ProtectionMechanismShow ? (
              <View style={styles.button}>
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {ProtectionMechanismValue}
                </Text>
                <Ionicons name="chevron-up" size={30} color="#495057" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsLoading(true);
                  GetProtectionMechanism();
                }}
              >
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {ProtectionMechanismValue}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={30}
                  color="#495057"
                  ForestCat
                />
              </TouchableOpacity>
            )}
            {errorState.protectionMechanism != "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.protectionMechanism}
              </Text>
            )}
            {ProtectionMechanismShow ? (
              <ScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                style={{
                  width: "100%",
                }}
              >
                <View style={styles.dropdown}>
                  <FlatList
                    data={ProtectionMechanismList}
                    nestedScrollEnabled={true}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ProtectionMechanismView}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </ScrollView>
            ) : (
              <></>
            )}
          </View> */}
            {/* Establishment Mechanism/Community Involvement */}
            <View>
              <Text style={styles.sectionText}>
                Establishment Mechanism/Community Involvement
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Establishment Mechanism"}
                placeholderTextColor="#777"
                value={EstablishmentInvolvement}
                onChangeText={(EstablishmentInvolvement) => {
                  setEstablishmentInvolvement(EstablishmentInvolvement);
                  setErrorState({
                    ...errorState,
                    establishmentMechanism: "",
                  });
                }}
              />
              {errorState.establishmentMechanism != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.establishmentMechanism}
                </Text>
              )}
            </View>
            {/* Plant Species */}
            <SelectMultiple
              data={plantSpeciesList}
              title={"Plant Species"}
              onaddItem={() => addItemSpecies()}
              onremoveItem={() => removeItemSpecies()}
              onPressInteractiveCell={(index) => {
                setplantSpeciesIndex(index);
                setIsLoading(true);
                GetSpecies();
              }}
              errorMessage={errorState.plantSpecie}
            />

            {/* <View>
            <Text style={styles.sectionText}>Plant Species</Text>
            {SpeciesShow ? (
              <View style={styles.button}>
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {SpeciesValue}
                </Text>
                <Ionicons name="chevron-up" size={30} color="#495057" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsLoading(true);
                  GetSpecies();
                }}
              >
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {SpeciesValue}
                </Text>
                <Ionicons name="chevron-down" size={30} color="#495057" />
              </TouchableOpacity>
            )}
            {errorState.plantSpecie != "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.plantSpecie}
              </Text>
            )}
            {SpeciesShow ? (
              <ScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                style={{
                  width: "100%",
                }}
              >
                <View style={styles.dropdown}>
                  <FlatList
                    nestedScrollEnabled={true}
                    data={SpeciesList}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={SpeciesView}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </ScrollView>
            ) : (
              <></>
            )}
          </View> */}
            {/* Average Regeneration Per Unit Area */}
            <View>
              <Text style={styles.sectionText}>
                Average Regeneration Per Unit Area *
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Average Regeneration Per Area"}
                placeholderTextColor="#777"
                value={AverageRegeneration}
                onChangeText={(AverageRegeneration) => {
                  setAverageRegeneration(AverageRegeneration);
                  setErrorState({
                    ...errorState,
                    avgRegeneration: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorState.avgRegeneration != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.avgRegeneration}
                </Text>
              )}
            </View>
            {/* Area of Enclosure / Area Tackled * */}
            <View>
              <Text style={styles.sectionText}>
                Area of Enclosure / Area Tackled *
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={AreaofEnclosure}
                onChangeText={(AreaofEnclosure) => {
                  setAreaofEnclosure(AreaofEnclosure);
                  setErrorState({
                    ...errorState,
                    enclosureArea: "",
                  });
                }}
              />
              {errorState.enclosureArea != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.enclosureArea}
                </Text>
              )}
            </View>
            {/* Select Unit */}
            <InteractiveCell
              title="Select Unit"
              value={UnitValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetUnits();
              }}
              errorMessage={errorState.selectUnit}
            />

            {/* Total Regeneration (No. of Plants) * */}
            <View>
              <Text style={styles.sectionText}>
                Total Regeneration (No. of Plants) *
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={TotalRegeneration}
                onChangeText={(TotalRegeneration) => {
                  setTotalRegeneration(TotalRegeneration);
                  setErrorState({
                    ...errorState,
                    totalRegeneration: "",
                  });
                }}
              />
              {errorState.totalRegeneration != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.totalRegeneration}
                </Text>
              )}
            </View>
            {/* Intervention */}
            <InteractiveCell
              title="Major Intervention for Suplimenting ANR"
              value={InterventionValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetIntervention();
              }}
              errorMessage={errorState.majorIntervention}
            />

            {/* Estimated Success/Survival Rate */}
            <InteractiveCell
              title="Estimated Success/Survival Rate"
              value={SurvivalRateValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSurvivalRate();
              }}
              errorMessage={errorState.successRate}
            />

            {/* Estimated Damage to Plantation No */}
            <View>
              <Text style={styles.sectionText}>
                Estimated Damage to Plantation No
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={EstimatedDamageNo}
                onChangeText={(EstimatedDamageNo) => {
                  setEstimatedDamageNo(EstimatedDamageNo);
                  setErrorState({
                    ...errorState,
                    damagedPlants: "",
                  });
                }}
              />
              {errorState.damagedPlants != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.damagedPlants}
                </Text>
              )}
            </View>
            {/* Estimated Damage to Plantation Acreage */}
            <View>
              <Text style={styles.sectionText}>
                Estimated Damage to Plantation Acreage
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={EstimatedDamageAcreage}
                onChangeText={(EstimatedDamageAcreage) => {
                  setEstimatedDamageAcreage(EstimatedDamageAcreage);
                  setErrorState({
                    ...errorState,
                    aceragePlants: "",
                  });
                }}
              />
              {errorState.aceragePlants != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.aceragePlants}
                </Text>
              )}
            </View>
            {/* Select Damage Reasons */}
            <SelectMultiple
              data={damageList}
              title={"Damage Reasons"}
              onaddItem={() => addItemDamage()}
              onremoveItem={() => removeItemDamage()}
              onPressInteractiveCell={(index) => {
                setDamageIndex(index);
                setIsLoading(true);
                Getsuccess();
              }}
              errorMessage={errorState.damageReason}
            />

            {/* <View>
            <Text style={styles.sectionText}>Select Damage Reasons</Text>
            {successShow ? (
              <View style={styles.button}>
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {successValue}
                </Text>
                <Ionicons name="chevron-up" size={30} color="#495057" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsLoading(true);
                  Getsuccess();
                }}
              >
                <Text
                  style={styles.buttonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {successValue}
                </Text>
                <Ionicons name="chevron-down" size={30} color="#495057" />
              </TouchableOpacity>
            )}
            {errorState.damageReason != "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.damageReason}
              </Text>
            )}
            {successShow ? (
              <ScrollView
                nestedScrollEnabled={true}
                horizontal={true}
                style={{
                  width: "100%",
                }}
              >
                <View style={styles.dropdown}>
                  <FlatList
                    nestedScrollEnabled={true}
                    data={successList}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={successView}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </ScrollView>
            ) : (
              <></>
            )}
          </View> */}
            {/* Underlying cause of degradation and solution */}
            <View>
              <Text style={styles.sectionText}>
                Underlying cause of degradation and solution
              </Text>
              <TextInput
                style={[
                  styles.button,
                  {
                    height: 100,
                    justifyContent: "flex-start",
                  },
                ]}
                placeholder={"Enter Cause of Degradation"}
                placeholderTextColor="#777"
                value={UnderlyingCause}
                onChangeText={(UnderlyingCause) => {
                  setUnderlyingCause(UnderlyingCause);
                  setErrorState({
                    ...errorState,
                    degradation: "",
                  });
                }}
              />
              {errorState.degradation != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.degradation}
                </Text>
              )}
            </View>
            {/* Long term sustainability measures taken */}
            <View>
              <Text style={styles.sectionText}>
                Long term sustainability measures taken
              </Text>
              <TextInput
                style={[
                  styles.button,
                  {
                    height: 100,
                    justifyContent: "flex-start",
                  },
                ]}
                placeholder={"Long Term Sustainability"}
                placeholderTextColor="#777"
                value={LongTerm}
                onChangeText={(LongTerm) => {
                  setLongTerm(LongTerm);
                  setErrorState({
                    ...errorState,
                    sustainability: "",
                  });
                }}
              />
              {errorState.sustainability != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.sustainability}
                </Text>
              )}
            </View>
            {/* Plan for substitution of resource use by local communities */}
            <View>
              <Text style={styles.sectionText}>
                Plan for substitution of resource use by local communities
              </Text>
              <TextInput
                style={[
                  styles.button,
                  {
                    height: 100,
                    justifyContent: "flex-start",
                  },
                ]}
                placeholder={"Enter Plan for Substitution"}
                placeholderTextColor="#777"
                value={Plan}
                onChangeText={(Plan) => {
                  setPlan(Plan);
                  setErrorState({
                    ...errorState,
                    substitution: "",
                  });
                }}
              />
              {errorState.substitution != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.substitution}
                </Text>
              )}
            </View>
            {/* Bottom Button */}
            <Button onPress={() => validateForm()} title="Submit" />
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
export default ANRForm;

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
  },
  headerTitleContainerSubText: {
    fontFamily: "Montserrat-Regular",
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
