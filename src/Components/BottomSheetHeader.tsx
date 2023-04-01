import React, {useState, useEffect, useRef, useMemo, useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontSizes} from '../../theme/FontSizes';
import {ThemeContext} from '../../theme/theme-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Iprops {
  title: string;
  style?: any;
  titleStyle?: any;
  rightIcon?: any;
  leftIcon?: any;
}
export const SheetHeader = (props: Iprops) => {
  const {dark, theme, toggle} = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: theme.disabled,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: FontSizes.large,
          color: theme.textColor,
        }}>
        {props.title}
      </Text>
      <AntDesign name="caretdown" size={14} color={theme.textColor} />
    </View>
  );
};
