import React, { useContext, useEffect } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import AntDesign from "react-native-vector-icons/AntDesign";
interface Iprops {
  title?: string;
  label?: string;
  value: string;
  errorMessage?: string;
  rightIcon?: any;
  onPressRightIcon?: Function;
  style?: any;
  onPress: Function;
  mandatory?: boolean;
}
export const InteractiveCell = (props: Iprops) => {
  const { dark, theme, toggle } = useContext(ThemeContext);
  return (
    <View
      style={[
        {
          marginTop: 12,
          alignSelf: "center",
          width: "100%",
        },
        props.style,
      ]}
    >
      <TouchableWithoutFeedback onPress={() => props.onPress()}>
        <View>
          {props.title !== undefined && (
            <Text
              style={{
                fontSize: FontSizes.small,
                padding: 5,
                paddingVertical: 5,
                color: theme.textColor,
                fontWeight: "500",
              }}
            >
              {props.mandatory ? props.title + "*" : props.title}
            </Text>
          )}
          <View
            style={{
              height: 58,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderWidth: 1,
              borderRadius: 4,
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                width: "80%",
                color:
                  props.value == "" || props.value == undefined
                    ? theme.cardIconColor
                    : theme.textColor,
              }}
            >
              {props.value == "" || props.value == undefined
                ? "Select "
                : props.value}
            </Text>
            {props.rightIcon ? (
              props.rightIcon
            ) : (
              <AntDesign name="caretdown" size={14} color={theme.textColor} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {props.errorMessage !== undefined && props.errorMessage !== "" && (
        <Text style={{ color: "red", padding: 10 }}>{props.errorMessage}</Text>
      )}
    </View>
  );
};
