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
  ScrollView,
  FlatList,
  RefreshControl,
  Button,
  ActivityIndicator
} from "react-native";
import px2dp from "../../util/px2dp";
import theme from "../../config/theme";
import Connect from "../../util/Connect";
import { storage } from "../../storage/storage.js";

// import Icon from "react-native-vector-icons/Ionicons";
// import TextButton from "../../component/TextButton";
// import Avatar from "../../component/Avatar";

export default class HomeWork extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params;
    console.log("refresh", params);
    return {
      title: `${navigation.state.params.schoolName}`
      // headerRight: (
      //   <Button
      //     title="查询"
      //     color="gray"
      //     onPress={() =>
      //       // navigation.navigate("QueryCondition", navigation.state.params)
      //       navigation.navigate("QueryCondition", {
      //         // boom: this.state.boom,
      //         params,
      //         refresh: data => {
      //           console.log("refresh", data);
      //           // this.setState({
      //           //   boom: data
      //           // });
      //         }
      //       })
      //     }
      //   />
      // )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      itemLenght: null, // 列表长度
      page: 1, // 页数
      subjectName: [], //科目
      content: [], // 内容
      createDate: [], // 创建时间
      creator: [], // 创建人
      student: 0, // 学生平均成绩
      refreshing: false,
      wait: false // 上拉等待进度条
    };
  }

  // 列表区分显示
  _splitShowList(paramsQuery, res) {
    let data = [];
    const time = [];
    let obj = {};
    console.log(res);

    // 遍历对象
    obj = res.data;
    Object.keys(obj).forEach(function(key) {
      data = obj[key];
      time.push(key);
    });

    const subjectName = [];
    const content = [];
    const creator = [];
    const createDate = [];

    // 1-作业, 2-备课, 3-试卷, 5-成绩
    switch (paramsQuery) {
      case "1":
        for (let i = 0; i < data.length; i++) {
          subjectName.push(`科目: ${data[i].subjectName} (${data[i].name})`);
          content.push(`作业内容: ${data[i].content}`);
          creator.push(`作业创建人: ${data[i].name}`);
          createDate.push(`作业创建日期: ${data[i].createDate}`);
        }
        break;
      case "2":
        for (let i = 0; i < data.length; i++) {
          subjectName.push(`科目: ${data[i].subjectName} (${data[i].name})`);
          content.push(`课件内容: ${data[i].content}`);
          creator.push(`课件创建人: ${data[i].name}`);
          createDate.push(`课件创建日期: ${data[i].createDate}`);
        }
        break;
      case "3":
        for (let i = 0; i < data.length; i++) {
          subjectName.push(`科目: ${data[i].subjectName} (${data[i].name})`);
          content.push(`试卷内容: ${data[i].content}`);
          creator.push(`试卷创建人: ${data[i].name}`);
          createDate.push(`试卷创建日期: ${data[i].createDate}`);
        }
        break;
      case "5":
        for (let i = 0; i < data.length; i++) {
          subjectName.push(`科目: ${data[i].subjectName} (${data[i].name})`);
          // content.push(`作业内容: ${data[i].content}`);
          content.push(`学生平均成绩: ${data[i].count}`);
          creator.push(`创建人: ${data[i].name}`);
          createDate.push(`创建日期: ${data[i].createDate}`);
        }
        break;

      default:
        break;
    }
    // 状态值
    this.setState({
      timeTitle: time[0],
      itemLenght: data.length,
      subjectName: subjectName,
      content: content,
      creator: creator,
      createDate: createDate
    });
  }

  // 显示内容列表
  _showContentList() {
    const { navigation } = this.props;
    console.log("navigation", navigation);
    const params = navigation.state.params;

    console.log("HomeWork... 导航参数", params);
    console.log(params);

    if (params.queryType === "4") {
      Connect.queryEverySubjectDataAnalysisByClazz(params, res => {
        if (res.success === "200") {
          console.log("登录的次数", res.data);
          let data = [];
          const time = [];
          let obj = {};

          // 遍历对象
          obj = res.data;
          Object.keys(obj).forEach(function(key) {
            data = obj[key];
            time.push(key);
          });

          console.log(data, time);
          const subjectName = [];
          const content = [];
          const creator = [];
          const createDate = [];
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].loginDevice);
            switch (data[i].loginDevice) {
              case "1":
                // 1-书包号, 2-账号, 3-新浪微博, 4-QQ, 5-微信
                subjectName.push("登录方式: 书包号登录"); // loginDevice 登录通道
                break;
              case "2":
                subjectName.push("登录方式: 账号登录");
                break;
              case "3":
                subjectName.push("登录方式: 新浪微博登录");
                break;
              case "4":
                subjectName.push("登录方式: QQ 登录");
                break;
              case "5":
                subjectName.push("登录方式: 微信登录");
                break;
              default:
                break;
            }
            switch (data[i].loginWay) {
              case "1":
                // 1-手机, 2-PC, 3-平板
                content.push("登录通道: 手机端"); // loginWay 登录方式
                break;
              case "2":
                content.push("登录通道: PC 端");
                break;
              case "3":
                content.push("登录通道: 平板 端");
                break;

              default:
                break;
            }
            creator.push(`登录人: ${data[i].name}`);
            createDate.push(`登录时间: ${data[i].createDate}`);
          }
          this.setState({
            itemLenght: data.length,
            timeTitle: time[0], // 日期
            subjectName: subjectName,
            content: content,
            creator: creator,
            createDate: createDate
          });
        } else {
          Alert.alert("按条件查询数据失败.", response.message);
        }
      });
    } else {
      // 按照条件查询的请求
      Connect.queryEverySubjectDataAnalysisList(params, res => {
        console.log("根据 queryType 区分", params);
        if (res.success === "200") {
          console.log("按条件查询返回数据", res.data);
          // if (JSON.stringify(res.data) === "{}") {
          //   Alert.alert("该列表无数据");
          //   this.props.navigation.goBack();
          //   return;
          // } else {
          // 判断 queryType
          this._splitShowList(params.queryType, res);
          // }
        } else {
          Alert.alert("按条件查询数据失败.", response.message);
        }
      });
    }
  }

  componentDidMount() {
    this._showContentList();
    console.log("嘻嘻嘻 DidMount");
  }

  // componentWillUnmount() {
  //   console.log("嘿嘿嘿 WillUnmount");
  // }

  _alert(item) {
    if (Platform.OS === "android") {
      Alert.alert(
        `${this.state.subjectName[item.index]}
        ${this.state.content[item.index]}${this.state.creator[item.index]}`,
        `${this.state.createDate[item.index]}`,
        [{ text: "OK", onPress: () => {} }]
      );
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(
        `${this.state.subjectName[item.index]}`,
        `${this.state.content[item.index]}`,
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }

  // 隔栏条
  // _separator = () => {
  //   return <View style={{ height: 1, backgroundColor: "gray" }} />;
  // };

  /* ==== 下拉刷新 ==== */
  _onRefresh = () => {
    // refreshing 是一个受控属性， 所以必须在 onRefresh 函数中设置为 true，否则 loading 指示器会立即停止。
    console.log("下拉刷新🌂");
    this.setState({
      refreshing: true,
      page: 1
    });

    let params = this.props.navigation.state.params;

    params.page = this.state.page;

    Connect.queryEverySubjectDataAnalysisList(params, res => {
      if (res.success === "200") {
        console.log(res.data);
        this.setState({ refreshing: false }); // 下拉刷新

        // 判断 queryType
        this._splitShowList(params.queryType, res);
      } else {
        Alert.alert("下拉刷新 -> 按条件查询数据失败.", response.message);
      }
    });
  };

  /* ==== 上拉加载 ==== */
  // 上拉加载进度条
  pullLoadingWait() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="red" size="large" />
      </View>
    );
  }
  // 上拉操作
  _pullLoading() {
    // if (true) {
    //   this.pullLoadingWait();
    // }
    // console.log("上拉加载了解一下。。。🚀");
    if (!this.onEndReachedCalledDuringMomentum) {
      //TODO：此处添加处理上拉加载方法

      this.setState({
        page: this.state.page + 1
      });
      // 路由参数
      let params = this.props.navigation.state.params;

      console.log("1", params, this.state.page);
      params.page = this.state.page;
      console.log("2", params, this.state.page);

      Connect.queryEverySubjectDataAnalysisList(params, res => {
        if (res.success === "200") {
          if (JSON.stringify(res.data) === "{}") {
            // 按理说无数据不应该展示的,但是这里还是没有...
            Alert.alert("没有更多数据!");
            // this.props.navigation.goBack();
            return;
          } else {
            // 判断 queryType
            this._splitShowList(params.queryType, res);
          }
        } else {
          Alert.alert("上拉加载 -> 按条件查询数据失败.", response.message);
        }
      });

      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  // 内容列表
  _renderList = (item, index) => {
    return (
      <ScrollView>
        <View style={styles.list} key={index}>
          {Platform.OS === "android" ? (
            // <TouchableNativeFeedback onPress={this._alert.bind(this, item)}>
            <View>
              {/* <View style={[styles.listItem, { justifyContent: "center" }]}> */}
              <View style={styles.listItem}>
                <Text style={styles.itemIndex}>
                  {this.state.subjectName[item.index]}
                </Text>
                <Text style={styles.itemIndex}>
                  {this.state.content[item.index]}
                </Text>
                <Text style={styles.itemIndex}>
                  {this.state.creator[item.index]}
                </Text>
                <Text style={styles.itemIndex}>
                  {this.state.createDate[item.index]}
                </Text>
              </View>
              <View style={{ height: 1, backgroundColor: "gray" }} />
            </View>
          ) : (
            // </TouchableNativeFeedback>
            <TouchableOpacity activeOpacity={theme.btnActiveOpacity}>
              <View>
                <View style={[styles.listItem, { justifyContent: "center" }]}>
                  <Text style={{ color: "blue", fontSize: px2dp(15) }}>
                    {this.state.subjectName[item.index]} :
                    {this.state.content[item.index]}
                  </Text>
                </View>
                <View style={{ height: 1, backgroundColor: "gray" }} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  };

  render() {
    let homeWork = [];
    for (var i = 0; i < this.state.itemLenght; i++) {
      homeWork.push({ key: i, title: i + "" });
    }

    return (
      <View style={styles.container}>
        {/* <Button title="查询" color="gray" /> */}
        <View
          style={{
            height: px2dp(20)
          }}
        >
          <Text
            style={{
              top: px2dp(10) / 2,
              textAlign: "center",
              color: "black",
              fontSize: px2dp(10)
            }}
          >
            {this.state.timeTitle}
          </Text>
        </View>
        <FlatList
          renderItem={this._renderList}
          // ItemSeparatorComponent={this._separator}
          data={homeWork}
          /* ---- 上拉加载 ---- */
          onEndReached={this._pullLoading.bind(this)}
          onEndReachedThreshold={0.1}
          /* ---- 下拉刷新 ---- */
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          keyExtractor={item => item}
          // 滚动动画开始时调用此函数
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  list: {
    flex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: "#e4e4e4",
    marginTop: px2dp(10)
  },
  listItem: {
    flex: 1,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    height: px2dp(150),
    backgroundColor: "white",
    paddingRight: px2dp(25),
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1 / PixelRatio.get()
  },
  itemIndex: {
    flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    top: 10,
    left: 15,
    justifyContent: "flex-start",
    color: "blue",
    fontSize: px2dp(15)
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#005DD0"
  }
});
