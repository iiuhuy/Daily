import React, { Component } from "react";
import PropTypes from "prop-types";

import { View, Text, StyleSheet, Platform } from "react-native";

import theme from "../config/theme";

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    size: 40,
    color: "#ffffff",
    backgroundColor: "skyblue",
    borderColor: "rgba(0,0,0,.1)",
    borderWidth: 1
  };

  render() {
    return (
      <View style={styles.actionBar}>
        <Text
          style={{
            color: theme.actionBar.fontColor,
            fontSize: theme.actionBar.fontSize
          }}
        >
          云书包实验小学
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionBar: {
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? px2dp(20) : 0
  }

  // container: {
  //   flex: 1,
  //   backgroundColor: theme.pageBackgroundColor
  // },
  // text: {
  //   color: theme.text.color,
  //   fontSize: theme.text.fontSize
  // }
});
