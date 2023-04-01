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
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Foundation from "react-native-vector-icons/Foundation";
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

  const { item, specieCallback, removeItem, id } = props;
  const { key } = item;

  const [isLoading, setIsLoading] = useState(false);

  const [SpeciesShow, setSpeciesShow] = useState(false);
  const [SpeciesValue, setSpeciesValue] = useState("Select Species");
  const [SpeciesValueAPI, setSpeciesValueAPI] = useState(null);
  const [SpeciesList, setSpeciesList] = useState([]);

  const [no, setNo] = useState("");

  const [availableNoPlants, setAvailableNoPlants] = useState(0);

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
          setSpeciesValue(item.speciesName);
          setSpeciesShow(false);
          setSpeciesValueAPI(item.speciesId);
          setAvailableNoPlants(item.availableStock);
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.speciesName}</Text>
      </TouchableOpacity>
    );
  };

  {
    /* Get plant species list */
  }
  const GetSpecies = async () => {
    try {
      axios
        .post(
          baseurl + "Nursery/SpeciesListByNursery",
          {
            value: "string",
            text: "string",
            intValue: id,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            setIsLoading(false);
            setSpeciesShow(true);
            setSpeciesList(response.data);
          }
        })
        .catch((error) => {
          console.log("error in axiox", error);
          alert(error);
        });
    } catch (e) {
      console.log(e);
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
      {SpeciesValueAPI ? (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={styles.sectionText}>Available Stock:</Text>
          <Text
            style={[
              styles.sectionText,
              {
                color: "#29AC6F",
              },
            ]}
          >
            {" "}
            {availableNoPlants}
          </Text>
        </View>
      ) : (
        <></>
      )}
      {/* Plant */}
      <View>
        <Text style={styles.sectionText}>Number of Plants</Text>
        <TextInput
          style={styles.button}
          placeholder={"0"}
          placeholderTextColor="#777"
          value={no}
          onChangeText={(no) => setNo(no)}
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
              noOfPlants: parseInt(no),
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

const DistributionForm = ({ navigation }) => {
  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [text, setText] = useState("Please Select the Date");
  const [dateApi, setDateApi] = useState("");

  const [NurseryListShow, setNurseryListShow] = useState(false);
  const [NurseryListValue, setNurseryListValue] = useState(null);
  const [NurseryListValueAPI, setNurseryListValueAPI] = useState(null);
  const [NurseryListList, setNurseryListList] = useState([]);

  const [DTypeShow, setDTypeShow] = useState(false);
  const [DTypeValue, setDTypeValue] = useState(null);
  const [DTypeValueAPI, setDTypeValueAPI] = useState(null);
  const [DTypeList, setDTypeList] = useState([]);

  const [SpeciesShow, setSpeciesShow] = useState(false);
  const [SpeciesValue, setSpeciesValue] = useState(null);
  const [SpeciesValueAPI, setSpeciesValueAPI] = useState(null);
  const [SpeciesList, setSpeciesList] = useState([]);

  // const [availableNoPlants]

  const [dataSource, setDataSource] = useState([]);

  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [no, setNo] = useState("");

  const [stockArray, setStockArray] = useState([]);

  const [availableNoPlants, setAvailableNoPlants] = useState(0);
  const [errorState, setErrorState] = useState({
    activityDate: "",
    nurseryType: "",
    legalStatus: "",
    distrbutedToName: "",
    distributionFather: "",
    distributionCnic: "",
    distributioonMobile: "",
    address: "",
    plantSpecies: "",
    numberOPlants: "",
  });
  const bottomSheetRef = useRef(null);
  const [sheetData, setSheetData] = React.useState({
    activeIndex: "Division",
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
        {
          text: "YES",
          onPress: () => {
            navigation.goBack("");
            setStockArray([]);
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    setDateApi(tempDate.toJSON());
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
    /* NurseryList View */
  }
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
  {
    /* DType View */
  }
  const DTypeView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDTypeValue(item.value);
          setDTypeShow(false);
          setDTypeValueAPI(item.key);
          setErrorState({
            ...errorState,
            legalStatus: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  {
    /* Plant species View List */
  }
  const SpeciesView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSpeciesValue(item.speciesName);
          setSpeciesShow(false);
          setSpeciesValueAPI(item.speciesId);
          setAvailableNoPlants(item.availableStock);
          setErrorState({
            ...errorState,
            plantSpecies: "",
          });
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item.speciesName}</Text>
      </TouchableOpacity>
    );
  };

  {
    /* Get plant species list */
  }
  const GetSpecies = async () => {
    setIsLoading(true);
    try {
      axios
        .post(
          baseurl + "Nursery/SpeciesListByNursery",
          {
            value: "string",
            text: "string",
            intValue: NurseryListValue.id,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.speciesName,
            }));
            setSheetData({
              activeIndex: "Species",
              data: updatedData,
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log("error in axiox", error);
          alert(error);
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  {
    /* Get NurseryList  */
  }
  const GetNurseryList = async () => {
    try {
      axios
        .get(baseurl + "Nursery/NurseriesList")
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            const updatedData = await response.data.map((value, index) => ({
              ...value,
              name: value.nurseryName,
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
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  {
    /* Get DType */
  }
  const GetDistributedToList = async () => {
    try {
      axios
        .get(baseurl + "Nursery/DistributedToList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "DistributedToList",
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
      setIsLoading(false);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Card
        item={item}
        specieCallback={specieFunction}
        removeItem={removeItem}
        id={NurseryListValue?.id}
      />
    );
  };

  const specieFunction = useCallback((Speciesfromchild) => {
    stockArray.push(Speciesfromchild);
  }, []);

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

  const PostFunction = () => {
    stockArray.push({
      specie: SpeciesValue.speciesId,
      noOfPlants: parseInt(no),
    });
    const data = {
      id: 0,
      nurseryId: NurseryListValue.id,
      distrbutedToType: DTypeValue.id,
      stockType: 1,
      distrbutedToName: name,
      fatherName: father,
      cnic: cnic,
      address: address,
      mobileNo: mobile,
      distributionDate: dateApi,
      distributedNoOfPlants: 0,
      divisionId: 0,
      nurserySpeciesRelationId: 0,
      distributions: stockArray,
    };
    console.log("data ", data);
    try {
      axios
        .post(baseurl + "Nursery/SaveNurseryDistribution", data, {
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
          setStockArray([]);
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
        activityDate: "Please select activity date",
      });
    } else if (NurseryListValue == "" || NurseryListValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        nurseryType: "Please select Nursery",
      });
    } else if (DTypeValue == "" || DTypeValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        legalStatus: "Please select Distribution Type",
      });
    } else if (name == "" || name == null) {
      error = true;
      setErrorState({
        ...errorState,
        distrbutedToName: "Please enter name",
      });
    } else if (father == "" || father == null) {
      error = true;
      setErrorState({
        ...errorState,
        distributionFather: "Please enter father name",
      });
    } else if (cnic == "" || cnic == null || cnic.length < 13) {
      error = true;
      setErrorState({
        ...errorState,
        distributionCnic: "Please enter CNIC",
      });
    } else if (address == "" || address == null) {
      error = true;
      setErrorState({
        ...errorState,
        address: "Please enter address",
      });
    } else if (mobile == "" || mobile == null || mobile.length < 11) {
      error = true;
      setErrorState({
        ...errorState,
        distributioonMobile: "Please enter mobile",
      });
    } else if (SpeciesValue == "" || SpeciesValue == null) {
      error = true;
      setErrorState({
        ...errorState,
        plantSpecies: "Please select Species",
      });
    } else if (no == "" || no == null) {
      error = true;
      setErrorState({
        ...errorState,
        numberOPlants: "Please enter number of plants",
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
      case "Species":
        setSpeciesValue(value);
        setAvailableNoPlants(value.availableStock);
        setErrorState({ ...errorState, plantSpecies: "" });
        break;
      case "Nursery":
        setNurseryListValue(value);
        setErrorState({ ...errorState, nurseryType: "" });
        break;
      case "DistributedToList":
        setDTypeValue(value);
        setErrorState({ ...errorState, legalStatus: "" });
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
          Add Distribution DashBoard
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
              {errorState.activityDate !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.activityDate}
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

            {/* Select DType */}
            <InteractiveCell
              title="Distribution to (Type)"
              value={DTypeValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetDistributedToList();
              }}
              errorMessage={errorState.legalStatus}
            />

            {/* Distribution to (Name) */}

            <View>
              <Text style={styles.sectionText}>Distribution to (Name)</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Name"}
                placeholderTextColor="#777"
                value={name}
                onChangeText={(name) => {
                  setName(name);
                  setErrorState({
                    ...errorState,
                    distrbutedToName: "",
                  });
                }}
              />
              {errorState.distrbutedToName !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.distrbutedToName}
                </Text>
              )}
            </View>
            {/* Distribution to (Father Name) */}
            <View>
              <Text style={styles.sectionText}>
                Distribution to (Father Name)
              </Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Father Name"}
                placeholderTextColor="#777"
                value={father}
                onChangeText={(father) => {
                  setFather(father);
                  setErrorState({
                    ...errorState,
                    distributionFather: "",
                  });
                }}
              />
              {errorState.distributionFather !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.distributionFather}
                </Text>
              )}
            </View>
            {/* Distribution to (CNIC) */}
            <View>
              <Text style={styles.sectionText}>Distribution to (CNIC)</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter CNIC"}
                placeholderTextColor="#777"
                value={cnic}
                onChangeText={(cnic) => {
                  setCnic(cnic.replace(/[^0-9]/g, ""));
                  setErrorState({
                    ...errorState,
                    distributionCnic: "",
                  });
                }}
                keyboardType="numeric"
                maxLength={13}
              />
              {errorState.distributionCnic !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.distributionCnic}
                </Text>
              )}
            </View>
            {/* Distribution to (Address) */}
            <View>
              <Text style={styles.sectionText}>Distribution to (Address)</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Address"}
                placeholderTextColor="#777"
                value={address}
                onChangeText={(address) => {
                  setAddress(address);
                  setErrorState({
                    ...errorState,
                    address: "",
                  });
                }}
              />
              {errorState.address !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.address}
                </Text>
              )}
            </View>
            {/* Distribution to (Mobile) */}
            <View>
              <Text style={styles.sectionText}>Distribution to (Mobile)</Text>
              <TextInput
                style={styles.button}
                placeholder={"Enter Mobile Number"}
                placeholderTextColor="#777"
                value={mobile}
                onChangeText={(mobile) => {
                  setMobile(mobile.replace(/[^0-9]/g, ""));
                  setErrorState({
                    ...errorState,
                    distributioonMobile: "",
                  });
                }}
                maxLength={11}
                keyboardType="numeric"
              />
              {errorState.distributioonMobile !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.distributioonMobile}
                </Text>
              )}
            </View>
            {/* Plant Species */}
            <InteractiveCell
              title="Plant Species"
              value={SpeciesValue?.name}
              onPress={() => {
                setIsLoading(true);
                GetSpecies();
              }}
              errorMessage={errorState.plantSpecies}
            />

            {SpeciesValue !== null ? (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.sectionText}>Available Stock:</Text>
                <Text
                  style={[
                    styles.sectionText,
                    {
                      color: "#29AC6F",
                    },
                  ]}
                >
                  {" "}
                  {availableNoPlants}
                </Text>
              </View>
            ) : (
              <></>
            )}
            {/* No. of Plants */}
            <View>
              <Text style={styles.sectionText}>Number of Plants</Text>
              <TextInput
                style={styles.button}
                // placeholder={availableNoPlants.toString()}
                placeholder={"0"}
                placeholderTextColor="#777"
                value={no}
                onChangeText={(no) => {
                  setNo(no);
                  setErrorState({
                    ...errorState,
                    numberOPlants: "",
                  });
                }}
                keyboardType="numeric"
              />
              {errorState.numberOPlants !== "" && (
                <Text
                  style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                >
                  {errorState.numberOPlants}
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

export default DistributionForm;

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
