import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Text } from "@ui-kitten/components";
import Constants from "expo-constants";
import { QRCode } from "react-native-custom-qr-codes-expo";
export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/image-app-icon.png")}
          />
          <View
            style={{
              marginTop: -30,
              borderColor: "#683B89",
              borderWidth: 5,
              borderRadius: 10
            }}
          >
            <QRCode
              color="#683B89"
              innerEyeStyle="diamond"
              codeStyle="diamond"
              outerEyeStyle="diamond"
              content={"SASA"}
            />
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={styles.text} category="label">
              Device Unique ID:
            </Text>
            <Text category="label">{Constants.installationId}</Text>
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height: 250
  },
  getStartedContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50
  }
});
