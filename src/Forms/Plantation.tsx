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
import Foundation from "react-native-vector-icons/Foundation";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { RadioButton } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { useUpdateEffect } from "react-use";
import { InteractiveCell } from "../Components/InteractiveCell";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { SheetHeader } from "../Components/BottomSheetHeader";
import PickerComponent from "../Components/Picker";
import { SelectMultiple } from "../Components/SelectMultiple";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import { BASE_URL } from "../Config/URLs";
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

  const [HeightShow, setHeightShow] = useState(false);
  const [HeightValue, setHeightValue] = useState("Select Average Plant Height");
  const [HeightList, setHeightList] = useState([]);

  const [DiameterShow, setDiameterShow] = useState(false);
  const [DiameterValue, setDiameterValue] = useState(
    "Select Average Plant Diameter"
  );
  const [DiameterList, setDiameterList] = useState([]);

  const [numbers, setNumbers] = useState("");

  const ItemSeparatorView = () => {
    return (
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
        <Text style={styles.dropdownItem}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  {
    /* Average Plant Height View List */
  }
  const HeightView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setHeightValue(item?.name);
          setHeightShow(false);
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  {
    /* Average Plant Diameter View List */
  }
  const DiameterView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDiameterValue(item?.name);
          setDiameterShow(false);
        }}
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={styles.dropdownItem}>{item?.name}</Text>
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
  {
    /* Get Average Plant Height List */
  }
  const GetHeight = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/averageheightlist")
        .then((response) => {
          if (response.status === 200) {
            setHeightShow(true);
            setHeightList(response.data);
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
    /* Get Average Plant Diameter List */
  }
  const GetDiameter = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/averageheightlist")
        .then((response) => {
          if (response.status === 200) {
            setDiameterShow(true);
            setDiameterList(response.data);
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
      {/* Average Plant Height*/}
      <View>
        <Text style={styles.sectionText}>Average Plant Height</Text>
        {HeightShow ? (
          <View style={styles.button}>
            <Text
              style={styles.buttonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {HeightValue}
            </Text>
            <Ionicons name="chevron-up" size={30} color="#495057" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsLoading(true);
              GetHeight();
            }}
          >
            <Text
              style={styles.buttonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {HeightValue}
            </Text>
            <Ionicons name="chevron-down" size={30} color="#495057" />
          </TouchableOpacity>
        )}
        {HeightShow ? (
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
                data={HeightList}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={HeightView}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        ) : (
          <></>
        )}
      </View>
      {/* Average Plant Diameter */}
      <View>
        <Text style={styles.sectionText}>Average Plant Diameter</Text>
        {DiameterShow ? (
          <View style={styles.button}>
            <Text
              style={styles.buttonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {DiameterValue}
            </Text>
            <Ionicons name="chevron-up" size={30} color="#495057" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsLoading(true);
              GetDiameter();
            }}
          >
            <Text
              style={styles.buttonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {DiameterValue}
            </Text>
            <Ionicons name="chevron-down" size={30} color="#495057" />
          </TouchableOpacity>
        )}
        {DiameterShow ? (
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
                data={DiameterList}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={DiameterView}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        ) : (
          <></>
        )}
      </View>
      {/* No. of Plants */}
      <View>
        <Text style={styles.sectionText}>Area of Plantation</Text>
        <TextInput
          style={styles.button}
          placeholder={"0"}
          placeholderTextColor="#777"
          value={numbers}
          onChangeText={(numbers) => setNumbers(numbers)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            removeItem();
            specieCallback({
              specieId: SpeciesValueAPI,
              diameter: HeightValue,
              height: DiameterValue,
              noOfPlants: parseInt(numbers),
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

const monthArray = [
  { id: "1", name: "January", id: "1" },
  { id: "2", name: "Feburary", id: "2" },
  { id: "3", name: "March", id: "3" },
  { id: "4", name: "April", id: "4" },
  { id: "5", name: "May", id: "5" },
  { id: "6", name: "June", id: "6" },
  { id: "7", name: "July", id: "7" },
  { id: "8", name: "August", id: "8" },
  { id: "9", name: "September", id: "9" },
  { id: "10", name: "October", id: "10" },
  { id: "11", name: "November", id: "11" },
  { id: "12", name: "December", id: "12" },
];

const PlantationForm = ({ navigation, route }) => {
  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const [addActivity, setAddActivity] = useState(true);
  const [addArea, setAddArea] = useState(false);
  const [addSpecie, setAddSpecie] = useState(false);
  const [addDailyWagers, setAddDailyWagers] = useState(false);
  const [yearValue, setYearValue] = useState(null);
  const [monthValue, setMonthValue] = useState(null);
  const [monthList, setMonthList] = useState(monthArray);

  const [ActivityValue, setActivityValue] = useState(null);
  const [EcoZoneValue, setEcoZoneValue] = useState(null);
  const [LegalTypeValue, setLegalTypeValue] = useState(null);
  const [ForestCatValue, setForestCatValue] = useState(null);

  const [SiteNameValue, setSiteNameValue] = useState(null);
  const [SpacingValue, setSpacingValue] = useState(null);
  const [SourceValue, setSourceValue] = useState(null);
  const [ProtectionList, setProtectionList] = useState([{}]);
  const [protectionListIndex, setProtectionListIndex] = useState(0);
  const [
    plantationandafforestationlistValue,
    setplantationandafforestationlistValue,
  ] = useState("");

  const [checked, setChecked] = useState("NO");

  const [collaborationtypelistValue, setcollaborationtypelistValue] =
    useState("");

  const [Govtname, setGovtName] = useState("");

  const [NGO, setNGO] = useState("");
  const [sourceofirrigationlist, setSourceofirrigationlist] = useState([{}]);
  const [irrigationSourceIndex, setIrrigationSourceIndex] = useState(0);

  const [area, setArea] = useState("");
  const [UnitValue, setUnitValue] = useState(null);
  const [SpeciesValue, setSpeciesValue] = useState("");
  const [HeightValue, setHeightValue] = useState("");
  const [DiameterValue, setDiameterValue] = useState("");

  const [numbers, setNumbers] = useState("");

  const [dataSource, setDataSource] = useState([]);

  const [SurvivalRateValue, setSurvivalRateValue] = useState("");

  const [Damage, setDamage] = useState("");

  const [Acreage, setAcreage] = useState("");
  const [damageList, setDamageList] = useState([{}]);
  const [damageIndex, setDamageIndex] = useState(0);

  const [MaleAbove30, setMaleAbove30] = useState("");
  const [MaleBelow30, setMaleBelow30] = useState("");
  const [FemaleAbove30, setFemaleAbove30] = useState("");
  const [FemaleBelow30, setFemaleBelow30] = useState("");
  const [solutions, setSolutions] = useState("");
  const [measures, setMeasures] = useState("");

  const [speciesArray, setSpeciesArray] = useState([]);
  const [activityErrors, setActivityErrors] = useState({
    year: "",
    month: "",
    activity: "",
    ecologicalZone: "",
    legalForestType: "",
    forestType: "",
    siteName: "",
    plantSpacing: "",
    plantSource: "",
    protectionMechanism: "",
    afforestationMechanism: "",
    irrigationSource: "",
    collaborationType: "",
    govtOrganisation: "",
    privateCommunityName: "",
  });
  const [plantationDetailsError, setPlantationDetailsError] = useState({
    area: "",
    unit: "",
  });
  const [dailyWagersErrors, setDailyWagersError] = useState({
    maleAbove30: "",
    maleBelow30: "",
    femaleAbove30: "",
    FemaleBelow30: "",
    degradation: "",
    sustainability: "",
  });
  const [speciesDetailError, setSpeciesDetailError] = useState({
    plantSpecie: "",
    avgPlantHeight: "",
    avgPlantDiametre: "",
    plantationArea: "",
    successRate: "",
    damagedPlants: "",
    damageAcreage: "",
    damageReason: "",
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
            navigation.navigate("DashBoard");
            setSpeciesArray([]);
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
  const specieFunction = useCallback((Speciesfromchild: any) => {
    speciesArray.push(Speciesfromchild);
  }, []);

  {
    /* Item Separator View */
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

  const addItemIrrigation = (() => {
    let key = sourceofirrigationlist.length;
    return () => {
      sourceofirrigationlist.push({});
      setSourceofirrigationlist(sourceofirrigationlist.slice());
      key++;
    };
  })();

  const removeItemIrrigation = () => {
    sourceofirrigationlist.pop();
    setSourceofirrigationlist(sourceofirrigationlist.slice());
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

  {
    /*Function to call Years API*/
  }
  const GetYears = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/getyearslist")
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            const updatedData = await response.data.map((value, index) => ({
              id: index,
              name: value.value,
              text: value.text,
            }));
            setSheetData({
              activeIndex: "Year",
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
    /*Function to call Activities API*/
  }
  const GetActivities = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/getactivitylist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "Activity",
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
    /*Function to call Ecological Zones API*/
  }
  const GetEcoZone = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/GetEcologicalZonesList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "EcoZone",
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
    /*Function to call Legal Forest Type API*/
  }
  const GetLegalType = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/GetLegalForestTypeList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "LegalTypoe",
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
    /*Function to call Forest Categories  API*/
  }
  const GetForestCat = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/GetForestCategoryList")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "ForestCat",
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
              activeIndex: "SiteName",
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
        .then(async (response) => {
          if (response.status === 200) {
            // const updatedData = await response.data.map((value, index) => ({
            //   id: value.id,
            //   name: value.spacing,
            // }));
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
  {
    /*Function to call Spacing  API*/
  }
  const GetSource = async () => {
    try {
      axios
        .get(baseurl + "Selectlists/getsourcelist")
        .then(async (response) => {
          if (response.status === 200) {
            // const updatedData = await response.data.map((value, index) => ({
            //   id: value.id,
            //   name: value.nameOfPlantProcurement,
            // }));
            setSheetData({
              activeIndex: "Source",
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
    /*Function to call Protection  API*/
  }
  const GetProtection = async () => {
    try {
      axios
        .get(baseurl + "Selectlists/mechanism/protectionlist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "Protection",
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
    /*Function to call Protection  API*/
  }
  const Getplantationandafforestationlist = async () => {
    try {
      axios
        .get(baseurl + "Selectlists/mechanism/plantationandafforestationlist")
        .then(async (response) => {
          if (response.status === 200) {
            // const updatedData = await response.data.map((value, index) => ({
            //   id: index,
            //   name: value,
            // }));
            console.log(response.data);
            setSheetData({
              activeIndex: "Afforestation",
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
    /*Function to call Protection  API*/
  }
  const Getcollaborationtypelist = async () => {
    try {
      axios
        .get(baseurl + "Selectlists/community/collaborationtypelist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "Collaboration",
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
    /*Function to call Protection  API*/
  }
  const Getsourceofirrigationlist = async () => {
    try {
      axios
        .get(baseurl + "Selectlists/sourceofirrigationlist")
        .then((response) => {
          if (response.status === 200) {
            setSheetData({
              activeIndex: "IrrigationSource",
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
    /*Function to call Units  API*/
  }
  const GetUnits = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/selectunitlist")
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
              activeIndex: "Species",
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
    /* Get Average Plant Height List */
  }
  const GetHeight = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/averageheightlist")
        .then(async (response) => {
          if (response.status === 200) {
            // const updatedData = await response.data.map((value, index) => ({
            //   id: index,
            //   name: value,
            // }));
            setSheetData({
              activeIndex: "AvgHeight",
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
    /* Get Average Plant Diameter List */
  }
  const GetDiameter = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/plant/averageheightlist")
        .then(async (response) => {
          if (response.status === 200) {
            // const updatedData = await response.data.map((value, index) => ({
            //   id: index,
            //   name: value,
            // }));
            setSheetData({
              activeIndex: "Diametre",
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
    /* Get Survival Rate List */
  }
  const GetSurvivalRate = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/Plant/EstimatedSurvivalRateList")
        .then(async (response) => {
          if (response.status === 200) {
            // const updatedData = await response.data.map((value, index) => ({
            //   id: index,
            //   name: value,
            // }));
            setSheetData({
              activeIndex: "SurvivalRate",
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
    /* Get Success Rate List */
  }
  const Getsuccess = async () => {
    try {
      axios
        .get(baseurl + "SelectLists/DamageReasonList")
        .then(async (response) => {
          if (response.status === 200) {
            console.log(response.data);
            // const updatedData = await response.data.map((value, index) => ({
            //   id: value.id,
            //   name: value.reasons,
            // }));
            setSheetData({
              activeIndex: "DamageReason",
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

  const PostFunction = () => {
    // setIsLoading(true);
    speciesArray.push({
      specieId: SpeciesValue.id,
      diameter: HeightValue.name,
      height: DiameterValue.name,
      noOfPlants: parseInt(numbers),
    });
    const IrrigationSource = sourceofirrigationlist
      .map((a) => a.name)
      .toString();
    console.log(IrrigationSource);

    const ProtectionValues = ProtectionList.map((a) => a.name).toString();
    console.log(ProtectionValues);

    const DamagedValues = damageList.map((a) => a.id).toString();
    console.log(DamagedValues);
    const data = {
      subCatId: ActivityValue.id,
      siteId: SiteNameValue.id,
      forestType: ForestCatValue.id?.toString(),
      echoSystem: EcoZoneValue.id.toString(),
      communityCollaboration: checked,
      spacingBetweenPlants: SpacingValue.id,
      plantingYear: yearValue.name,
      successRate: SurvivalRateValue.name,
      demageToPlantationNo: Damage,
      demageToPlantationAcreage: Acreage,
      significanceOfActivity: solutions,
      remarks: measures,
      activityStatus: 0,
      month: monthValue.name,
      maleAbove30: MaleAbove30,
      maleBelow30: MaleBelow30,
      femaleAbove30: FemaleAbove30,
      femaleBelow30: FemaleBelow30,
      otherAbove30: 0,
      otherBelow30: 0,
      modeOfProcurement: SourceValue.id.toString(),
      mechanismForProtection: ProtectionList.map((a) => a.name).toString(),
      mechanismForAforestation: plantationandafforestationlistValue.name,
      govtCommunityName: Govtname,
      privateCommunityName: NGO,
      sourceOfIrrigation: sourceofirrigationlist.map((a) => a.name).toString(),
      forestOwnership: LegalTypeValue.id.toString(),
      damageReason: damageList.map((a) => a.id).toString(),
      monthDigit: monthValue.id,
      area: area,
      unitType: UnitValue.id,
      imageUrl: "",
      species: speciesArray,
    };
    try {
      axios
        .post(baseurl + "Forest/SavePlantationActivity", data, {
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
        });
    } catch (e) {
      console.log("error in catch", e);
      alert(e);
      setIsLoading(false);
    }
  };
  const validateAddactivity = () => {
    var error = false;
    if (yearValue == "" || yearValue == null) {
      error = true;
      setActivityErrors({ ...activityErrors, year: "Please Select Year" });
    } else if (monthValue == "" || monthValue == null) {
      error = true;
      setActivityErrors({ ...activityErrors, month: "Please Select Month" });
    } else if (ActivityValue == "" || ActivityValue == null) {
      error = true;
      console.log("activity error");
      setActivityErrors({
        ...activityErrors,
        activity: "Please Select activity",
      });
    } else if (EcoZoneValue == "" || EcoZoneValue == null) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        ecologicalZone: "Please Select EcoZone",
      });
    } else if (LegalTypeValue == "" || LegalTypeValue == null) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        legalForestType: "Please Select forest Type.",
      });
    } else if (SiteNameValue == "" || SiteNameValue == null) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        siteName: "Please Select forest name",
      });
    } else if (SpacingValue == "" || SpacingValue == null) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        plantSpacing: "Please Select Plants Spacing",
      });
    } else if (SourceValue == "" || SourceValue == null) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        plantSource: "Please Select Plants Source",
      });
    } else if (
      ProtectionList.length < 1 ||
      ProtectionList[0]?.name == undefined
    ) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        protectionMechanism: "Please Select Protection Mechanism",
      });
    } else if (
      plantationandafforestationlistValue == "" ||
      plantationandafforestationlistValue == null
    ) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        afforestationMechanism: "Please Select Plantation Afforestation",
      });
    } else if (
      sourceofirrigationlist.length < 1 ||
      sourceofirrigationlist[0]?.name == undefined
    ) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        irrigationSource: "Please Select Irrigation Source",
      });
    } else if (ForestCatValue == "" || ForestCatValue == null) {
      error = true;
      setActivityErrors({
        ...activityErrors,
        forestType: "Please Select Forest Category Type ",
      });
    }
    if (!error) {
      setAddArea(!addArea);
      setAddActivity(false);
      setAddDailyWagers(false);
      setAddSpecie(false);
    }
  };

  const validationPlantationArea = () => {
    var error = false;
    if (area == "" || area == null) {
      error = true;
      setPlantationDetailsError({
        ...plantationDetailsError,
        area: "Please Enter Area",
      });
    } else if (UnitValue == "" || UnitValue == null) {
      error = true;
      setPlantationDetailsError({
        ...plantationDetailsError,
        unit: "Please Select Unit",
      });
    }
    if (!error) {
      setAddSpecie(!addSpecie);
      setAddActivity(false);
      setAddArea(false);
      setAddDailyWagers(false);
    }
  };
  const validateSpeciesDetail = () => {
    var error = false;
    if (SpeciesValue == "" || SpeciesValue == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        plantSpecie: "Please Select Specie",
      });
    } else if (HeightValue == "" || HeightValue == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        avgPlantHeight: "Please Select Plant Height",
      });
    } else if (DiameterValue == "" || DiameterValue == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        avgPlantDiametre: "Please Select Plant Diametre",
      });
    } else if (numbers == "" || numbers == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        plantationArea: "Please Select Plant Area",
      });
    } else if (SurvivalRateValue == "" || SurvivalRateValue == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        successRate: "Please Select  Survival Rate",
      });
    } else if (Damage == "" || Damage == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        damagedPlants: "Please Select Damaged Plants",
      });
    } else if (Acreage == "" || Acreage == null) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        damageAcreage: "Please Select Acreage",
      });
    } else if (damageList.length < 1 || damageList[0]?.name == undefined) {
      error = true;
      setSpeciesDetailError({
        ...speciesDetailError,
        damageReason: "Please Select Damage Reason",
      });
    }

    if (!error) {
      setAddDailyWagers(!addDailyWagers);
      setAddActivity(false);
      setAddArea(false);
      setAddSpecie(false);
    }
  };
  const validateDailyWagers = () => {
    var error = false;
    if (MaleAbove30 == "" || MaleAbove30 == null) {
      error = true;
      setDailyWagersError({
        ...dailyWagersErrors,
        maleAbove30: "Please Enter male above 30",
      });
    } else if (MaleBelow30 == "" || MaleBelow30 == null) {
      error = true;
      setDailyWagersError({
        ...dailyWagersErrors,
        maleBelow30: "Please Enter male below 30",
      });
    } else if (FemaleAbove30 == "" || FemaleAbove30 == null) {
      error = true;
      setDailyWagersError({
        ...dailyWagersErrors,
        femaleAbove30: "Please Enter female below 30",
      });
    } else if (FemaleBelow30 == "" || FemaleBelow30 == null) {
      error = true;
      setDailyWagersError({
        ...dailyWagersErrors,
        FemaleBelow30: "Please Enter female below 30",
      });
    } else if (solutions == "" || solutions == null) {
      error = true;
      setDailyWagersError({
        ...dailyWagersErrors,
        degradation: "Please Enter degradation and solution",
      });
    } else if (measures == "" || measures == null) {
      error = true;
      setDailyWagersError({
        ...dailyWagersErrors,
        sustainability: "Please Enter sustainability measures",
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
      case "Year":
        setYearValue(value);
        setActivityErrors({ ...activityErrors, year: "" });
        break;
      case "Month":
        setMonthValue(value);
        setActivityErrors({ ...activityErrors, month: "" });
        break;

      case "Activity":
        setActivityValue(value);
        setActivityErrors({ ...activityErrors, activity: "" });
        break;
      case "EcoZone":
        setEcoZoneValue(value);
        setActivityErrors({ ...activityErrors, ecologicalZone: "" });
        break;
      case "LegalTypoe":
        setLegalTypeValue(value);
        setActivityErrors({ ...activityErrors, legalForestType: "" });
        break;

      case "ForestCat":
        setForestCatValue(value);
        setActivityErrors({ ...activityErrors, forestType: "" });
        break;

      case "SiteName":
        setSiteNameValue(value);
        setActivityErrors({ ...activityErrors, siteName: "" });
        break;

      case "Spacing":
        setSpacingValue(value);
        setActivityErrors({ ...activityErrors, plantSpacing: "" });
        break;
      case "Source":
        setSourceValue(value);
        setActivityErrors({ ...activityErrors, plantSource: "" });
        break;

      case "Afforestation":
        setplantationandafforestationlistValue(value);
        setActivityErrors({ ...activityErrors, afforestationMechanism: "" });
        break;

      case "Protection":
        let updatedProtection = [...ProtectionList];
        updatedProtection[protectionListIndex] = value;
        setProtectionList(updatedProtection);
        setActivityErrors({ ...activityErrors, protectionMechanism: "" });
        break;

      case "Collaboration":
        setcollaborationtypelistValue(value);
        setActivityErrors({ ...activityErrors, collaborationType: "" });
        break;

      case "IrrigationSource":
        let updatedIrrigation = [...sourceofirrigationlist];
        updatedIrrigation[irrigationSourceIndex] = value;
        setSourceofirrigationlist(updatedIrrigation);
        setActivityErrors({ ...activityErrors, irrigationSource: "" });
        break;

      case "UnitList":
        setUnitValue(value);
        setPlantationDetailsError({ ...plantationDetailsError, unit: "" });
        break;

      case "Species":
        setSpeciesValue(value);
        setSpeciesDetailError({ ...speciesDetailError, plantSpecie: "" });
        break;
      case "AvgHeight":
        setHeightValue(value);
        setSpeciesDetailError({ ...speciesDetailError, avgPlantHeight: "" });
        break;

      case "Diametre":
        setDiameterValue(value);
        setSpeciesDetailError({ ...speciesDetailError, avgPlantDiametre: "" });
        break;
      case "SurvivalRate":
        setSurvivalRateValue(value);
        setSpeciesDetailError({ ...speciesDetailError, successRate: "" });
        break;
      case "DamageReason":
        let updatedDamage = [...damageList];
        updatedDamage[damageIndex] = value;
        setDamageList(updatedDamage);
        setSpeciesDetailError({ ...speciesDetailError, damageReason: "" });
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
          Add Plantation Site DashBoard
        </Text>
        <View style={styles.Container}>
          <ScrollView nestedScrollEnabled={true}>
            <Button
              onPress={() => {
                setAddActivity(!addActivity);
                setAddArea(false);
                setAddDailyWagers(false);
                setAddSpecie(false);
              }}
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: 60,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              title=" Add Forest Activity Data"
            />

            {addActivity ? (
              <>
                <Text style={styles.requiredText}>
                  All fields marked with an asterisk (*) are required
                </Text>
                <ScrollView nestedScrollEnabled={true}>
                  <InteractiveCell
                    title="Year"
                    value={yearValue?.text}
                    onPress={() => {
                      setIsLoading(true);
                      GetYears();
                    }}
                    errorMessage={activityErrors.year}
                  />
                  <InteractiveCell
                    title="Month"
                    value={monthValue?.name}
                    onPress={() => {
                      setSheetData({
                        activeIndex: "Month",
                        data: monthList,
                      });
                    }}
                    errorMessage={activityErrors.month}
                  />

                  {/* Select Activity */}
                  <InteractiveCell
                    title="Activity"
                    value={ActivityValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetActivities();
                    }}
                    errorMessage={activityErrors.activity}
                  />

                  {/* Select Ecological Zone */}
                  <InteractiveCell
                    title="Ecological Zone"
                    value={EcoZoneValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetEcoZone();
                    }}
                    errorMessage={activityErrors.ecologicalZone}
                  />

                  {/* Select Legal Forest Type */}
                  <InteractiveCell
                    title="Legal Forest Type"
                    value={LegalTypeValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetLegalType();
                    }}
                    errorMessage={activityErrors.legalForestType}
                  />

                  {/* Select Forest Categories Type */}
                  <InteractiveCell
                    title="Forest Categories Type"
                    value={ForestCatValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetForestCat();
                    }}
                    errorMessage={activityErrors.forestType}
                  />

                  {/* Site Name/Location */}
                  <InteractiveCell
                    title="Site Name/Locatio"
                    value={SiteNameValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetSiteName();
                    }}
                    errorMessage={activityErrors.siteName}
                  />

                  {/* Spacing */}
                  <InteractiveCell
                    title="Spacing between Plants"
                    value={SpacingValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetSpacing();
                    }}
                    errorMessage={activityErrors.plantSpacing}
                  />

                  {/* Source */}
                  <InteractiveCell
                    title="Source of Plants *"
                    value={SourceValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      GetSource();
                    }}
                    errorMessage={activityErrors.plantSource}
                  />

                  {/* Protection */}
                  <SelectMultiple
                    data={ProtectionList}
                    title={"Mechanism for Protection"}
                    onaddItem={() => addItemProtection()}
                    onremoveItem={() => removeItemProtection()}
                    onPressInteractiveCell={(index) => {
                      setProtectionListIndex(index);
                      setIsLoading(true);
                      GetProtection();
                    }}
                    errorMessage={activityErrors.protectionMechanism}
                  />

                  {/* <InteractiveCell
                      title="Mechanism for Protection"
                      value={ProtectionValue?.name}
                      onPress={() => {
                        setIsLoading(true);
                        GetProtection();
                      }}
                      errorMessage={activityErrors.protectionMechanism}
                    /> */}

                  {/* plantationandafforestationlist */}
                  <InteractiveCell
                    title="Mechanism for Plantation and Afforestation"
                    value={plantationandafforestationlistValue?.name}
                    onPress={() => {
                      setIsLoading(true);
                      Getplantationandafforestationlist();
                    }}
                    errorMessage={activityErrors.afforestationMechanism}
                  />

                  {/* Community Collaboration */}
                  <View>
                    <Text style={styles.sectionText}>
                      Community Collaboration *
                    </Text>
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
                  {/* Community Collaboration Type */}

                  {checked === "YES" ? (
                    <InteractiveCell
                      title="Community Collaboration Type"
                      value={collaborationtypelistValue?.name}
                      onPress={() => {
                        setIsLoading(true);
                        Getcollaborationtypelist();
                      }}
                      errorMessage={activityErrors.collaborationType}
                    />
                  ) : (
                    <></>
                  )}
                  {/* Name of Govt Organization */}
                  {checked === "YES" ? (
                    <View>
                      <Text style={styles.sectionText}>
                        Name of Govt Organization
                      </Text>
                      <TextInput
                        style={styles.button}
                        placeholder={"Enter name of Govt. Organization"}
                        placeholderTextColor="#777"
                        value={Govtname}
                        onChangeText={(Govtname) => setGovtName(Govtname)}
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* Name of Private Community / NGO */}
                  {checked === "YES" ? (
                    <View>
                      <Text style={styles.sectionText}>
                        Name of Private Community / NGO
                      </Text>
                      <TextInput
                        style={styles.button}
                        placeholder={"Enter name of Private Community (if any)"}
                        placeholderTextColor="#777"
                        value={NGO}
                        onChangeText={(NGO) => setNGO(NGO)}
                      />
                    </View>
                  ) : (
                    <></>
                  )}
                  {/* sourceofirrigationlist */}
                  <SelectMultiple
                    data={sourceofirrigationlist}
                    title={"Source of Irrigation"}
                    onaddItem={() => addItemIrrigation()}
                    onremoveItem={() => removeItemIrrigation()}
                    onPressInteractiveCell={(index) => {
                      setIrrigationSourceIndex(index);
                      setIsLoading(true);
                      Getsourceofirrigationlist();
                    }}
                    errorMessage={activityErrors.irrigationSource}
                  />
                  {/* <InteractiveCell
                      title="Source of Irrigation"
                      value={sourceofirrigationlistValue?.name}
                      onPress={() => {
                        setIsLoading(true);
                        Getsourceofirrigationlist();
                      }}
                      errorMessage={activityErrors.irrigationSource}
                    /> */}
                </ScrollView>
              </>
            ) : (
              <></>
            )}
            <Button
              onPress={() => {
                validateAddactivity();
              }}
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: 60,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              title=" Detail of Plantation Area"
            />

            {addArea ? (
              <>
                <Text style={styles.requiredText}>
                  All fields marked with an asterisk (*) are required
                </Text>
                <View>
                  <Text style={styles.sectionText}>Area of Plantation</Text>
                  <TextInput
                    style={styles.button}
                    placeholder={"0"}
                    placeholderTextColor="#777"
                    value={area}
                    onChangeText={(area) => {
                      setArea(area);
                      setPlantationDetailsError({
                        ...plantationDetailsError,
                        area: "",
                      });
                    }}
                    keyboardType="numeric"
                  />
                  {plantationDetailsError.area != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {plantationDetailsError.area}
                    </Text>
                  )}
                </View>
                <InteractiveCell
                  title="Select Unit"
                  value={UnitValue?.name}
                  onPress={() => {
                    setIsLoading(true);
                    GetUnits();
                  }}
                  errorMessage={plantationDetailsError.unit}
                />
              </>
            ) : (
              <></>
            )}
            <Button
              onPress={() => {
                validationPlantationArea();
              }}
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: 60,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              title=" Details of Species"
            />

            {addSpecie ? (
              <>
                <Text style={styles.requiredText}>
                  All fields marked with an asterisk (*) are required
                </Text>
                {/* Plant Species */}
                <InteractiveCell
                  title="Plant Species"
                  value={SpeciesValue?.name}
                  onPress={() => {
                    setIsLoading(true);
                    GetSpecies();
                  }}
                  errorMessage={speciesDetailError.plantSpecie}
                />

                {/* Average Plant Height*/}
                <InteractiveCell
                  title="Average Plant Height"
                  value={HeightValue?.name}
                  onPress={() => {
                    setIsLoading(true);
                    GetHeight();
                  }}
                  errorMessage={speciesDetailError.avgPlantHeight}
                />

                {/* Average Plant Diameter */}
                <InteractiveCell
                  title="Average Plant Diameter"
                  value={DiameterValue?.name}
                  onPress={() => {
                    setIsLoading(true);
                    GetDiameter();
                  }}
                  errorMessage={speciesDetailError.avgPlantDiametre}
                />

                {/* No. of Plants */}
                <View>
                  <Text style={styles.sectionText}>Area of Plantation</Text>
                  <TextInput
                    style={styles.button}
                    placeholder={"0"}
                    placeholderTextColor="#777"
                    value={numbers}
                    onChangeText={(numbers) => {
                      setNumbers(numbers);
                      setSpeciesDetailError({
                        ...speciesDetailError,
                        plantationArea: "",
                      });
                    }}
                    keyboardType="numeric"
                  />
                  {speciesDetailError.plantationArea != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {speciesDetailError.plantationArea}
                    </Text>
                  )}
                </View>
                {/* ADD AND REMOVE FIELDS */}
                <View style={styles.addMinusContainer}>
                  <TouchableOpacity
                    style={[
                      styles.addMinus,
                      { backgroundColor: theme.primary },
                    ]}
                    onPress={() => {
                      addItem();
                    }}
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
                {/* Scrolling the added fields */}
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
                <InteractiveCell
                  title="Estimated Success/Survival Rate"
                  value={SurvivalRateValue?.name}
                  onPress={() => {
                    setIsLoading(true);
                    GetSurvivalRate();
                  }}
                  errorMessage={speciesDetailError.successRate}
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
                    value={Damage}
                    onChangeText={(Damage) => {
                      setDamage(Damage);
                      setSpeciesDetailError({
                        ...speciesDetailError,
                        damagedPlants: "",
                      });
                    }}
                    keyboardType="numeric"
                  />
                  {speciesDetailError.damagedPlants != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {speciesDetailError.damagedPlants}
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
                    value={Acreage}
                    onChangeText={(Acreage) => {
                      setAcreage(Acreage);
                      setSpeciesDetailError({
                        ...speciesDetailError,
                        damageAcreage: "",
                      });
                    }}
                    keyboardType="numeric"
                  />
                  {speciesDetailError.damageAcreage != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {speciesDetailError.damageAcreage}
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
                  errorMessage={speciesDetailError.damageReason}
                />
              </>
            ) : (
              <></>
            )}
            <Button
              onPress={() => {
                validateSpeciesDetail();
              }}
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: 60,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              title="  Detail of Daily Wagers"
            />

            {addDailyWagers ? (
              <>
                <Text style={styles.requiredText}>
                  All fields marked with an asterisk (*) are required
                </Text>
                <View>
                  <Text style={styles.sectionText}>Male Above 30 *</Text>
                  <TextInput
                    style={styles.button}
                    placeholder={"0"}
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={MaleAbove30}
                    onChangeText={(MaleAbove30) => {
                      setMaleAbove30(MaleAbove30);
                      setDailyWagersError({
                        ...dailyWagersErrors,
                        maleAbove30: "",
                      });
                    }}
                  />
                  {dailyWagersErrors.maleAbove30 != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {dailyWagersErrors.maleAbove30}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.sectionText}>Male Below 30 *</Text>
                  <TextInput
                    style={styles.button}
                    placeholder={"0"}
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={MaleBelow30}
                    onChangeText={(MaleBelow30) => {
                      setMaleBelow30(MaleBelow30);
                      setDailyWagersError({
                        ...dailyWagersErrors,
                        maleBelow30: "",
                      });
                    }}
                  />
                  {dailyWagersErrors.maleBelow30 != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {dailyWagersErrors.maleBelow30}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.sectionText}>Female Above 30 *</Text>
                  <TextInput
                    style={styles.button}
                    placeholder={"0"}
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={FemaleAbove30}
                    onChangeText={(FemaleAbove30) => {
                      setFemaleAbove30(FemaleAbove30);
                      setDailyWagersError({
                        ...dailyWagersErrors,
                        femaleAbove30: "",
                      });
                    }}
                  />
                  {dailyWagersErrors.femaleAbove30 != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {dailyWagersErrors.femaleAbove30}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.sectionText}>Female Below 30 *</Text>
                  <TextInput
                    style={styles.button}
                    placeholder={"0"}
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={FemaleBelow30}
                    onChangeText={(FemaleBelow30) => {
                      setFemaleBelow30(FemaleBelow30);
                      setDailyWagersError({
                        ...dailyWagersErrors,
                        FemaleBelow30: "",
                      });
                    }}
                  />
                  {dailyWagersErrors.FemaleBelow30 != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {dailyWagersErrors.FemaleBelow30}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.sectionText}>
                    Underlying cause of degradation and solution
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={[
                      styles.button,
                      { height: 100, justifyContent: "flex-start" },
                    ]}
                    placeholder={"Cause of degradation and solution"}
                    placeholderTextColor="#777"
                    value={solutions}
                    onChangeText={(solutions) => {
                      setSolutions(solutions);
                      setDailyWagersError({
                        ...dailyWagersErrors,
                        degradation: "",
                      });
                    }}
                  />
                  {dailyWagersErrors.degradation != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {dailyWagersErrors.degradation}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.sectionText}>
                    Long term sustainability measures adopted
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={[
                      styles.button,
                      {
                        height: 100,
                        justifyContent: "flex-start",
                      },
                    ]}
                    placeholder={"Sustainability measures adopted"}
                    placeholderTextColor="#777"
                    value={measures}
                    onChangeText={(measures) => {
                      setMeasures(measures);
                      setDailyWagersError({
                        ...dailyWagersErrors,
                        sustainability: "",
                      });
                    }}
                  />
                  {dailyWagersErrors.sustainability != "" && (
                    <Text
                      style={{ padding: 2, paddingHorizontal: 8, color: "red" }}
                    >
                      {dailyWagersErrors.sustainability}
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <></>
            )}
            <Button
              onPress={() => validateDailyWagers()}
              disabled={!addDailyWagers}
              title="Submit"
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
export default PlantationForm;

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
    paddingBottom: 10,
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
