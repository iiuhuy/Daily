import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Text,
  View,
  StyleSheet,
  Platform,
  Button,
  PixelRatio,
  TouchableNativeFeedback,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  AlertIOS,
  ScrollView,
  CameraRoll
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import theme from "../config/theme";
import px2dp from "../util/px2dp";
import Icon from "react-native-vector-icons/Ionicons";

export default class Item extends Component {
  static propTypes = {
    // icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    text: PropTypes.string.isRequired,
    subText: PropTypes.string,
    onPress: PropTypes.func
  };

  static defaultProps = {
    iconColor: "gray"
  };

  render() {
    // const { icon, iconColor, text, subText, onPress } = this.props;
    const { iconColor, text, subText, onPress } = this.props;

    if (Platform.OS === "android") {
      return (
        <TouchableNativeFeedback onPress={onPress}>
          <View style={styles.listItem}>
            {/* <Icon name={icon} size={px2dp(22)} color={iconColor} /> */}
            <Icon size={px2dp(22)} color={iconColor} />
            <Text
              style={{
                color: "black",
                fontSize: px2dp(15),
                marginLeft: px2dp(20)
              }}
            >
              {text}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <Text style={{ color: "#ccc" }}>{subText}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
    } else if (Platform.OS === "ios") {
      return (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={theme.btnActiveOpacity}
        >
          <View style={styles.listItem}>
            {/* <Icon name={icon} size={px2dp(22)} color={iconColor} /> */}
            <Icon size={px2dp(22)} color={iconColor} />
            <Text
              style={{
                color: "black",
                fontSize: px2dp(15),
                marginLeft: px2dp(20)
              }}
            >
              {text}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <Text style={{ color: "#ccc" }}>{subText}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  actionBar: {
    height: theme.actionBar.height,
    backgroundColor: theme.actionBar.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? px2dp(20) : 0
  },
  intro: {
    // height: px2dp(100),
    height: px2dp(60),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: px2dp(20),
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "#c4c4c4",
    borderTopColor: "#e4e4e4",
    marginTop: px2dp(10)
  },
  list: {
    flex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: "#e4e4e4",
    marginTop: px2dp(15)
  },
  listItem: {
    flex: 1,
    height: px2dp(47),
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: px2dp(5),
    paddingRight: px2dp(25),
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1 / PixelRatio.get()
  }
});
