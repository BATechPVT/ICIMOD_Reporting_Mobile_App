import React, { Ref, useContext, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import Feather from "react-native-vector-icons/Feather";
interface Iprops {
  title?: string;
  label?: string;
  value: string;
  onChangeText: Function;
  onSubmitEditing?: Function;
  errorText?: string;
  returnKeyType?: ReturnType;
  placeholder?: string;
  rightIcon?: any;
  onPressRightIcon?: Function;
  secureTextEntry?: boolean;
  style?: any;
  mandatory?: boolean;
  keyboardType?: string;
  editabble?: boolean;
  leftIcon?: any;
  onPressLeftIcon?: Function;
  inputref?: Ref<TextInput>;
}
export const CustomTextInput = (props: Iprops) => {
  const { dark, theme, toggle } = useContext(ThemeContext);
  return (
    <View
      style={[
        {
          marginVertical: 12,
          alignSelf: "center",
          width: "100%",
          justifyContent: "flex-start",
        },
      ]}
    >
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
          backgroundColor: theme.textInputbackGround,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          borderRadius: 5,
          paddingHorizontal: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.4,
          shadowRadius: 1,
          elevation: 5,
        }}
      >
        {props.leftIcon !== undefined && props.leftIcon}
        <TextInput
          ref={props.inputref}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            color:
              props.editabble || props.editabble == undefined
                ? theme.textColor
                : "grey",
          }}
          placeholder={props.placeholder}
          placeholderTextColor={"grey"}
          secureTextEntry={props.secureTextEntry}
          value={props.value}
          keyboardType={
            props.keyboardType !== undefined ? props.keyboardType : "default"
          }
          returnKeyType={
            props.returnKeyType !== undefined ? props.returnKeyType : "next"
          }
          onChangeText={(value) => props.onChangeText(value)}
          editable={props.editabble}
          onSubmitEditing={() => props?.onSubmitEditing()}
        />
        {props.rightIcon !== undefined && (
          <TouchableOpacity
            onPress={() => props.onPressRightIcon()}
            activeOpacity={0.8}
          >
            <Feather
              name={props.secureTextEntry ? "eye-off" : "eye"}
              color={"grey"}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.errorText !== undefined && props.errorText !== "" && (
        <Text style={{ color: "red", paddingTop: 10, paddingLeft: 10 }}>
          {props.errorText}
        </Text>
      )}
    </View>
  );
};
