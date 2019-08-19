import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

export default class DetailPage extends React.Component {
  static navigationOptions = {
    title: "详情页"
  };

  render() {
    let url = "http://www.baidu.com";
    return (
      <View>
        {/* <WebView
          style={{ width: 400, height: 400 }}
          source={{ uri: url }}
        /> */}
        <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
      </View>
    );
  }
}
