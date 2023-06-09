import moment from "moment";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View
} from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  MAP_ICONN
} from "../../../../assets/Images";
import { FontSizes } from "../../../../theme/FontSizes";
import { ThemeContext } from "../../../../theme/theme-context";
import { Button } from "../../../Components/Button";
import { Unit } from "../../../Config/helper";
export default function ForestReportDetail(props: any) {
  const [loading, setLoading] = React.useState(true);
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const { reportType } = props.route.params;
  const { item } = props.route.params;
  const rowItems = [
    {
      title: "Site Name",
      value: item.siteName,
    },
    {
      title: "District",
      value: item.district,
    },
    {
      title: "Tehsil",
      value: item.tehsil,
    },
    {
      title: "Village or Neighborhood",
      value: item.villageNeighborhood,
    },
    {
      title: "Departure Time",
      value: moment.utc(item?.updatedAt).fromNow(),
    },
    {
      title: "Area",
      value: item.area + " " + Unit(item?.unit),
    },
    {
      title: "Common Name",
      value: item.siteName,
    },
  ];
  const getRowcolor = (index: number) => {
    if (index % 2 === 0) return theme.cardRowBackGround;
    // else return theme.cardBackGround;
    else return 'black';
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
        {"Detail"}
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              padding: 20,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: theme.cardBackGround,
            }}
          >
            {/* <Image
          source={{ uri: BASE_URL + "/" + item.imageUrl }}
          resizeMode="contain"
          style={{
            width: 130,
            height: 130,
            bottom: 80,
            borderRadius: 100,
            borderWidth: 4,
            borderColor: theme.buttonTitle,
          }}
        /> */}
            <View
              style={{
                flex: 1,
                width: wp(80),
                alignItems: "center",
              }}
            >
              <ScrollView>
                {rowItems.map((value: any, index: number) => {
                  return (
                    <View
                      key={index.toString()}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: getRowcolor(index),
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 2,
                        marginVertical: 3,
                        width: wp(80),
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "flex-start",
                          textAlign: "left",
                          width: "30%",
                          fontSize: FontSizes.small,
                        }}
                      >
                        {value.title}
                      </Text>
                      <Text
                        style={{
                          alignSelf: "flex-start",
                          textAlign: "center",
                          width: "30%",
                        }}
                      >
                        {":"}
                      </Text>

                      <Text
                        style={{
                          alignSelf: "flex-start",
                          width: "30%",
                          fontSize: FontSizes.small,
                        }}
                      >
                        {value.value}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          {item.point1LattitudeY !== null && item.point1LattitudeY !== "" && (
            <View
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                bottom: 60,
                right: 10,
              }}
            >
              <Button
                title="View on Map"
                onPress={() =>
                  props.navigation.navigate("MapScreen", {
                    item,
                    lat: item.point1LattitudeY,
                    long: item.point1LongitudeX,
                  })
                }
                style={{ height: 40, width: 200 }}
                rightIcon={
                  <Image
                    source={MAP_ICONN}
                    resizeMode="contain"
                    style={{ width: 30, height: 30 }}
                  />
                }
              />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
