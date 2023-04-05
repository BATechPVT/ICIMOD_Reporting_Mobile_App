import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  ADD_REPORT_ICON, SAVE_REPORT_ICON, VIEW_REPORT_ICON
} from "../../../assets/Images";
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import { Button } from "../../Components/Button";
import { dataTypes } from "../../Config/Constants";
import { CautionModal } from "./CautionModal";
export default function AddReportScreen(props: any) {
  const [loading, setLoading] = React.useState(true);
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { reportType } = props.route.params;
  const { reportIcon } = props.route.params;

  const navigateOptions = () => {
    if (reportType == dataTypes.FOREST_SITE) {
      setIsModalVisible(true);
    } else if (reportType == dataTypes.PLANTATION) {
      props.navigation.navigate("PlantationForm", { reportType });
    } else if (reportType == dataTypes.SOWING) {
      props.navigation.navigate("SowingForm1", { reportType });
    } else if (reportType == dataTypes.ANR) {
      props.navigation.navigate("ANRForm", { reportType });
    } else if (reportType == dataTypes.DISTRIBUTION) {
      props.navigation.navigate("DistributionForm", { reportType });
    } else if (reportType == dataTypes.NURSERIES) {
      props.navigation.navigate("NurseryForm", { reportType });
    }
  };
  const reportNavigateOptions = () => {
    if (reportType == dataTypes.FOREST_SITE) {
      props.navigation.navigate("ForestReportDashBoard", { reportType });
    } else if (reportType == dataTypes.PLANTATION) {
      props.navigation.navigate("PlantationReportDashBoard", { reportType });
    } else if (reportType == dataTypes.ANR) {
      props.navigation.navigate("AnrReportDashBoard", { reportType });
    } else if (reportType == dataTypes.NURSERIES) {
      props.navigation.navigate("NurseryReportDashBoard", { reportType });
    } else if (reportType == dataTypes.SOWING) {
      props.navigation.navigate("SowingReportDashBoard", { reportType });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.backGround }}>
      <Ionicons
        name="arrow-back-sharp"
        size={35}
        color={theme.primary}
        style={{ paddingLeft: 15 }}
        onPress={() => props.navigation.goBack("")}
      />
      <Image
        source={reportIcon}
        style={{ width: wp(70), height: hp(20), alignSelf: "center" }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontWeight: "bold",
          color: theme.primary,
          fontSize: FontSizes.extraLarge,
          width: "70%",
          alignSelf: "center",
          textAlign: "center",
          paddingTop: 10,
        }}
      >
        {reportType}
      </Text>
      <CautionModal
        isVisible={isModalVisible}
        onPressContinue={() => {
          setIsModalVisible(false);
          props.navigation.navigate("CameraScreen", { reportType });
        }}
        onPressCancel={() => setIsModalVisible(false)}
      />
      <View
        style={{
          backgroundColor: theme.backGround,
          paddingHorizontal: wp(8),
          paddingVertical: 20,
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            
              <Button
                title={"Add " + reportType + (reportType == dataTypes.PLANTATION ? " Activity": " Site")}
                onPress={() => navigateOptions()}
                leftIcon={
                  <Image
                    source={ADD_REPORT_ICON}
                    resizeMode="contain"
                    style={{ height: 25 }}
                  />
                }
            />

            {reportType == dataTypes.NURSERIES && (
              <Button
                title={"Add " + "Nursery" + " Stock"}
                onPress={() =>
                  props.navigation.navigate("NurseryStockForm", { reportType })
                }
                leftIcon={
                  <Image
                    source={ADD_REPORT_ICON}
                    resizeMode="contain"
                    style={{ height: 25 }}
                  />
                }
              />
            )}
            {reportType !== dataTypes.DISTRIBUTION && (
                <Button
                  title={"View " + reportType + (reportType == dataTypes.PLANTATION ? " Activities": " Sites")}
                  onPress={() => reportNavigateOptions()}
                  leftIcon={
                    <Image
                      source={VIEW_REPORT_ICON}
                      resizeMode="contain"
                      style={{ height: 23 }}
                    />
                  }
                />
              )}
            <Button
              title={"Saved Samples On Device"}
              onPress={() => props.navigation.navigate("SightsList", {})}
              leftIcon={
                <Image
                  source={SAVE_REPORT_ICON}
                  resizeMode="contain"
                  style={{ height: 25 }}
                />
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
