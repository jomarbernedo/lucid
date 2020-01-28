import React from "react";
import { Platform, Button } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Colors from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BetSuccessScreen from "../screens/BetSuccessScreen";
import NotificationScreen from "../screens/NotificationScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const UserTab = createStackNavigator(
  {
    user: HomeScreen
  },
  config
);

const navgationStyle = {};

UserTab.navigationOptions = {
  tabBarLabel: "Profile",
  headerTransparent: true,
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    style: {
      height: 50,
      fontFamily:
        Platform.OS === "ios" ? "AirbnbCereal-Black" : "AirbnbCereal-Black",
      fontSize: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 0.1,
      borderWidth: 0.1,
      marginHorizontal: 0,
      borderColor: "rgba(0,0,0,.1)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 17
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"ios-person"} />
  )
};

UserTab.path = "";

const BetTab = createStackNavigator(
  {
    bet: LinksScreen
  },
  { header: null, headerMode: "none" }
);

BetTab.navigationOptions = {
  tabBarLabel: "Bet",
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    style: {
      fontFamily:
        Platform.OS === "ios" ? "AirbnbCereal-Black" : "AirbnbCereal-Black",
      height: 50,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 0.1,
      borderRadius: 0,
      borderWidth: 0.1,
      marginHorizontal: 0,
      borderColor: "rgba(0,0,0,.1)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.8,
      shadowRadius: 13,
      elevation: 5
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-keypad"} />
  )
};

BetTab.path = "";

const HistoryTab = createStackNavigator(
  {
    history: SettingsScreen
  },
  { header: null, headerMode: "none" }
);

HistoryTab.navigationOptions = {
  tabBarLabel: "History",
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    style: {
      height: 50,
      fontFamily:
        Platform.OS === "ios" ? "AirbnbCereal-Black" : "AirbnbCereal-Black",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 0.1,
      borderRadius: 0,
      borderWidth: 0,
      marginHorizontal: 0,
      borderColor: "rgba(0,0,0,.1)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.8,
      shadowRadius: 13,
      elevation: 5
    }
  },
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"md-list"} />
};

HistoryTab.path = "";

const NotifTab = createStackNavigator(
  {
    notifications: NotificationScreen
  },
  config
);

NotifTab.navigationOptions = {
  tabBarLabel: "Notifications",
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
    style: {
      height: 50,
      fontFamily:
        Platform.OS === "ios" ? "AirbnbCereal-Black" : "AirbnbCereal-Black",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 0.1,
      borderRadius: 0,
      borderWidth: 0,
      marginHorizontal: 0,
      borderColor: "rgba(0,0,0,.1)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.8,
      shadowRadius: 13,
      elevation: 5
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-notifications"} />
  )
};

NotifTab.path = "";

const BottomNavigatorConfig = {
  resetOnBlur: true,
  defaultNavigationOptions: {
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      navigation.navigate(navigation.state.routeName);
      defaultHandler();
    }
  }
};

const BottomNavigatorRoutes = {
  UserTab,
  BetTab,
  HistoryTab,
  NotifTab
};

const tabNavigator = createBottomTabNavigator(
  BottomNavigatorRoutes,
  BottomNavigatorConfig
);

tabNavigator.path = "";

const noTabStack = createStackNavigator(
  {
    betsuccess: BetSuccessScreen
  },
  {
    initialRouteName: "betsuccess",
    header: null,
    headerMode: "none"
  }
);

export default createSwitchNavigator(
  {
    app: tabNavigator,
    nobot: noTabStack
  },
  {
    initialRouteName: "app"
  }
);
