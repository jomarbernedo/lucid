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
export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1],
      data: [7, 21, 18, 30, 12, 35]
    };
  }

  componentDidMount() {
    //this.getData();
  }

  Header = () => {
    const drawDatetxt = moment("2020-01-25").format("D MMMM YYYY, dddd");

    return (
      <CardHeader>
        <View style={{ flex: 1, alignItems: "center", alignContent: "center" }}>
          <Text
            category="s1"
            style={{
              fontFamily: "AirbnbCereal-Book",
              color: Colors.info
            }}
          >
            Winning Combination
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
        {/* <NavigationEvents onWillFocus={() => this.getData()} /> */}
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
            Notifications
          </Text>
        </Layout>
        <Layout
          style={{ paddingTop: 0, paddingBottom: 120, width: "90%" }}
          level="1"
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.list}
            renderItem={({ item }) => (
              <Card
                style={{
                  flex: 1,
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
                header={() => this.Header()}
              >
                <View
                  style={{
                    marginLeft: 8,
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  {this.state.data.map(value => {
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

NotificationScreen.navigationOptions = {
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
    backgroundColor: Colors.success,
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
