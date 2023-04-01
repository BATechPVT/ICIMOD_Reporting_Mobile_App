import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { FontSizes } from "../../../../theme/FontSizes";
import { ThemeContext } from "../../../../theme/theme-context";
import { statusCodes, dataTypes } from "../../../Config/Constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import { TouchableWithoutFeedback } from "react-native";
import {
  GET_ANR_SITES,
  GET_FOREST_SITES,
  GET_PLANTATION_SITES,
  GET_NURSRIES_SITES,
} from "../../../Config/URLs";
import {
  REPORT_NAME_ICON,
  REPORT_DIST_ICON,
  VIEW_REPORT_ICON,
} from "../../../../assets/Images";
import { get, post } from "../../../Config/api";
import moment from "moment";
import { Unit } from "../../../Config/helper";
const data = [
  {
    id: 0,
    siteName: "Name ",
    district: "District",
    occuranceStatus: "Occurance Status",
    approvalStatus: 0,
    reportName: "Name ",
    updatedAt: "2 days ago",
  },
];
export default function NurseryReportDashBoard(props: any) {
  const [activeSections, setActiveSections] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allReports, setAllReports] = React.useState(null);
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const { reportType } = props.route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const body = {
      ActivitiesStatus: 0,
      ActivitiesStatusConservator: 0,
      Year: "2022",
      Month: "december",
    };
    const apiResponse = await post(GET_NURSRIES_SITES, body);
    console.log(" status ", apiResponse.data);
    if (apiResponse.status === statusCodes.SUCCESS) {
      setAllReports(apiResponse.data.items);
      return;
    } else {
      setLoading(false);
    }
  };

  const _renderSectionTitle = (section: any, isActive: boolean) => {
    return null;
    return (
      <View style={{}}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _renderHeader = (
    section: any,
    index: number,
    isActive: boolean,
    sections: any
  ) => {
    return (
      <Animatable.View
        duration={300}
        transition="top"
        easing="ease-in-back"
        style={{ backgroundColor: "transparent" }}
      >
        <View
          style={{
            height: 90,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 10,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={REPORT_NAME_ICON}
                style={{ height: 20, width: 20 }}
              />
              <Text
                style={{
                  fontWeight: "500",
                  paddingLeft: 5,
                  color: theme.textColor,
                }}
              >
                {section?.nurseryName}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={REPORT_DIST_ICON}
                style={{ height: 20, width: 20 }}
              />
              <Text
                style={{
                  fontWeight: "500",
                  paddingLeft: 5,
                  color: theme.cardIconColor,
                }}
              >
                {section?.district?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "flex-end",
              }}
            >
              <AntDesign name="calendar" size={14} color={theme.textColor} />
              <Text
                style={{
                  fontWeight: "500",
                  paddingLeft: 5,
                  fontSize: FontSizes.extraSmall,
                  color: theme.textColor,
                }}
              >
                {moment.utc(section?.updatedAt).fromNow()}
              </Text>
            </View>
          </View>
          <AntDesign
            name={isActive ? "down" : "right"}
            size={20}
            color={theme.cardIconColor}
          />
        </View>
        {/* </TouchableOpacity> */}
      </Animatable.View>
    );
  };

  const _renderContent = (
    section: any,
    index: number,
    isActive: boolean,
    sections: any
  ) => {
    return (
      <Animatable.View
        duration={300}
        transition="top"
        easing="ease-in-back"
        style={{ backgroundColor: "transparent" }}
      >
        <View
          style={{
            alignSelf: "center",
            paddingHorizontal: 20,
            paddingBottom: 14,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: theme.cardRowBackGround,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Ionicons
                name="ios-locate-outline"
                color={theme.secondary}
                size={26}
              />
              <Text style={{ paddingLeft: 12, fontSize: FontSizes.extraSmall }}>
                Area
              </Text>
            </View>
            <Text style={{ flex: 1 }}>
              {": " + section.area + " " + Unit(section?.unit)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 2,
              marginVertical: 3,
              width: "100%",
            }}
          >
            <View
              style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
            >
              <Image
                source={VIEW_REPORT_ICON}
                resizeMode="contain"
                style={{ height: 20, width: 20, tintColor: theme.secondary }}
              />
              <Text style={{ paddingLeft: 12, fontSize: FontSizes.extraSmall }}>
                Status
              </Text>
            </View>
            <Text style={{ flex: 1 }}>
              {section.approvalStatus == 0
                ? ": Pending"
                : section.approvalStatus == 2
                ? ": Approved"
                : ": Synced"}
            </Text>
          </View>
          {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: theme.cardRowBackGround,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 2,
                  marginVertical: 3,
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
                >
                  <Image
                    source={REPORT_OCCURANCE_ICON}
                    resizeMode="contain"
                    style={{ height: 20, width: 20 }}
                  />
                  <Text style={{ paddingLeft: 12, fontSize: FontSizes.extraSmall }}>
                    Occurance Status
                  </Text>
                </View>
                <Text style={{ flex: 1 }}>{": " + section.occuranceStatus}</Text>
              </View> */}
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("NurseriesDetail", {
                item: section,
                reportType,
              })
            }
          >
            <View
              style={{
                alignSelf: "flex-end",
                backgroundColor: theme.primary,
                height: 50,
                width: 50,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="arrowright"
                size={24}
                color={theme.buttonTitle}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <Ionicons
        name="arrow-back-sharp"
        size={35}
        color={theme.buttonTitle}
        style={{ paddingLeft: 15, paddingTop: 15 }}
        onPress={() => props.navigation.goBack("")}
      />
      <Text
        style={{
          textAlign: "center",
          alignSelf: "center",
          fontSize: FontSizes.extraLarge,
          fontWeight: "bold",
          marginBottom: 30,
          marginTop: 10,
          color: theme.buttonTitle,
        }}
      >
        {reportType + "  Report"}
      </Text>
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
        <View
          style={{
            flex: 1,
          }}
        >
          {allReports !== null && (
            <Accordion
              sections={allReports}
              activeSections={activeSections}
              renderSectionTitle={_renderSectionTitle}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              containerStyle={{
                paddingVertical: 20,
                width: "100%",
                backgroundColor: theme.cardBackGround,
              }}
              renderAsFlatList
              touchableComponent={TouchableWithoutFeedback}
              sectionContainerStyle={{
                borderLeftWidth: 3,
                borderLeftColor: theme.primary,
                width: wp(80),
                backgroundColor: theme.cardBackGround,
                marginHorizontal: 2,
                marginVertical: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.4,
                shadowRadius: 1,
                elevation: 5,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
