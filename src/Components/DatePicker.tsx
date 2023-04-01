import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";

interface Iprops {
  date: Date;
  onConfirm: Function;
  onCancel: Function;
  open: boolean;
}
export const DateModal = (props: Iprops) => {
  const { dark, theme, toggle } = useContext(ThemeContext);
  return (
    <DatePicker
      modal
      open={props.open}
      date={props.date}
      androidVariant="iosClone"
      mode="datetime"
      onConfirm={(date) => {
        props.onConfirm(date);
      }}
      onCancel={() => {
        props.onCancel(false);
      }}
    />
  );
};
