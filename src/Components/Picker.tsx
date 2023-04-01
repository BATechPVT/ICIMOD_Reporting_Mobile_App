import React, { useContext } from "react";
import { Image, Modal, Text, View, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../theme/theme-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FontSizes } from "../../theme/FontSizes";
interface dropDownInterface {
  id: number;
  name: string;
}
interface PickerProps {
  data: dropDownInterface[];
  onSelectValue: Function;
  onPressSearch?: Function;
}

export default function PickerComponent(props: PickerProps) {
  const { dark, theme, toggle } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, marginVertical: 5, padding: 10 }}>
      <BottomSheetFlatList
        data={props.data}
        showsVerticalScrollIndicator={true}
        renderItem={({ item, index, separators }) => {
          return (
            <TouchableOpacity
              onPress={() => props.onSelectValue(item)}
              activeOpacity={0.5}
            >
              <View
                style={{
                  flex: 1,
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme.disabled,
                  paddingVertical: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizes.large,
                    fontWeight: "500",
                    alignSelf: "center",
                    textAlign: "center",
                    color: theme.textColor,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
