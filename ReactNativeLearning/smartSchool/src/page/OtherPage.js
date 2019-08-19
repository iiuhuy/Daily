import React from "react";
import { Button, StatusBar, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class OtherPage extends React.Component {
  static navigationOptions = {
    title: "😀"
  };

  _showMoreApp = () => {
    this.props.navigation.navigate("AnOther");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="显示其他页面" onPress={this._showMoreApp} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
