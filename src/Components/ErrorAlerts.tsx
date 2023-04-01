import React, { useContext } from "react";
import { Image, Modal, Text, View } from "react-native";
import { ThemeContext } from "../../theme/theme-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface SuccessAlertProps {
  text: string;
  show: boolean;
  description?: string;
}

export default function ErrorAlert(props: SuccessAlertProps) {
  const { dark, theme, toggle } = useContext(ThemeContext);

  return (
    <Modal animationType={"slide"} transparent={true} visible={props.show}>
      <View
        style={{
          backgroundColor: "#0000009A",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            padding: 32,
            borderRadius: 16,
          }}
        >
          <MaterialIcons
            name="error"
            size={40}
            color={theme.error}
            style={{ paddingLeft: 1 }}
          />
          <Text
            style={{
              textAlign: "center",
              color: theme.error,
              fontSize: 27,
              marginTop: 8,
            }}
          >
            {props.text != undefined ? props.text : "Error"}
          </Text>
          {props.description != undefined && <Text>{props.description}</Text>}
        </View>
      </View>
    </Modal>
  );
}
