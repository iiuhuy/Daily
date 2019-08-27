import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  Platform,
  PixelRatio,
  TouchableNativeFeedback,
  TouchableOpacity,
  Alert,
  AlertIOS,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import px2dp from "../../util/px2dp";
import theme from "../../config/theme";
import Avatar from "../../component/Avatar";
import { storage } from "../../storage/storage";
import Item from "../../component/Item";

export default class MeFragment extends Component {
  static navigationOptions = {
    title: "个人中心"
    // tabBarVisible: false, // 隐藏底部导航栏
    // header: null //隐藏顶部导航栏
  };

  constructor(props) {
    super(props);
    this.state = {
      // img 的 uri 不能为空字符串, 会报警告
      headUrl:
        "https://ebag-public-resource.oss-cn-shenzhen.aliyuncs.com/heard_photo/avatar_default.png",
      name: "",
      ysbCode: ""
    };
  }

  // 退出清除 token
  _signOutAndRemoveToken = async () => {
    // this.props.navigator.push({
    //   component: SignInPage
    // });
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  _onHandlePress(position) {
    switch (position) {
      case 0: // title
        console.log("头像", `${this.state.headUrl}`);
        // this.props.navigation.navigate("PersonPage"); // 导航栏
        break;

      case 1:
        // 姓名
        this._alert("姓名", `${this.state.name}`);
        break;

      case 2:
        // 账号
        this._alert("账号", `${this.state.ysbCode}`);
        break;

      case 3:
        // 修改密码
        this._alert("修改密码", "修改密码");
        break;

      case 4:
        // 版本
        this._alert("版本", "v1.0");
        break;

      case 5:
        Alert.alert("!");
        break;

      default:
        break;
    }
  }

  _alert(title, content) {
    if (Platform.OS === "android") {
      Alert.alert(title, content, [{ text: "OK", onPress: () => {} }]);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(title, content, [{ text: "OK", onPress: () => {} }]);
    }
  }

  componentDidMount(prevProps, prevState) {
    storage.load("person", data => {
      // console.warn(data);
      this.setState({
        headUrl: data.headUrl,
        name: data.name,
        ysbCode: data.ysbCode
      });
      // console.log(this.state.headUrl);
      // console.log(this.state.name);
      // console.log(this.state.ysbCode);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <HeaderBar /> */}
        <ScrollView>
          {Platform.OS === "android" ? (
            <TouchableNativeFeedback
              onPress={this._onHandlePress.bind(this, 0)}
            >
              <View style={styles.intro}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                    // marginLeft: px2dp(1)
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: theme.text.color,
                      fontSize: px2dp(20)
                    }}
                  >
                    我的头像
                  </Text>
                  <Avatar
                    image={{
                      uri: `${this.state.headUrl}`
                    }}
                    size={px2dp(40)}
                    textSize={px2dp(20)}
                  />
                </View>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <TouchableNativeFeedback
              onPress={this._onHandlePress.bind(this, 0)}
            >
              <View style={styles.intro}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: px2dp(5)
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: theme.text.color,
                      fontSize: px2dp(20)
                    }}
                  >
                    我的头像
                  </Text>
                  <Avatar
                    image={{
                      uri: `${this.state.headUrl}`
                    }}
                    size={px2dp(40)}
                    textSize={px2dp(20)}
                  />
                </View>
              </View>
            </TouchableNativeFeedback>
            // <TouchableOpacity
            //   onPress={this._onHandlePress.bind(this, 0)}
            //   activeOpacity={theme.btnActiveOpacity}
            // >
            //   <View style={styles.intro}>
            //     <Avatar
            //       image={require("../../image/logo_og.png")}
            //       size={px2dp(55)}
            //       textSize={px2dp(20)}
            //     />
            //     <View style={{ marginLeft: px2dp(12) }}>
            //       <Text
            //         style={{ color: theme.text.color, fontSize: px2dp(20) }}
            //       >
            //         WangdiCoder
            //       </Text>
            //       <TextButton
            //         text="添加职位 @添加公司"
            //         color="#949494"
            //         fontSize={px2dp(13)}
            //         onPress={this._onHandlePress.bind(this, 1)}
            //       />
            //     </View>
            //     <View
            //       style={{
            //         flex: 1,
            //         flexDirection: "row",
            //         justifyContent: "flex-end"
            //       }}
            //     >
            //       <Icon
            //         name="ios-arrow-forward"
            //         color="#ccc"
            //         size={px2dp(30)}
            //       />
            //     </View>
            //   </View>
            // </TouchableOpacity>
          )}

          <View style={styles.list}>
            <Item
              text="姓名"
              subText={this.state.name}
              onPress={this._onHandlePress.bind(this, 1)}
            />
            <Item
              text="账号"
              subText={this.state.ysbCode}
              onPress={this._onHandlePress.bind(this, 2)}
            />
            <Item
              text="修改密码"
              subText=""
              onPress={this._onHandlePress.bind(this, 3)}
            />
            <Item
              text="版本"
              subText="v1.0"
              onPress={this._onHandlePress.bind(this, 4)}
            />
          </View>

          {/* <View style={styles.list}>
            <Item
              icon="md-settings"
              text="设置"
              onPress={this._onHandlePress.bind(this, 6)}
            />
          </View> */}
          {/*--------------------------------------------------------------------------*/}
          <View style={styles.list}>
            {Platform.OS === "android" ? (
              <TouchableNativeFeedback
                onPress={this._signOutAndRemoveToken.bind(this)}
              >
                <View style={[styles.listItem, { justifyContent: "center" }]}>
                  <Text style={{ color: "red", fontSize: px2dp(15) }}>
                    退出登录
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <TouchableOpacity activeOpacity={theme.btnActiveOpacity}>
                <View style={[styles.listItem, { justifyContent: "center" }]}>
                  <Text style={{ color: "red", fontSize: px2dp(15) }}>
                    退出登录
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          {/*--------------------------------------------------------------------------*/}
        </ScrollView>
      </View>
    );
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
