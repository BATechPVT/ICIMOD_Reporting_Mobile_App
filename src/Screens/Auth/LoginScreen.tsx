import React, {
  useRef,
  useState
} from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useUpdateEffect } from "react-use";
import { APP_LOGO } from "../../../assets/Images";
import { ThemeContext } from "../../../theme/theme-context";
import { Button } from "../../Components/Button";
import { CustomTextInput } from "../../Components/CustomTextInput";
import ErrorAlert from "../../Components/ErrorAlerts";
import { statusCodes, userData } from "../../Config/Constants";
import { LOGIN } from "../../Config/URLs";
import { post } from "../../Config/api";
import { getData, setData } from "../../Config/localStorage";

export default function LoginScreen(props: any) {
  const [email, setEmail] = React.useState("RO_Lahore@mocc.com");
  const [password, setPassword] = React.useState("123456@Aa");
  const { dark, theme, toggle } = React.useContext(ThemeContext);
  const [loading, setLoading] = React.useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  const isLogedIn = async () => {
    const user = await getData(userData);
    if (user !== undefined && user !== null) {
      props.navigation.replace("DashBoard");
      return true;
    } else return false;
  };

  React.useEffect(() => {
    isLogedIn();
  }, []);

  const Login = () => {
    setLoading(true);
    const body = {
      username: email,
      password: password,
    };
    new Promise((resolve, reject) => {
      post(LOGIN, body)
        .then((res) => {
          console.log(" success ", res);
          resolve(true);
          setLoading(false);
          console.log("ststues code  ", res.status);
          if (res.status == statusCodes.SUCCESS) {
            setData(userData, res.data);
            props.navigation.replace("DashBoard");
          } else {
            if (res.title == undefined) {
              setErrorMessage(res.toString());
            } else {
              setErrorMessage(res.title.toString());
            }
          }
        })
        .catch((err) => {
          reject(err);
          setErrorMessage(err.toString());
        })
        .finally(() => setLoading(false));
    });
  };

  useUpdateEffect(() => {
    if (errorMessage !== "") {
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
        setErrorMessage("");
      }, 3000);
    }
  }, [errorMessage && errorMessage !== ""]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.backGround }}>
        <Image
          source={APP_LOGO}
          style={{ width: wp(80), height: hp(25), alignSelf: "center" }}
          resizeMode="contain"
        />

        <KeyboardAwareScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={[
              {
                paddingHorizontal: wp(8),
                paddingVertical: 20,
                borderTopLeftRadius: 45,
                borderTopRightRadius: 45,
                flex: 1,
              },
            ]}
          >
            <CustomTextInput
              inputref={userNameRef}
              value={email}
              placeholder={"User Name"}
              onChangeText={(value: string) => setEmail(value)}
              onSubmitEditing={() => passwordRef.current?.focus()}
              leftIcon={
                <FontAwesome5
                  name="user-alt"
                  size={18}
                  color={theme.secondary}
                  style={{ paddingRight: 7 }}
                />
              }
            />
            <CustomTextInput
              inputref={passwordRef}
              value={password}
              placeholder={"Password"}
              onChangeText={(value: string) => setPassword(value)}
              rightIcon={true}
              secureTextEntry={secureTextEntry}
              onPressRightIcon={() => setSecureTextEntry(!secureTextEntry)}
              onSubmitEditing={() => Keyboard.dismiss()}
              returnKeyType={"done"}
              leftIcon={
                <FontAwesome5
                  name="lock"
                  size={18}
                  color={theme.secondary}
                  style={{ paddingRight: 7 }}
                />
              }
            />
            <Button title="LOGIN" onPress={() => Login()} />
            {/* <TouchableOpacity
              onPress={() => props.navigation.navigate("RegisterScreen")}
            >
              <View style={{ paddingVertical: 15, alignSelf: "center" }}>
                <Text>
                  <Text style={{ color: theme.textColor }}>
                    {" "}
                    Don't have an account?{" "}
                  </Text>
                  <Text
                    style={{
                      color: theme.textSecondary,
                      textDecorationLine: "underline",
                    }}
                  >
                    Register Now
                  </Text>
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: theme.primary }}
      />
      {errorAlert && (
        <ErrorAlert
          text="Error!"
          description={errorMessage}
          show={errorAlert}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: "gray",
  },
});
