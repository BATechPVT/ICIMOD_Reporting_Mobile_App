import * as React from "react";
import { ThemeContext } from "../../../theme/theme-context";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Geolocation from "@react-native-community/geolocation";

export default function MapScreen(props: any) {
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const item = props.route.params.item;
  const lat = props.route.params.lat;
  const long = props.route.params.long;

  const [location, setLocation] = React.useState({
    // latitude: item?.lat,
    // longitude: item?.long,
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (location: any) => {
    setLocation(location);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <AntDesign
        name="arrowleft"
        color={theme.buttonTitle}
        size={30}
        style={{ padding: 10 }}
        onPress={() => props.navigation.goBack("")}
      />
      <MapView
        region={location}
        onRegionChange={onRegionChange}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 100,
          flex: 1,
        }}
      >
        <Marker
          key={0}
          coordinate={{
            // latitude: location.latitude,
            // longitude: location.longitude,
            latitude: lat,
            longitude: long,
          }}
          title={item?.siteName}
        />
      </MapView>
    </View>
  );
}
