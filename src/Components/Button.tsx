import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";

interface Iprops {
  onPress: Function;
  title: string;
  disabled?: boolean;
  style?: any;
  titleStyle?: any;
  rightIcon?: any;
  leftIcon?: any;
}
export const Button = (props: Iprops) => {
  const { dark, theme, toggle } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      disabled={props.disabled}
      activeOpacity={0.9}
    >
      <View
        style={[
          {
            backgroundColor: theme.buttonBackGround,
            width: "100%",
            height: 50,
            borderRadius: 7,
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 15,
            alignSelf: "center",
            flexDirection: "row",
            paddingHorizontal: 15,
          },
          props.style,
        ]}
      >
        <View style={{ flex: 1 }}>{props.leftIcon && props.leftIcon}</View>

        <Text
          style={[
            {
              color: theme.buttonTitle,
              fontSize: FontSizes.large,
              textAlign: "left",
            },
            props.titleStyle,
          ]}
        >
          {props.title}
        </Text>
        <View style={{ flex: 1 }}>{props.rightIcon && props.rightIcon}</View>
      </View>
    </TouchableOpacity>
  );
};
