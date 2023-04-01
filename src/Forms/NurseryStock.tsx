import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
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
const { height, width } = Dimensions.get("screen");

const Card = (props) => {
  const baseurl = BASE_URL;

  const { item, specieCallback, removeItem } = props;
  const { key } = item;

  const [isLoading, setIsLoading] = useState(false);

  const [SpeciesShow, setSpeciesShow] = useState(false);
  const [SpeciesValue, setSpeciesValue] = useState("Select Species");
  const [SpeciesValueAPI, setSpeciesValueAPI] = useState(null);
  const [SpeciesList, setSpeciesList] = useState([]);

  const [fit, setFit] = useState(null);
  const [unfit, setUnfit] = useState(null);

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
    /* Plant species View List */
  }
  const SpeciesView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSpeciesValue(item.name);
          setSpeciesShow(false);
          setSpeciesValueAPI(item.id);
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
    /* Get plant species list */
  }
  const GetSpecies = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/specieslist")
        .then((response) => {
          if (response.status === 200) {
            setSpeciesShow(true);
            setSpeciesList(response.data);
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

  return (
    <View>
      {/* Plant Species */}
      <View>
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
      </View>
      {/* Plantable / Fit Stock */}
      <View>
        <Text style={styles.sectionText}>Plantable / Fit Stock</Text>
        <TextInput
          style={styles.button}
          placeholder={"0"}
          placeholderTextColor="#777"
          value={fit}
          onChangeText={(fit) => setFit(fit)}
          keyboardType="numeric"
        />
      </View>
      {/* Unplantable / Fit Stock */}
      <View>
        <Text style={styles.sectionText}>Unplantable / Fit Stock</Text>
        <TextInput
          style={styles.button}
          placeholder={"0"}
          placeholderTextColor="#777"
          value={unfit}
          onChangeText={(unfit) => setUnfit(unfit)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            removeItem();
            specieCallback({
              specie: SpeciesValueAPI,
              fitStock: parseInt(fit),
              unfitStock: parseInt(unfit),
            });
          }}
        >
          <Text style={styles.nextText}>ADD</Text>
        </TouchableOpacity>
      </View>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
    </View>
  );
};

const NurseryStockForm = ({ navigation }) => {
  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("Please Select the Date");
  const [dateApi, setDateApi] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState(0);

  const [dataSource, setDataSource] = useState([]);

  const [NurseryListShow, setNurseryListShow] = useState(false);
  const [NurseryListValue, setNurseryListValue] = useState(null);
  const [NurseryListValueAPI, setNurseryListValueAPI] = useState(null);
  const [NurseryListList, setNurseryListList] = useState([]);

  const [SpeciesShow, setSpeciesShow] = useState(false);
  const [SpeciesValue, setSpeciesValue] = useState("Select Species");
  const [SpeciesValueAPI, setSpeciesValueAPI] = useState(null);
  const [SpeciesList, setSpeciesList] = useState([]);

  const [fit, setFit] = useState("");
  const [unfit, setUnfit] = useState("");
  const [errorState, setErrorState] = useState({
    startDate: "",
    nurseryType: "",
    plantSpecies: "",
    plantableStock: "",
    unplantableStock: "",
  });
  const [stockArray, setStockArray] = useState([]);
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

  {
    /* Plant species View List */
  }
  const SpeciesView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSpeciesValue(item.name);
          setSpeciesShow(false);
          setSpeciesValueAPI(item.id);
          setErrorState({
            ...errorState,
            plantSpecies: "",
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
    /* Get plant species list */
  }
  const GetSpecies = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/specieslist")
        .then((response) => {
          console.log("response ", JSON.stringify(response));
          if (response.status === 200) {
            setSpeciesShow(true);
            setSpeciesList(response.data);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const NurseryListView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setNurseryListValue(item.nurseryName);
          setNurseryListShow(false);
          setNurseryListValueAPI(item.id);
          setErrorState({
            ...errorState,
            nurseryType: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.nurseryName}</Text>
      </TouchableOpacity>
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Card
        item={item}
        specieCallback={specieFunction}
        removeItem={removeItem}
      />
    );
  };

  const specieFunction = useCallback((Speciesfromchild) => {
    stockArray.push(Speciesfromchild);
  }, []);

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
    /* Get NurseryList */
  }
  const GetNurseryList = async () => {
    try {
      axios
        .get(baseurl + "Nursery/NurseriesList")
        .then(async (response) => {
          if (response.status === 200) {
            let updatedData = await response.data.map((value, index) => ({
              name: value.nurseryName,
              id: value.id,
            }));
            setSheetData({
              activeIndex: "Nursery",
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

  const addItem = (() => {
    let key = dataSource.length;
    return () => {
      dataSource.push({
        key,
      });
      setDataSource(dataSource.slice());
      key++;
    };
  })();

  const removeItem = () => {
    dataSource.pop();
    setDataSource(dataSource.slice());
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    setErrorState({
      ...errorState,
      startDate: "",
    });
    setDateApi(tempDate.toJSON());
    if (tempDate.getMonth() + 1 < 10) {
      let fDate =
        "0" +
        (tempDate.getMonth() + 1) +
        " / " +
        tempDate.getDate() +
        " / " +
        tempDate.getFullYear();
      setText(fDate);

      setYear(tempDate.getFullYear());
      setMonth(parseInt("0" + (tempDate.getMonth() + 1)));
    } else {
      let fDate =
        tempDate.getMonth() +
        1 +
        " / " +
        tempDate.getDate() +
        " / " +
        tempDate.getFullYear();
      setText(fDate);

      setYear(tempDate.getFullYear());
      setMonth(parseInt(tempDate.getMonth() + 1));
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

  const PostFunction = () => {
    stockArray.push({
      specie: SpeciesValueAPI,
      fitStock: parseInt(fit),
      unfitStock: parseInt(unfit),
    });
    const data = {
      id: 0,
      year: year.toString(),
      month: month,
      dateTime: dateApi,
      nurseryId: NurseryListValue.id,
      stock: stockArray,
    };
    console.log("data ", data);
    setIsLoading(true);
    try {
      axios
        .post(baseurl + "Nursery/SaveNurseryStock", data, {
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
    if (dateApi == "" || dateApi == null) {
      error = true;
      setErrorState({
        ...errorState,
        startDate: "Please Select Activity Date",
      });
    } else if (NurseryListValue == "" || NurseryListValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        nurseryType: "Please Select Nursery Type",
      });
    } else if (SpeciesValueAPI == "" || SpeciesValueAPI == null) {
      error = true;
      setErrorState({ ...errorState, plantSpecies: "Please Select Specie" });
    } else if (fit == "" || fit == null) {
      error = true;
      setErrorState({
        ...errorState,
        plantableStock: "Please Enter Plantable Stock",
      });
    } else if (unfit == "" || unfit == null) {
      error = true;
      setErrorState({
        ...errorState,
        unplantableStock: "Please Enter UnPlantable Stock",
      });
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
      case "Nursery":
        setNurseryListValue(value);
        setErrorState({
          ...errorState,
          nurseryType: "",
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
          Add Nursery Stock DashBoard
        </Text>
        <View style={styles.Container}>
          <ScrollView>
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
            {/* Select Nursery */}
            <InteractiveCell
              title="Select Nursery"
              value={NurseryListValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetNurseryList();
              }}
              errorMessage={errorState.nurseryType}
            />

            {/* Plant Species */}
            <View>
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
              {errorState.plantSpecies != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.plantSpecies}
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
            </View>
            {/* Plantable / Fit Stock */}
            <View>
              <Text style={styles.sectionText}>Plantable / Fit Stock</Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                value={fit}
                onChangeText={(fit) => {
                  setFit(fit);
                  setErrorState({
                    ...errorState,
                    plantableStock: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorState.plantableStock != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.plantableStock}
                </Text>
              )}
            </View>
            {/* Unlantable / Fit Stock */}
            <View>
              <Text style={styles.sectionText}>Unplantable / Fit Stock</Text>
              <TextInput
                style={styles.button}
                placeholder={"0"}
                placeholderTextColor="#777"
                value={unfit}
                onChangeText={(unfit) => {
                  setUnfit(unfit);
                  setErrorState({
                    ...errorState,
                    unplantableStock: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorState.unplantableStock != "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.unplantableStock}
                </Text>
              )}
            </View>
            {/* Add Minus Views */}
            <View style={styles.addMinusContainer}>
              <TouchableOpacity
                style={[styles.addMinus, { backgroundColor: "#29AA74" }]}
                onPress={addItem}
              >
                <Foundation name="plus" size={25} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  width: 20,
                }}
              />
              <TouchableOpacity
                style={[styles.addMinus, { backgroundColor: "red" }]}
                onPress={removeItem}
              >
                <Foundation name="minus" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <ScrollView
              nestedScrollEnabled={true}
              horizontal={true}
              style={{
                width: "100%",
              }}
            >
              <FlatList
                nestedScrollEnabled={true}
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
              />
            </ScrollView>
            {/* Bottom Button */}
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
    </BottomSheetModalProvider>
  );
};
export default NurseryStockForm;

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
  addMinusContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
  },
  addMinus: {
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  metaDataContainer: {
    flex: 1,
  },
});
