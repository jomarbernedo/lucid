import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  FlatList,
  AsyncStorage
} from "react-native";
import { Button, Text, Layout, Card, CardHeader } from "@ui-kitten/components";
import Colors from "../constants/Colors";
import moment from "moment";
import { NavigationEvents } from "react-navigation";
export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    //this.getData();
  }

  getData = async () => {
    try {
      let bets = await AsyncStorage.getItem("bets");
      if (bets === null) {
      } else {
        this.setState({
          data: JSON.parse(bets).reverse()
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  Header = (ref, drawDate, betDate) => {
    const title = "Bet Ref: " + ref;
    const betDatetxt = moment(betDate).format("D MMMM YYYY, dddd");
    const drawDatetxt = moment(drawDate).format("D MMMM YYYY, dddd");
    return (
      <CardHeader>
        <View>
          <Text
            category="s1"
            style={{ fontFamily: "AirbnbCereal-Book", color: Colors.info }}
          >
            Bet Reference #:
            <Text
              style={{ fontFamily: "AirbnbCereal-Black", color: Colors.info }}
            >
              {" "}
              {ref}
            </Text>
          </Text>
          <Text
            category="label"
            style={{ fontFamily: "AirbnbCereal-Book", color: Colors.info }}
          >
            Bet Date: {betDatetxt}
          </Text>
          <Text
            category="label"
            style={{ fontFamily: "AirbnbCereal-Book", color: Colors.danger }}
          >
            Draw Date: {drawDatetxt}
          </Text>
        </View>
      </CardHeader>
    );
  };

  Footer = () => (
    <View style={styles.footerContainer}>
      <Text
        style={{
          fontFamily: "AirbnbCereal-Book",
          opacity: 0.5,
          color: Colors.info,
          fontSize: 10,
          textAlign: "left"
        }}
        category="c2"
      >
        Tx: 0xf348c4cf71d118ce5d53121cc920ed7e7f2
      </Text>
    </View>
  );

  render() {
    return (
      <Layout style={styles.container}>
        <NavigationEvents onWillFocus={() => this.getData()} />
        <Layout>
          <Text
            style={{
              marginTop: 40,
              margin: 30,
              color: Colors.info,
              fontFamily: "AirbnbCereal-Bold"
            }}
            category="h4"
          >
            Bet History
          </Text>
        </Layout>
        <Layout
          style={{ paddingTop: 0, paddingBottom: 120, width: "90%" }}
          level="1"
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            renderItem={({ item }) => (
              <Card
                style={{
                  margin: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3
                }}
                status="info"
                header={() =>
                  this.Header(item.betRef, item.drawDate, item.betDate)
                }
                footer={this.Footer}
              >
                <View
                  style={{
                    marginLeft: 8,
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  {item.picks.map(value => {
                    return (
                      <View style={styles.pickBall}>
                        <Text style={styles.pickBallText}>
                          {" "}
                          {value < 10
                            ? "0" + value.toLocaleString()
                            : value.toLocaleString()}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Card>
            )}
            keyExtractor={item => item.betRef}
          />
        </Layout>
      </Layout>
    );
  }
}

SettingsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center"
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  footerControl: {
    marginHorizontal: 4
  },
  pickBall: {
    margin: 3,
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: Colors.tintColor,
    borderRadius: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  pickBallText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "AirbnbCereal-Black",
    color: "#fff"
  }
});
