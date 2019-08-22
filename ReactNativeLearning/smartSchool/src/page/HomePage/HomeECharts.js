import React, { Component } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import theme from "../../config/theme";
import Connect from "../../util/Connect";
import px2dp from "../../util/px2dp";
import { storage } from "../../storage/storage.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import WebChart from "../../component/WebChart/index";
import TeacherLogin from "../HomePage/TeacherLogin";
import MyPage from "../MyPage/MeFragment";
import DetailsScreen from "../../page/DetailsScreen";

// test
import TabBarItemComponent from "../../component/TabBarItemComponent";

class HomeECharts extends Component {
  static navigationOptions = {
    // tabBarVisible: false, // 隐藏底部导航栏
    // header: null // 隐藏顶部导航栏
    header: "云书包实验小学"
  };

  constructor(props) {
    super(props);
    this.state = {
      resData: "",
      teacherLogin: "",
      homeWork: "",
      achievement: "",
      lessionFileCountlist: "",
      testPaperCountlist: "",
      key: null
    };
  }

  // 在页面渲染前调用
  componentDidMount() {
    // 校长端首页数据统计
    Connect.queryHomePageByConditions({}, response => {
      if (response.success === "200") {
        // console.warn("校长端首页数据请求成功!", response.data);

        let homeChartData = {};
        homeChartData = response.data;
        storage.save("homeChartData", homeChartData);
        storage.load("homeChartData", data => {
          console.log("首页数据😀", data);

          this.setState({
            teacherLoginData: data.teacherLoginCountlist
          });
          console.log(this.state.teacherLoginData);
        });
        this.setState({
          resData: response.data,
          teacherLogin: response.data.teacherLoginCountlist,
          homeWork: response.data.homeWorkCountlist,
          achievement: response.data.studentAchievementCountlist,
          lessionFileCountlist: response.data.lessionFileCountlist,
          testPaperCountlist: response.data.testPaperCountlist
        });
      } else {
        Alert.alert("queryHomePageByConditions not 200", response.message);
      }
    });

    // test
    let routeName = this.props.navigation.state.routeName;
    console.log("%c 查看当前路由", "background:#aaa;color:red", routeName);
  }

  _separator = () => {
    return <View style={{ height: 1, backgroundColor: "gray" }} />;
  };

  _loadParams(item) {
    // 路由需要的参数 obj, 使用这个读取 this.props.navigation.state.params
    storage.load("person", data => {
      // hint 在后级页面 button 做提示用, 根据返回的数据结构排序
      // const hint = ["使用时长", "布置作业", "学生成绩", "备课数量", "试题数量"];
      const hint = [
        "布置作业",
        "备课数量",
        "创建试题数量",
        "使用时长",
        "学生成绩"
      ];
      let params = {};
      let all = []; // 存储数据
      let gradeCode = [];
      let queryType = null;

      // console.log("我可以无所谓..", this.state.resData);
      const obj = this.state.resData;

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          all.push(obj[key]);
        }
      }

      console.log("寂寞却一直掉眼泪", all, item);
      for (let i = 0; i < all[item].length; i++) {
        // 因为在二维数组中
        gradeCode.push(all[item][i].gradeCode);
        // queryType.push(all[item][0].queryType);
        queryType = all[item][0].queryType;
      }

      params.schoolId = data.schoolId;
      // console.log("搬砖", gradeCode, queryType);
      params.gradeCodes = gradeCode;
      params.queryType = queryType;
      params.hint = hint;

      console.log("首页传向后面的参数:", params);
      this.props.navigation.navigate("TeacherLoginData", params);
    });
  }

  // 渲染的条目 ({ index })
  _renderItem = item => {
    // 标题没有返回, 自己定了一个数组. 和后台返回的数据对应
    const title = [
      "各个年级教师登录次数(使用时长)",
      "各个年级作业布置数量",
      "各个年级学生成绩",
      "各个年级课件数量",
      "各个年级创建试题数量"
    ];

    // 渲染的数据
    let allData = [];
    for (let j = 0; j < 5; j++) {
      let renderData = {};
      switch (j) {
        case 0:
          renderData = this.state.teacherLogin;
          break;
        case 1:
          renderData = this.state.homeWork;
          break;
        case 2:
          renderData = this.state.achievement;
          break;
        case 3:
          renderData = this.state.lessionFileCountlist;
          break;
        case 4:
          renderData = this.state.testPaperCountlist;
          break;

        default:
          break;
      }
      let datas = [];
      for (let k = 0; k < renderData.length; k++) {
        let grade = {};
        grade.name = renderData[k].gradeName;
        grade.value = renderData[k].count;
        datas[k] = grade;
      }
      allData.push(datas);
      // console.log(allData);
    }

    const option = {
      // title: {
      //   text: title[item.index],
      //   x: "center"
      // },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left"
      },
      series: [
        {
          name: "年级",
          type: "pie",
          selectedMode: "single",
          radius: [0, "80%"], // 缩放比例
          data: allData[item.index]
        }
      ]
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title[item.index]}</Text>
        <WebChart
          style={styles.chart}
          option={option}
          exScript={`
            chart.on('click', (params) => {
              if(params.componentType === 'series') {
                window.postMessage(JSON.stringify({
                  type: 'select',
                  payload: {
                    index: params.dataIndex,
                  },
                }));
              }
            });
          `}
          // onMessage={this.alertMessage}
        />
        {/* <TouchableNativeFeedback> */}
        {/* <View style={{ height: px2dp(15) }}>
          <Text style={{ color: "blue", fontSize: px2dp(15) }} />
        </View> */}
        {/* </TouchableNativeFeedback> */}
        <View style={styles.btn}>
          <Button
            title={`显示 ${title[item.index]} 详情数据`}
            onPress={this._loadParams.bind(this, item.index)}
          />
        </View>
      </View>
    );
  };

  // ================== test =============================== //
  _keyExtractor = (item, index) => {
    item.id;
    // console.log("heihei.", item.key);
  };

  // ================== test =============================== //
  render() {
    // 饼图的个数,取决于来自后台请求的字段
    let chatItem = [];
    for (var i = 0; i < 5; i++) {
      chatItem.push({ key: i, title: i + "" });
    }

    return (
      <View>
        <FlatList
          data={chatItem}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._separator}
          // renderItem={this._renderCharts}
          // onEndReached={info => {
          //   console.warn(info.distanceFromEnd);
          // }}
          //}}

          // 使用 id 作为列表每一项的 key
          keyExtractor={this._keyExtractor}
          // ItemSeparatorComponent={() => (
          //   <View
          //     style={{
          //       height: 1,
          //       backgroundColor: "#D6D6D6"
          //     }}
          //   />
          // )}
        />
      </View>
    );
  }
}

const RouteConfigs = {
  HomeECharts: {
    screen: HomeECharts, // screen 属性为必须配置属性
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "首页",
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItemComponent
          tintColor={tintColor}
          focused={focused}
          normalImage={require("../../assets/image/playing.png")}
          selectedImage={require("../../assets/image/playing-active.png")}
        />
      )
    })
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "我的",
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItemComponent
          tintColor={tintColor}
          focused={focused}
          normalImage={require("../../assets/image/coming.png")}
          selectedImage={require("../../assets/image/coming-active.png")}
        />
      )
    })
  }

  // Home2: {
  //   screen: Home2,
  //   path: "app/Home2",
  //   navigationOptions: {
  //     title: "这是在RouteConfigs中设置的title",
  //     headerTitleStyle: {
  //       fontSize: 10
  //     }
  //   }
  // }
  // Home3: { screen: Home3 },
};

// const StackNavigatorConfig = {
//   initialRouteName: "Home",
//   initialRouteParams: { initPara: "初始页面参数" },
//   navigationOptions: {
//     title: "标题",
//     headerTitleStyle: { fontSize: 18, color: "red" },
//     headerStyle: { height: 49 }
//   },
//   paths: "page/main",
//   mode: "card",
//   headerMode: "screen",
//   cardStyle: { backgroundColor: "#ffffff" },
//   transitionConfig: () => ({}),
//   onTransitionStart: () => {
//     console.log("页面跳转动画开始");
//   },
//   onTransitionEnd: () => {
//     console.log("页面跳转动画结束");
//   }
// };

export default createAppContainer(
  createBottomTabNavigator(RouteConfigs, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "首页") {
          // iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          iconName = "ios-home";
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === "我的") {
          iconName = "ios-person";
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#52A2FF",
      inactiveTintColor: "gray"
    }
  })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
    // backgroundColor: "#111c4e"  // 给 echarts 加背景颜色，感觉适合夜景模式.
  },
  title: {
    textAlign: "center",
    height: 20,
    fontSize: 14,
    color: "#333333",
    top: 5
  },
  // 每个 chart 的间隔
  chart: {
    height: 300,
    marginTop: 5,
    marginBottom: 5
  },
  // charts: {
  //   width: "100%",
  //   padding: 10,
  //   // height: "20%",
  //   // backgroundColor: "gray",
  //   borderBottomColor: "#D3D3D3"
  // },
  // txt: {
  //   textAlign: "center",
  //   textAlignVertical: "center",
  //   color: "white",
  //   fontSize: 20
  // },
  btn: {
    flex: 1,
    justifyContent: "center"
    // alignItems: "stretch"
  },

  // test echarts demo
  tip: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
    marginLeft: 10
  }
});
