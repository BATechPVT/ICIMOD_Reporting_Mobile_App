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
} from "react-native";
import { FontSizes } from "../../../theme/FontSizes";
import { ThemeContext } from "../../../theme/theme-context";
import { statusCodes } from "../../Config/Constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Button } from "../../Components/Button";
import { CustomTextInput } from "../../Components/CustomTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { PhoneTextInput } from "../../Components/PhoneNumberInput";
export default function RegisterScreen(props: any) {
  const [loading, setLoading] = React.useState(true);
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [cnic, setCnic] = useState("");
  const [password, setPasswoord] = useState("");
  const [confirmPassword, setConfirmPasswoord] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState<number>(null);
  const phoneInputRef = useRef(null);
  return (
    <View style={{ flex: 1, backgroundColor: theme.backGround }}>
      <Text
        style={{
          fontSize: FontSizes.xxLarge,
          fontWeight: "bold",
          position: "absolute",
          left: wp(5),
          top: hp(15),
        }}
      >
        Register
      </Text>
      <Text
        style={{
          fontSize: FontSizes.large,
          fontWeight: "bold",
          position: "absolute",
          left: wp(5),
          top: hp(20),
          color: theme.textSecondary,
        }}
      >
        Create your account
      </Text>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ paddingHorizontal: wp(8), paddingVertical: 20 }}>
          <CustomTextInput
            value={fullName}
            placeholder={"Full Name"}
            onChangeText={(value: string) => setFullName(value)}
          />
          <CustomTextInput
            value={cnic}
            placeholder={"CNIC No"}
            onChangeText={(value: string) => setCnic(value)}
          />
          <PhoneTextInput
            value={phone?.toString()}
            onChangeText={(value: number) => setPhone(value)}
            phoneInputRef={phoneInputRef}
          />
          <CustomTextInput
            value={password}
            placeholder={"Password"}
            onChangeText={(value: string) => setPasswoord(value)}
          />
          <CustomTextInput
            value={confirmPassword}
            placeholder={"Confirm Password"}
            onChangeText={(value: string) => setConfirmPasswoord(value)}
          />
          <Button
            title="SIGN UP"
            onPress={() => props.navigation.navigate("DashBoard")}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LoginScreen")}
          >
            <View style={{ paddingVertical: 15, alignSelf: "center" }}>
              <Text>
                <Text style={{ color: theme.textColor }}>
                  {" "}
                  Do you have an account?{" "}
                </Text>
                <Text
                  style={{
                    color: theme.textSecondary,
                    textDecorationLine: "underline",
                  }}
                >
                  Login Now
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
