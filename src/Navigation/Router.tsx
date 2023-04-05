// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { userData } from "../Config/Constants";
import { getData } from "../Config/localStorage";
import ANRForm from "../Forms/ANR";
import DistributionForm from "../Forms/Distribution";
import ForestForm from "../Forms/Forest";
import NurseryForm from "../Forms/Nursery";
import NurseryStockForm from "../Forms/NurseryStock";
import PlantationForm from "../Forms/Plantation";
import SowingForm1 from "../Forms/Sowing/Form1";
import SowingForm2 from "../Forms/Sowing/Form2";
import SowingForm3 from "../Forms/Sowing/Form3";
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegisterScreen from "../Screens/Auth/RegisterScreen";
import { CameraPage } from "../Screens/Camera/Camera";
import HomeScreen from "../Screens/DashBoard/Home";
import AnrReportDashBoard from "../Screens/Reports/ANR/Index";
import AnrReportDetail from "../Screens/Reports/ANR/ReportDetail";
import AddReportScreen from "../Screens/Reports/AddReports";
import ForestReportDashBoard from "../Screens/Reports/Forest/Index";
import ForestReportDetail from "../Screens/Reports/Forest/ReportDetail";
import MapScreen from "../Screens/Reports/MapView";
import NurseryReportDashBoard from "../Screens/Reports/Nurseries/Index";
import NurseriesDetail from "../Screens/Reports/Nurseries/ReportDetail";
import PlantationReportDashBoard from "../Screens/Reports/Plantation/Index";
import PlantationDetail from "../Screens/Reports/Plantation/ReportDetail";
import SowingReportDashBoard from "../Screens/Reports/Sowing/Index";
import SowingDetail from "../Screens/Reports/Sowing/SowingDetail";

const Stack = createNativeStackNavigator();

function Router() {
  const isLogedIn = async () => {
    const user = await getData(userData);
    if (user !== undefined && user !== null) {
      return true;
    } else return false;
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
        initialRouteName="LoginScreen"
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="DashBoard" component={HomeScreen} />
        <Stack.Screen name="AddReportScreen" component={AddReportScreen} />
        <Stack.Screen
          name="ForestReportDashBoard"
          component={ForestReportDashBoard}
        />
        <Stack.Screen
          name="ForestReportDetail"
          component={ForestReportDetail}
        />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="CameraScreen" component={CameraPage} />
        <Stack.Screen name="ForestForm" component={ForestForm} />
        <Stack.Screen name="PlantationForm" component={PlantationForm} />
        <Stack.Screen name="SowingForm1" component={SowingForm1} />
        <Stack.Screen name="SowingForm2" component={SowingForm2} />
        <Stack.Screen name="SowingForm3" component={SowingForm3} />
        <Stack.Screen name="ANRForm" component={ANRForm} />
        <Stack.Screen name="DistributionForm" component={DistributionForm} />
        <Stack.Screen name="NurseryForm" component={NurseryForm} />
        <Stack.Screen name="NurseryStockForm" component={NurseryStockForm} />

        <Stack.Screen
          name="PlantationReportDashBoard"
          component={PlantationReportDashBoard}
        />
        <Stack.Screen
          name="SowingReportDashBoard"
          component={SowingReportDashBoard}
        />
        <Stack.Screen name="PlantationDetail" component={PlantationDetail} />
        <Stack.Screen name="SowingDetail" component={SowingDetail} />
        <Stack.Screen
          name="AnrReportDashBoard"
          component={AnrReportDashBoard}
        />
        <Stack.Screen name="AnrReportDetail" component={AnrReportDetail} />
        <Stack.Screen
          name="NurseryReportDashBoard"
          component={NurseryReportDashBoard}
        />
        <Stack.Screen name="NurseriesDetail" component={NurseriesDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
