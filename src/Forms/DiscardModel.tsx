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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import { Button } from "../Components/Button";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

interface Iprops {
  isVisible: boolean;
  onPressConfirm: Function;
  onCloseModal: Function;
}

export const StopModal = (props: Iprops) => {
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
        backdropOpacity={0.2}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        style={{
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: theme.cardBackGround,
            borderRadius: 12,
            paddingVertical: 15,
          }}
        >
          <TouchableOpacity onPress={() => props.onCloseModal()}>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Entypo name="cross" size={28} color={theme.primary} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              color: theme.primary,
              fontSize: FontSizes.extraLarge,
              fontWeight: "800",
              paddingVertical: 10,
            }}
          >
            Stop Site ?
          </Text>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 0.8,
              width: "70%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                fontSize: FontSizes.medium,
              }}
            >
              your progress will be Discard
            </Text>
          </View>

          <Button
            title="CONFIRM"
            onPress={() => props.onPressConfirm()}
            style={{
              width: wp(60),
              height: 45,
              marginVertical: 20,
            }}
          />
        </View>
      </Modal>
    </>
  );
};
