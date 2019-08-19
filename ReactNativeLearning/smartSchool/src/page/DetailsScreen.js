import React from "react";

export default class DetailsPage extends React.Component {
  static navigationOptions = {
    // title: "云书包实验小学"
    // tabBarVisible: false, // 隐藏底部导航栏
    header: null // 隐藏顶部导航栏
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Details! 爱 ❤ 泥 👉 萌 😋！</Text>
      </View>
    );
  }
}
