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
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import { Button } from "../../Components/Button";
const { height, width } = Dimensions.get("screen");

const SowingForm3 = ({ navigation, route }) => {
  const {
    DateAPI,
    LegalTypeValueAPI,
    ActivityValueAPI,
    ActivityTypeValueAPI,
    SiteNameValueAPI,
    SpacingValueAPI,
    Dimension,
    checked,
    area,
    UnitValueAPI,
    SpeciesValueAPI,
    number,
  } = route.params;

  const baseurl = BASE_URL;
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [MaleAbove30, setMaleAbove30] = useState("");
  const [MaleBelow30, setMaleBelow30] = useState("");
  const [FemaleAbove30, setFemaleAbove30] = useState("");
  const [FemaleBelow30, setFemaleBelow30] = useState("");
  const [OtherAbove30, setOtherAbove30] = useState("");
  const [OtherBelow30, setOtherBelow30] = useState("");
  const [solutions, setSolutions] = useState("");
  const [measures, setMeasures] = useState("");

  const [errorState, setErrorState] = useState({
    maleAbove30: "",
    maleBelow30: "",
    femaleAbove30: "",
    femaleBelow30: "",
    otherAboove30: "",
    otherBelow30: "",
    signifance: "",
    sustainibility: "",
  });

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

  const PostFunction = () => {
    const data = {
      addedBy: "",
      addedAt: null,
      updatedBy: "",
      updatedAt: null,
      isDeleted: false,
      id: 0,
      activityDate: DateAPI,
      legalForestType: LegalTypeValueAPI,
      sowingDibblingActivity: ActivityValueAPI,
      noOfPlants: number,
      dimensions: Dimension,
      siteId: SiteNameValueAPI,
      spacingId: SpacingValueAPI,
      isWatering: checked == "YES" ? 1 : 2,
      sowingType: ActivityTypeValueAPI,
      area: area,
      areaUnit: UnitValueAPI,
      maleAbove30: MaleAbove30,
      maleBelow30: MaleBelow30,
      femaleAbove30: FemaleAbove30,
      femaleBelow30: FemaleBelow30,
      otherAbove30: OtherAbove30,
      otherBelow30: OtherBelow30,
      signifance: solutions,
      sustainibilityMeasures: measures,
      species: SpeciesValueAPI.toString(),
      conservatorComment: "",
      pdComment: "",
      activityStatus: 0,
    };
    console.log("data ", data);
    setIsLoading(true);
    try {
      axios
        .post(baseurl + "SowingAndDibbling/SaveSowingDibblingActivity", data, {
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
    if (MaleAbove30 == "" || MaleAbove30 == null) {
      error = true;
      setErrorState({
        ...errorState,
        maleAbove30: "Please enter Male Above 30",
      });
    } else if (MaleBelow30 == "" || MaleBelow30 == null) {
      error = true;
      setErrorState({
        ...errorState,
        maleBelow30: "Please enter Male Below 30",
      });
    } else if (FemaleAbove30 == "" || FemaleAbove30 == null) {
      error = true;
      setErrorState({
        ...errorState,
        femaleAbove30: "Please enter FeMale Above 30",
      });
    } else if (FemaleBelow30 == "" || FemaleBelow30 == null) {
      error = true;
      setErrorState({
        ...errorState,
        femaleBelow30: "Please enter FeMale Below 30",
      });
    } else if (OtherAbove30 == "" || OtherAbove30 == null) {
      error = true;
      setErrorState({
        ...errorState,
        otherAboove30: "Please enter Other Above 30",
      });
    } else if (OtherBelow30 == "" || OtherBelow30 == null) {
      error = true;
      setErrorState({
        ...errorState,
        otherBelow30: "Please enter Other Below 30",
      });
    } else if (solutions == "" || solutions == null) {
      error = true;
      setErrorState({
        ...errorState,
        signifance: "Please enter Signiicance",
      });
    } else if (measures == "" || measures == null) {
      error = true;
      setErrorState({
        ...errorState,
        sustainibility: "Please enter sustainability",
      });
    }
    if (!error) {
      PostFunction();
    }
  };
  return (
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
      <View style={styles.container}>
        <Text style={styles.containerHeading}>Details of Daily Wagers</Text>
        <ScrollView>
          {/* Male above 30 */}
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
                setErrorState({
                  ...errorState,
                  maleAbove30: "",
                });
              }}
            />
            {errorState.maleAbove30 !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.maleAbove30}
              </Text>
            )}
          </View>
          {/* Male below 30 */}
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
                setErrorState({
                  ...errorState,
                  maleBelow30: "",
                });
              }}
            />
            {errorState.maleBelow30 !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.maleBelow30}
              </Text>
            )}
          </View>
          {/* Female above 30 */}
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
                setErrorState({
                  ...errorState,
                  femaleAbove30: "",
                });
              }}
            />
            {errorState.femaleAbove30 !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.femaleAbove30}
              </Text>
            )}
          </View>
          {/* Female below 30 */}
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
                setErrorState({
                  ...errorState,
                  femaleBelow30: "",
                });
              }}
            />
            {errorState.femaleBelow30 !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.femaleBelow30}
              </Text>
            )}
          </View>
          {/* Other above 30 */}
          <View>
            <Text style={styles.sectionText}>Other Above 30 *</Text>
            <TextInput
              style={styles.button}
              placeholder={"0"}
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={OtherAbove30}
              onChangeText={(OtherAbove30) => {
                setOtherAbove30(OtherAbove30);
                setErrorState({
                  ...errorState,
                  otherAboove30: "",
                });
              }}
            />
            {errorState.otherAboove30 !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.otherAboove30}
              </Text>
            )}
          </View>
          {/* Other below 30 */}
          <View>
            <Text style={styles.sectionText}>Other Below 30 *</Text>
            <TextInput
              style={styles.button}
              placeholder={"0"}
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={OtherBelow30}
              onChangeText={(OtherBelow30) => {
                setOtherBelow30(OtherBelow30);
                setErrorState({
                  ...errorState,
                  otherBelow30: "",
                });
              }}
            />
            {errorState.otherBelow30 !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.otherBelow30}
              </Text>
            )}
          </View>
          {/* Signigicance */}
          <View>
            <Text style={styles.sectionText}>Significance</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={[
                styles.button,
                { height: 100, justifyContent: "flex-start" },
              ]}
              placeholder={"Enter Significance"}
              placeholderTextColor="#777"
              value={solutions}
              onChangeText={(solutions) => {
                setSolutions(solutions);
                setErrorState({
                  ...errorState,
                  signifance: "",
                });
              }}
            />
            {errorState.signifance !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.signifance}
              </Text>
            )}
          </View>
          {/* long term sustainability */}
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
                setErrorState({
                  ...errorState,
                  sustainibility: "",
                });
              }}
            />
            {errorState.sustainibility !== "" && (
              <Text style={{ padding: 2, paddingHorizontal: 8, color: "red" }}>
                {errorState.sustainibility}
              </Text>
            )}
          </View>
          {/* Next Container */}
          <Button onPress={() => validateForm()} title="Submit" />
        </ScrollView>
      </View>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
    </View>
  );
};

export default SowingForm3;

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
  container: {
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  button: {
    height: 60,
    width: width * 0.9,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "#A8B4BC",
    borderWidth: 1,
    paddingHorizontal: 20,
    color: "black",
    fontFamily: "Montserrat-Regular",
  },
  buttonText: {
    color: "black",
    fontFamily: "Montserrat-Medium",
  },
  nextButton: {
    height: 60,
    borderRadius: 10,
    width: 150,
    backgroundColor: "#29AA74",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    fontFamily: "Montserrat-SemiBold",
    color: "white",
    fontSize: 16,
  },
});
