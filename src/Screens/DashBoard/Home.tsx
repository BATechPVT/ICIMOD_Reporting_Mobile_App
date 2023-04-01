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
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import { statusCodes, dataTypes } from "../../Config/Constants";
import {
  ANR_LOGO,
  APP_LOGO,
  DISTRIBUTION_LOGO,
  NURSERIES_LOGO,
  PLANTATION_LOGO,
  SOWING_LOGO,
  FOREST_LOGO,
} from "../../../assets/Images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const Data = [
  {
    id: 0,
    title: "Forest Sites",
    icon: FOREST_LOGO,
    key: dataTypes.FOREST_SITE,
  },
  {
    id: 1,
    title: "Plantation",
    icon: PLANTATION_LOGO,
    key: dataTypes.PLANTATION,
  },
  {
    id: 2,
    title: "Sowinng &  Dibbling",
    icon: SOWING_LOGO,
    key: dataTypes.SOWING,
  },
  {
    id: 3,
    title: "ANR",
    icon: ANR_LOGO,
    key: dataTypes.ANR,
  },
  {
    id: 4,
    title: "Distribution",
    icon: DISTRIBUTION_LOGO,
    key: dataTypes.DISTRIBUTION,
  },
  {
    id: 5,
    title: "Nurseries",
    icon: NURSERIES_LOGO,
    key: dataTypes.NURSERIES,
  },
];
export default function HomeScreen(props: any) {
  const [loading, setLoading] = React.useState(true);
  const { dark, theme, toggle } = React.useContext(ThemeContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <Text
        style={{
          textAlign: "center",
          alignSelf: "center",
          fontSize: FontSizes.extraLarge,
          fontWeight: "bold",
          marginVertical: 40,
          color: theme.buttonTitle,
        }}
      >
        FOREST DASHBOARD
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
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            flex: 1,
          }}
        >
          {Data !== null &&
            Data.length > 0 &&
            Data.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("AddReportScreen", {
                      reportType: item.key,
                      reportIcon: item.icon,
                    })
                  }
                  key={index.toString()}
                  activeOpacity={0.9}
                >
                  <View
                    style={{
                      height: 170,
                      width: wp(38),
                      backgroundColor: theme.cardBackGround,
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                      marginHorizontal: 5,
                      borderRadius: 30,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 0.9 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 7,
                    }}
                  >
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={{ height: 70, width: 70 }}
                    />
                    <Text
                      style={{
                        fontWeight: "500",
                        color: theme.primary,
                        fontSize: FontSizes.medium,
                        width: "70%",
                        alignSelf: "center",
                        textAlign: "center",
                        paddingTop: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}
