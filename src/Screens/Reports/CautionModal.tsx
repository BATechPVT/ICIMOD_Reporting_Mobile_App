import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Button } from "../../Components/Button";
import { CAUTION_ICON } from "../../../assets/Images";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

interface Iprops {
  isVisible: boolean;
  onPressContinue: Function;
  onPressCancel: Function;
}

export const CautionModal = (props: Iprops) => {
  const { dark, theme, toggle } = useContext(ThemeContext);
  const [location, setLocation] = useState("");
  return (
    <>
      <Modal
        isVisible={props.isVisible}
        //coverScreen={true}
        hasBackdrop={true}
        backdropColor={theme.modalBackDrop}
        animationIn="slideInUp"
        // animationOut="slideInDown"
        backdropOpacity={0.8}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        style={{
          justifyContent: "flex-start",
          marginTop: heightPercentageToDP(10),
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 20 }}
        >
          <Image
            source={CAUTION_ICON}
            resizeMode="contain"
            style={{ height: 35, alignSelf: "center", marginTop: 10 }}
          />
          <Text
            style={{
              fontWeight: "400",
              alignSelf: "center",
              marginTop: 5,
              fontSize: FontSizes.medium,
              color: theme.textColor,
            }}
          >
            {"Caution"}
          </Text>
          <Text
            style={{
              fontWeight: "600",
              alignSelf: "center",
              marginTop: 15,
              fontSize: FontSizes.medium,
              color: theme.textColor,
            }}
          >
            {"Please take a picture to continue."}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              alignSelf: "center",
              marginTop: 10,
              fontSize: FontSizes.medium,
              textAlign: "center",
              color: theme.textColor,
            }}
          >
            {"Your presence on site is mandatory to  Proceed further."}
          </Text>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              title="Cancel"
              onPress={() => props.onPressCancel()}
              style={{ width: 130, backgroundColor: theme.error }}
            />
            <Button
              title="Continue"
              onPress={() => props.onPressContinue()}
              style={{ width: 130 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
