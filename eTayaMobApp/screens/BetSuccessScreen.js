import React, { Component } from "react";
import { View, StyleSheet, Image, Text as NormalText } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AuthSession } from "expo";
class BetSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picks: this.props.navigation.getParam("picks", [])
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/image-app-icon.png")}
        />

        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {this.state.picks.map(value => {
              return (
                <View style={styles.pickBall}>
                  <NormalText style={styles.pickBallText}>
                    {" "}
                    {value < 10
                      ? "0" + value.toLocaleString()
                      : value.toLocaleString()}{" "}
                  </NormalText>
                </View>
              );
            })}
          </View>

          <Text
            style={{
              marginTop: 20,
              fontSize: 15,
              color: Colors.info,
              fontFamily: "AirbnbCereal-Book"
            }}
          >
            {" "}
            Great! Your bet has been placed.{" "}
          </Text>
        </View>

        <View style={{ width: "85%", position: "absolute", bottom: 30 }}>
          <Button
            onPress={() => this.props.navigation.navigate("history")}
            style={{ borderRadius: 10 }}
            size="large"
            status="primary"
          >
            Done
          </Button>
        </View>
      </View>
    );
  }
}

BetSuccessScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#fff"
  },
  pickBall: {
    margin: 3,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: Colors.tintColor
  },
  pickBallText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "AirbnbCereal-Black",
    color: Colors.tintColor
  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height: 250
  }
});
export default BetSuccessScreen;
