import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Alert,
  PixelRatio,
  Platform,
  Image,
  TextInput,
  BackHandler
} from "react-native";

import px2dp from "../../util/px2dp";
import Button from "../../component/Button";
import TextButton from "../../component/TextButton";
import TextDivider from "../../component/TextDivider";
import ImageButton from "../../component/ImageButtonWithText";

import Connect from "../../util/Connect";
import { storage } from "../../storage/storage";

// import SignUpPage from "./SignUpPage";

// import HomeECharts from "../HomePage/HomeECharts";

// import TeacherLogin from "../HomePage/TeacherLogin";
// import HomeWork from "../HomePage/HomeWork";
// import Achievement from "../HomePage/Achievement";
// import PrepareLessons from "../HomePage/PrepareLessons";
// import TestCounts from "../HomePage/TestCounts";

// component:
export default class SignInPage extends Component {
  static navigationOptions = {
    // tabBarVisible: false, // 隐藏底部导航栏
    header: "云书包实验中学" //隐藏顶部导航栏
  };

  constructor(props) {
    super(props);
    this.handleBack = this._handleBack.bind(this);
    this.state = {
      user_text: "", // 登录账号
      pass_text: "", // 密码
      headUrl: "", // 头像
      name: "", // 姓名
      ysbCode: "", // 书包号
      rememberAccount: false, // 记住账号状态
      loginUserNumber: null, // 记住账号
      loginPassword: null // 记住账号密码
    };
    SignInPage._handleBack;
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
  }

  // 如何使用兄弟组件更新的值?
  _showData = person => {
    this.setState({
      headUrl: person.headUrl,
      name: person.name,
      ysbCode: person.ysbCode
    });
  };

  _handleBack() {
    let loginAccount = null;
    let password = null;

    // 如果记住的状态为 true, 那么就使用记住的账号密码。否则以为输入的为准
    if (
      this.state.loginUserNumber === null &&
      this.state.loginPassword === null
    ) {
      console.log("没有记住密码");
      loginAccount = this.state.user_text;
      password = this.state.pass_text;
    } else {
      storage.load("login", data => {
        console.log("记住密码");
        console.log(data);
        loginAccount = data.loginAccount;
        password = data.password;
        // this.setState({
        // });
      });
    }
    console.log(loginAccount, password);
    let requestData = {
      deviceCode: "1064918841574",
      isHDorPHONE: "HD",
      loginAccount: loginAccount,
      password: password,
      loginType: "1",
      roleCode: "2",
      loginApp: "headMaster"
    };
    console.log(requestData);
    // const navigator = this.props.navigator;
    Connect.login(requestData, response => {
      console.log(response);

      if (response.success === "200") {
        const token = response.data.access_token;
        console.log(response);
        storage.save("token", token);

        // 存储个人中心需要用到的数据，啊~ 我好菜吖,高清重置版 😖。
        let person = {};
        person.name = response.data.userInfoVo.name;
        person.headUrl = response.data.userInfoVo.headUrl;
        person.ysbCode = response.data.userInfoVo.ysbCode;
        person.schoolName = response.data.userInfoVo.schoolName;
        person.schoolId = response.data.userInfoVo.school;

        this.props.navigation.navigate("App"); // 导航栏
        // 如果记住密码, 那么存储密码。
        this.setState({ rememberAccount: true });
        if (this.state.rememberAccount === true) {
          const login = {};
          login.loginAccount = requestData.loginAccount;
          login.password = requestData.password;
          storage.save("login", login);
        }

        storage.save("person", person);

        // 测试用... 请求首页数据
        Connect.queryHomePageByConditions({}, response => {
          if (response.success === "200") {
            // console.log("校长端首页数据请求成功!", response.data);
            // 存入 storage
            let homeChartData = {};
            homeChartData = response.data;
            storage.save("homeChartData", homeChartData);
          } else {
            Alert.alert(
              "请求首页数据失败! queryHomePageByConditions not 200",
              response.message
            );
          }
        });
      } else {
        Alert.alert("登录失败", response.message);
      }
    });

    // if (navigator && navigator.getCurrentRoutes().length > 1) {
    //   navigator.pop();
    //   return true;
    // }
    // return false;
  }

  _signupCallback() {
    // this.props.navigator.push({
    //   component: SignUpPage
    // });
  }

  _forgetPassword() {}

  render() {
    return (
      <View style={styles.view}>
        {/* <View style={styles.actionBar}>
          <ImageButton
            onPress={this._handleBack.bind(this)}
            icon="md-arrow-back"
            color="white"
            imgSize={px2dp(25)}
            btnStyle={{ width: px2dp(55), height: px2dp(60) }}
          />
        </View> */}
        <View style={styles.logo}>
          <Image
            style={{ width: px2dp(45), height: px2dp(45) }}
            source={{
              uri:
                "https://ebag-public-resource.oss-cn-shenzhen.aliyuncs.com/heard_photo/avatar_default.png"
            }}
          />
        </View>
        <View style={styles.editGroup}>
          <View style={styles.editView1}>
            <TextInput
              style={styles.edit}
              underlineColorAndroid="transparent"
              placeholder="书包号/手机号"
              keyboardType="numeric"
              placeholderTextColor="#c4c4c4"
              onChangeText={user_text => this.setState({ user_text })}
              maxLength={10}
            />
          </View>
          <View
            style={{ height: 1 / PixelRatio.get(), backgroundColor: "#c4c4c4" }}
          />
          <View style={styles.editView2}>
            <TextInput
              style={styles.edit}
              underlineColorAndroid="transparent"
              placeholder="密码"
              textContentType="password"
              secureTextEntry={true}
              placeholderTextColor="#c4c4c4"
              onChangeText={pass_text => this.setState({ pass_text })}
              maxLength={20}
            />
          </View>
          <View style={{ marginTop: px2dp(10), height: px2dp(40) }}>
            <Button text="登录" onPress={this._handleBack.bind(this)} />
          </View>
          <View style={styles.textButtonLine}>
            <TextButton
              text="忘记密码?"
              onPress={this._forgetPassword.bind(this)}
              color="rgba(255,255,255,0.5)"
            />
            <TextButton
              text="注册账号"
              onPress={this._signupCallback.bind(this)}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginLeft: px2dp(20),
              marginRight: px2dp(20)
            }}
          >
            <TextDivider text="其他账号登录" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "rgb(22,131,251)"
  },
  actionBar: {
    marginTop: Platform.OS === "ios" ? px2dp(10) : 0
  },
  logo: {
    alignItems: "center",
    marginTop: px2dp(40)
  },
  edit: {
    height: px2dp(40),
    fontSize: px2dp(13),
    backgroundColor: "#fff",
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15)
  },
  editView1: {
    height: px2dp(48),
    backgroundColor: "white",
    justifyContent: "center",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  editView2: {
    height: px2dp(48),
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  editGroup: {
    margin: px2dp(20)
  },
  textButtonLine: {
    marginTop: px2dp(12),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  thirdPartyView: {
    flex: 1,
    marginTop: px2dp(10),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around"
  }
});
