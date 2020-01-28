import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  AsyncStorage
} from "react-native";
import { Button, Text, Layout, Card, CardHeader } from "@ui-kitten/components";
import Colors from "../constants/Colors";
import moment from "moment";
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
    let bet = {
      drawDate: this.state.drawDate,
      betDate: Date.now(),
      picks: this.state.numberPicks,
      betRef: (
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2, 5)
      ).toUpperCase()
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
      views.push(
        <Button
          key={i}
          onPress={() => this.pickNumber(i)}
          disabled={this.state.numberPicks.indexOf(i) < 0 ? false : true}
          style={styles.button}
          status="info"
          size="small"
        >
          {i < 10 ? "0" + i.toLocaleString() : i.toLocaleString()}
        </Button>
      );
    }

    return views;
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Layout
          style={{
            borderRadius: 10,
            marginBottom: 10,
            marginTop: -50,
            width: "85%"
          }}
        >
          <Text style={styles.textPicks} category="h4">
            New Bet
          </Text>
          <View style={styles.pickContainer}>
            {this.state.numberPicks.map(value => {
              return (
                <TouchableNativeFeedback onPress={() => this.removePick(value)}>
                  <View style={styles.pickBall}>
                    <Text style={styles.pickBallText}>
                      {" "}
                      {value < 10
                        ? "0" + value.toLocaleString()
                        : value.toLocaleString()}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </View>
        </Layout>

        <Layout level="2" style={styles.buttonsContainer}>
          {this.renderButtons()}
        </Layout>

        <Layout style={{ paddingVertical: 20 }}>
          <Text
            style={{ fontFamily: "AirbnbCereal-Black", color: Colors.info }}
          >
            {" "}
            Draw Date: {moment(this.state.drawDate).format("D MMMM YYYY, dddd")}
          </Text>
        </Layout>

        <Layout style={{ width: "85%", position: "absolute", bottom: 30 }}>
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
      </Layout>
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
    height: 80,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  pickContainer: {
    marginTop: 10,
    marginLeft: 10,
    height: 80,
    flexDirection: "row"
  },
  pickBallText: {
    textAlign: "center",
    fontSize: 20,
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
    fontFamily: "AirbnbCereal-Black",
    color: Colors.info
  },
  buttonsContainer: {
    paddingVertical: 10,
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 10
  }
});
