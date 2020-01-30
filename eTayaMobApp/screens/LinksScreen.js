import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage,
  ScrollView,
  Text
} from "react-native";
import { Button, Layout, Card, CardHeader } from "@ui-kitten/components";
import Colors from "../constants/Colors";
import moment from "moment";
import * as Crypto from "expo-crypto";

export default class LinksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawDate: "",
      oldBets: [],
      numberPicks: []
    };
  }

  componentDidMount() {
    this.getData();
    var today = moment();
    var tomorrow = moment(today).add(3, "days");
    this.setState({
      drawDate: tomorrow
    });
  }

  getData = async () => {
    try {
      let bets = await AsyncStorage.getItem("bets");
      if (bets == null) {
      } else {
        this.setState({
          oldBets: JSON.parse(bets)
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  saveBet = async () => {
    let oldBets = [...this.state.oldBets];
    let picksAsc = this.state.numberPicks.sort(function(a, b) {
      return a - b;
    });
    let deviceId = await AsyncStorage.getItem("deviceId");
    let params =
      deviceId +
      moment(this.state.drawDate).format("YYYYMMDD") +
      picksAsc[0] +
      picksAsc[1] +
      picksAsc[2] +
      picksAsc[3] +
      picksAsc[4] +
      picksAsc[5];

    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      params
    );

    let bet = {
      drawDate: this.state.drawDate,
      betDate: Date.now(),
      picks: picksAsc,
      betRef: (
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2, 5)
      ).toUpperCase(),
      tx: digest
    };
    oldBets.push(bet);

    try {
      let save = await AsyncStorage.setItem("bets", JSON.stringify(oldBets));
      this.props.navigation.navigate("betsuccess", {
        picks: this.state.numberPicks
      });
    } catch (error) {
      console.error(error);
    }
  };

  pickNumber = async pick => {
    if (this.state.numberPicks.length < 6) {
      var array = [...this.state.numberPicks];
      array.push(pick);
      this.setState({ numberPicks: array });
    }
  };

  removePick = async pick => {
    var array = [...this.state.numberPicks];
    var index = array.indexOf(pick);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ numberPicks: array });
    }
  };

  isSelected = async number => {
    if (this.state.numberPicks.indexOf(number) < 0) {
      return false;
    } else {
      return true;
    }
  };

  renderButtons() {
    const views = [];
    for (let i = 1; i <= 42; i++) {
      let num = "";
      if (i < 10) {
        num = "0" + i;
      } else {
        num = i;
      }
      views.push(
        <Button
          key={i}
          onPress={() => this.pickNumber(num)}
          disabled={this.state.numberPicks.indexOf(num) < 0 ? false : true}
          style={styles.button}
          status="info"
          size="small"
        >
          {num.toLocaleString()}
        </Button>
      );
    }

    return views;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.textPicks} category="h4">
            New Bet
          </Text>
        </View>
        <View style={styles.pickContainer}>
          {this.state.numberPicks.map(value => {
            return (
              <TouchableNativeFeedback onPress={() => this.removePick(value)}>
                <View style={styles.pickBall}>
                  <Text style={styles.pickBallText}>
                    {value.toLocaleString()}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </View>

        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center"
          }}
          style={{ width: "100%" }}
        >
          <Layout level="2" style={styles.buttonsContainer}>
            {this.renderButtons()}
          </Layout>

          <Layout style={{ paddingVertical: 20 }}>
            <Text
              style={{ fontFamily: "AirbnbCereal-Black", color: Colors.info }}
            >
              {" "}
              Draw Date:{" "}
              {moment(this.state.drawDate).format("D MMMM YYYY, dddd")}
            </Text>
          </Layout>

          <Layout style={{ width: "85%", marginTop: 30 }}>
            <Button
              onPress={() => this.saveBet()}
              disabled={this.state.numberPicks.length == 6 ? false : true}
              style={{ borderRadius: 10 }}
              size="large"
              status="primary"
            >
              Place Bet
            </Button>
          </Layout>
        </ScrollView>
      </View>
    );
  }
}

LinksScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  pickBall: {
    margin: 1,
    width: 50,
    height: 50,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  pickContainer: {
    marginTop: 20,

    width: null,
    height: 50,
    marginBottom: 10,
    flexDirection: "row"
  },
  pickBallText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "AirbnbCereal-Black",
    color: Colors.tintColor
  },
  button: {
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    margin: 3.5,
    marginBottom: 5
  },
  textPicks: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "AirbnbCereal-Black",
    color: Colors.info
  },
  buttonsContainer: {
    paddingVertical: 0,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10
  }
});
