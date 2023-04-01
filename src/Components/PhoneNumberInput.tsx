import React, { useContext, useEffect, useRef } from "react";
import { Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontSizes } from "../../theme/FontSizes";
import { ThemeContext } from "../../theme/theme-context";
import { CountryCodeLogo, Logo } from "../../assets/Images";
import Entypo from "react-native-vector-icons/Entypo";
import PhoneInput from "react-native-phone-number-input";
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
  leftIcon?: any;
  onPressLeftIcon?: Function;
  keyboardType?: any;
  phoneInputRef: any;
}
export const PhoneTextInput = (props: Iprops) => {
  const { dark, theme, toggle } = useContext(ThemeContext);

  return (
    <View
      style={[
        { marginVertical: 12, alignSelf: "center", width: "100%" },
        props.style,
      ]}
    >
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
            backgroundColor: theme.textInputbackGround,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderRadius: 8,
            paddingHorizontal: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 5,
          }}
        >
          <PhoneInput
            ref={props.phoneInputRef}
            defaultValue={props.value}
            value={props.value}
            containerStyle={{
              flex: 1,
              backgroundColor: "transparent",
              padding: 0,
            }}
            textContainerStyle={{ padding: 0 }}
            textInputProps={{ style: { padding: 0, flex: 1 } }}
            disableArrowIcon={true}
            defaultCode="PK"
            layout="second"
            onChangeText={(text) => {
              props.onChangeText(text);
              // console.log(text);
            }}
            onChangeFormattedText={(text) => {
              props.onChangeText(text);
            }}
            // withDarkTheme
            // withShadow
            // autoFocus

            codeTextStyle={{ alignSelf: "center", paddingTop: 15 }}
            flagButtonStyle={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            countryPickerButtonStyle={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
      {props.errorText !== undefined && props.errorText !== "" && (
        <Text style={{ color: "red", padding: 10 }}>{props.errorText}</Text>
      )}
    </View>
  );
};
