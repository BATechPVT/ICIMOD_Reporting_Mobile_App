import React, { useState } from "react";
import { Appearance } from "react-native";

const theme = {
  light: {
    primary: "rgba(49,88,185,185)",
    secondary: "red",
    buttonBackGround: "rgba(49,88,185,185)",
    secondaryButtonBackground: "rgba(243,185,0,248)",
    buttonTitle: "white",
    textColor: "black",
    textSecondary: "rgba(76,122,223,223)",
    disabled: "rgba(216,216,216,216)",
    cardBackGround: "rgba(255,255,255,255)",
    backGround: "rgba(258,258,258,258)",
    textInputbackGround: "rgba(248,248,248,248)",
    modalBackDrop: "rgba(158,160,162,162)",
    error: "red",
    cardIconColor: "rgba(132,132,132,132)",
    cardRowBackGround: "rgba(132,132,132,0.5)",
  },
  dark: {
    primary: "rgba(49,88,185,185)",
    secondary: "red",
    buttonBackGround: "rgba(49,88,185,185)",
    secondaryButtonBackground: "rgba(243,185,0,248)",
    buttonTitle: "white",
    textColor: "black",
    textSecondary: "rgba(76,122,223,223)",
    disabled: "rgba(216,216,216,216)",
    cardBackGround: "rgba(255,255,255,255)",
    backGround: "rgba(258,258,258,258)",
    textInputbackGround: "rgba(248,248,248,248)",
    modalBackDrop: "rgba(158,160,162,162)",
    error: "red",
    cardIconColor: "rgba(132,132,132,132)",
    cardRowBackGround: "rgba(132,132,132,0.5)",
  },
};

const getTheme = () => {
  return theme.light;
};

const initialState = {
  dark: false,
  theme: getTheme(),
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  Appearance.addChangeListener((c) => {});
  let isDark = false;
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme == "dark") {
    isDark = true;
  }
  const [dark, setDark] = useState(isDark);

  const toggle = () => {
    setDark(!dark);
  };
  isDark = false;
  //     if(dark){
  //         setTimeout(()=>{
  // StatusBar.setBarStyle('light-content')
  // if(Platform.OS=='android'){
  //     StatusBar.setBackgroundColor('black')
  // }
  //         },300)
  //     }else {
  //         setTimeout(()=>{
  //             StatusBar.setBarStyle('dark-content')
  //             if(Platform.OS=='android'){
  //                 StatusBar.setBackgroundColor('white')
  //             }
  //                     },300)

  //     }
  const theme = getTheme();
  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
export { ThemeProvider, ThemeContext };
