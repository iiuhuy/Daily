import React from "react";
import { Button, StatusBar, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class OtherPage extends React.Component {
  static navigationOptions = {
    title: "这是另一个页面"
  };

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="显示另一个页面~" onPress={this._showMoreApp} />
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
