import React, {
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Router from "./src/Navigation/Router";
import { WithSplashScreen } from "./src/Navigation/SplashScreen";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  const store = useRef(undefined);
  const queryClient = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
          <Router />
        </SafeAreaView>
      </GestureHandlerRootView>
    </WithSplashScreen>
  );
};

export default App;
