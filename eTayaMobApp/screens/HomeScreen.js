import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import { Text } from "@ui-kitten/components";
import Constants from "expo-constants";
import { QRCode } from "react-native-custom-qr-codes-expo";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      deviceId: ""
    };
  }

  componentDidMount() {
    this.deviceIdSetup();
    console.log(this.state.deviceId);
  }

  deviceIdSetup = async () => {
    let deviceId = await AsyncStorage.getItem("deviceId");
    if (typeof deviceId == "undefined" || deviceId == null) {
      AsyncStorage.setItem("deviceId", Constants.installationId);
      this.setState({
        ready: true,
        deviceId: Constants.installationId
      });
    } else {
      this.setState({
        ready: true,
        deviceId: (await deviceId).toString()
      });
    }
  };

  render() {
    let deviceId = this.state.deviceId;

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
              borderWidth: this.state.ready ? 5 : 0,
              borderRadius: 10
            }}
          >
            {this.state.ready ? (
              <QRCode
                color="#683B89"
                innerEyeStyle="diamond"
                codeStyle="diamond"
                outerEyeStyle="diamond"
                content={this.state.deviceId}
              />
            ) : (
              <Text>Loading...</Text>
            )}
          </View>

          <View style={{ marginTop: 10, alignItems: "center" }}>
            <Text style={styles.text} category="label">
              Device Unique ID:
            </Text>
            <Text category="label">{this.state.deviceId}</Text>
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
