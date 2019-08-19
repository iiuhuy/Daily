import React from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import SignInScreen from "./src/page/SignInAndSignup/SignInPage";
import HomeCharts from "./src/page/HomePage/HomeECharts";
import TeacherLogin from "./src/page/HomePage/TeacherLogin";
import ClassData from "./src/page/HomePage/ClassDataPage";
import HomeWork from "./src/page/HomePage/HomeWork"

// test
import OtherPage from "./src/page/OtherPage";
import OtherPageCopy from "./src/page/OtherPageCopy";

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // 从存储中获取 token, 然后导航到 APP 还是 认证页面
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        {/* <StatusBar barStyle="default" /> */}
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

// APP STACK => 路由配置
const AppStack = createStackNavigator({
  Home: HomeCharts,
  // Other: OtherPage,
  TeacherLoginData: TeacherLogin, // 老师登录数据图
  ClassDataPage: ClassData,
  HomeWork: HomeWork,
  AnOther: OtherPageCopy
});

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen // 登录页面
  },
  {
    headerMode: "none" // 隐藏导航栏(不为 header 提供内容,就不会渲染)
  }
);

// createSwitchNavigator 一次只显示一个页面
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
      // initialRouteName: "Auth"
      // navigationOptions:
      // navigationOptions: () => ({
      //   title: `A`,
      //   headerBackTitle: "A much too long text for back button from B to A",
      //   headerTruncatedBackTitle: `to A`
      // })
    }
  )
);
