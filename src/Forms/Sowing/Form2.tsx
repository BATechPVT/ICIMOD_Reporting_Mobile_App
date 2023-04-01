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
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioButton } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Feather from "react-native-vector-icons/Feather";
import { SelectMultiple } from "../../Components/SelectMultiple";
import { InteractiveCell } from "../../Components/InteractiveCell";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SheetHeader } from "../../Components/BottomSheetHeader";
import PickerComponent from "../../Components/Picker";
import { useUpdateEffect } from "react-use";
import { BASE_URL } from "../../Config/URLs";
import { ThemeContext } from "../../../theme/theme-context";
import { FontSizes } from "../../../theme/FontSizes";
import { Button } from "../../Components/Button";
const { height, width } = Dimensions.get("screen");

const SowingForm2 = ({ navigation, route }) => {
  const {
    DateAPI,
    LegalTypeValueAPI,
    ActivityValueAPI,
    ActivityTypeValueAPI,
    SiteNameValueAPI,
    SpacingValueAPI,
    Dimension,
    checked,
  } = route.params;

  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [area, setArea] = useState("");

  const [UnitShow, setUnitShow] = useState(false);
  const [UnitValue, setUnitValue] = useState("Select Unit");
  const [UnitValueAPI, setUnitValueAPI] = useState("");
  const [UnitList, setUnitList] = useState([]);

  const [SpeciesShow, setSpeciesShow] = useState(false);
  const [SpeciesValue, setSpeciesValue] = useState("Select Species");
  const [SpeciesValueAPI, setSpacingValueAPI] = useState(null);
  const [SpeciesList, setSpeciesList] = useState([]);
  const [speciesData, setSpeciesData] = useState([{}]);
  const [speciesIndex, setSpeciesIndex] = useState(0);
  const [errorState, setErrorState] = useState({
    area: "",
    unit: "",
    species: "",
    numberoPlants: "",
  });
  const [number, setNumber] = useState("");
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
    if (area == "" || area == null) {
      error = true;
      setErrorState({
        ...errorState,
        area: "Please enter Area",
      });
    } else if (UnitValue == "" || UnitValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        unit: "Please Select Unit type",
      });
    } else if (speciesData.length < 1 || speciesData[0]?.name == undefined) {
      error = true;
      setErrorState({
        ...errorState,
        species: "Please Select Species type",
      });
    } else if (number == "" || number == null) {
      error = true;
      setErrorState({
        ...errorState,
        numberoPlants: "Please Enter number of Plants",
      });
    }
    if (!error) {
      navigation.navigate("SowingForm3", {
        DateAPI: DateAPI,
        LegalTypeValueAPI: LegalTypeValueAPI,
        ActivityValueAPI: ActivityValueAPI,
        ActivityTypeValueAPI: ActivityTypeValueAPI,
        SiteNameValueAPI: SiteNameValueAPI,
        SpacingValueAPI: SpacingValueAPI,
        Dimension: Dimension,
        checked: checked,
        area: area,
        UnitValueAPI: UnitValue.id,
        SpeciesValueAPI: speciesData.map((a) => a.id).toString(),
        number: number,
      });
    }
  };

  const UnitView = ({ item }) => {
    if (item.key === "None") {
      return null;
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            setUnitValue(item.name);
            setUnitShow(false);
            setUnitValueAPI(item.id);
            setErrorState({
              ...errorState,
              unit: "",
            });
          }}
          style={{
            paddingVertical: 10,
          }}
        >
          <Text style={styles.dropdownItem}>{item.name}</Text>
        </TouchableOpacity>
      );
    }
  };
  const SpeciesView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let updatedData = [...speciesData];
          updatedData[speciesIndex] = item;
          setSpeciesData(updatedData);
          setSpeciesShow(false);
          setErrorState({
            ...errorState,
            species: "",
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

  const GetUnits = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/selectunitlist")
        .then((response) => {
          if (response.status === 200) {
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
  {
    /* Get plant species list */
  }
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
  const addItemSpecies = (() => {
    let key = speciesData.length;
    return () => {
      speciesData.push({});
      setSpeciesData(speciesData.slice());
      key++;
    };
  })();

  const removeItemSpecies = () => {
    speciesData.pop();
    setSpeciesData(speciesData.slice());
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
      case "Unit":
        setUnitValue(value);
        setErrorState({ ...errorState, unit: "" });
        break;
      case "SpeciesList":
        let updatedData = [...speciesData];
        updatedData[speciesIndex] = value;
        setSpeciesData(updatedData);
        setErrorState({
          ...errorState,
          species: "",
        });
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
          <ScrollView nestedScrollEnabled={true}>
            {/* Area of Plantation */}
            <View>
              <Text style={styles.sectionText}>Area of Plantation</Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                value={area}
                onChangeText={(area) => {
                  setArea(area);
                  setErrorState({
                    ...errorState,
                    area: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorState.area != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.area}
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
              errorMessage={errorState.unit}
            />

            {/* Plant Species */}
            <SelectMultiple
              data={speciesData}
              title={"Plant Species"}
              onaddItem={() => addItemSpecies()}
              onremoveItem={() => removeItemSpecies()}
              onPressInteractiveCell={(index) => {
                setSpeciesIndex(index);
                setIsLoading(true);
                GetSpecies();
              }}
              errorMessage={errorState.species}
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
            {errorState.species != "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.species}
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
            {/* Number of Plants */}
            <View>
              <Text style={styles.sectionText}>Number of Plants *</Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                value={number}
                onChangeText={(number) => {
                  setNumber(number);
                  setErrorState({
                    ...errorState,
                    numberoPlants: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorState.numberoPlants != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.numberoPlants}
                </Text>
              )}
            </View>
            {/* Next */}
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

export default SowingForm2;

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
