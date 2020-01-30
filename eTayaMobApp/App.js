import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/AppNavigator";
import { ApplicationProvider } from "@ui-kitten/components";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";
import { default as appTheme } from "./constants/theme.json";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const theme = { ...lightTheme, ...appTheme };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <ApplicationProvider mapping={mapping} theme={theme}>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </ApplicationProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/robot-dev.png"),
      require("./assets/images/robot-prod.png")
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      "AirbnbCereal-Black": require("./assets/fonts/AirbnbCereal-Black.ttf"),
      "AirbnbCereal-Bold": require("./assets/fonts/AirbnbCereal-Bold.ttf"),
      "AirbnbCereal-Book": require("./assets/fonts/AirbnbCereal-Book.ttf"),
      "AirbnbCereal-ExtraBold": require("./assets/fonts/AirbnbCereal-ExtraBold.ttf"),
      "AirbnbCereal-Light": require("./assets/fonts/AirbnbCereal-Light.ttf"),
      "AirbnbCereal-Medium": require("./assets/fonts/AirbnbCereal-Medium.ttf"),
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
