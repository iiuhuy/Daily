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
  Button
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
    console.log(".@@@", navigation);
    console.log(".@@@", navigation.state.params.schoolName);
    return {
      title: `${navigation.state.params.schoolName}`,
      headerRight: (
        <Button
          title="查询"
          color="gray"
          onPress={() => navigation.navigate("QueryCondition")}
        />
      )
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
      refreshing: false
    };
  }

  componentDidMount() {
    storage.load("homeChartData", data => {
      const params = this.props.navigation.state.params;

      console.log("homeChartData", data);
      console.log("菲欧娜...", params);

      // 按照条件查询的请求
      Connect.queryEverySubjectDataAnalysisList(params, res => {
        if (res.success === "200") {
          console.log("按条件查询返回数据", res.data, typeof res.data);
          let data = [];
          let time = [];

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
          for (let i = 0; i < data.length; i++) {
            subjectName.push(data[i].subjectName);
            content.push(data[i].content);
            creator.push(data[i].name);
            createDate.push(data[i].createDate);
          }
          this.setState({
            timeTitle: time[0],
            itemLenght: data.length,
            subjectName: subjectName,
            content: content,
            creator: creator,
            createDate: createDate
          });
        } else {
          Alert.alert("按条件查询数据失败.", response.message);
        }
      });
    });
  }

  // test 目前没有给 UI 标准, 跳转到一另一个页面进行选择条件
  _selectQuery() {
    console.log("条件查询页面🔨");
    this.props.navigation.navigate("TeacherLoginData");
  }

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
        this.setState({ refreshing: false }); // 下拉刷新
        let data = [];
        let time = [];
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
        for (let i = 0; i < data.length; i++) {
          subjectName.push(data[i].subjectName);
          content.push(data[i].content);
          creator.push(data[i].name);
          createDate.push(data[i].createDate);
        }
        this.setState({
          timeTitle: time[0],
          itemLenght: data.length,
          subjectName: subjectName,
          content: content,
          creator: creator,
          createDate: createDate
        });
      } else {
        Alert.alert("下拉刷新 -> 按条件查询数据失败.", response.message);
      }
    });
  };

  /* ==== 上拉加载 ==== */
  _pullLoading() {
    // 如果有数据正在加载
    // 如果没有就暂无更多
    console.log("上拉加载了解一下。。。🚀");

    this.setState({
      page: this.state.page++
    });
    // 路由参数
    let params = this.props.navigation.state.params;

    console.log("1", params, this.state.page);
    params.page = this.state.page;
    console.log("2", params);

    Connect.queryEverySubjectDataAnalysisList(params, res => {
      if (res.success === "200") {
        let data = [];
        let time = [];
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
        for (let i = 0; i < data.length; i++) {
          subjectName.push(data[i].subjectName);
          content.push(data[i].content);
          creator.push(data[i].name);
          createDate.push(data[i].createDate);
        }
        this.setState({
          timeTitle: time[0],
          itemLenght: data.length,
          subjectName: subjectName,
          content: content,
          creator: creator,
          createDate: createDate
        });
      } else {
        Alert.alert("上拉加载 -> 按条件查询数据失败.", response.message);
      }
    });

    // if (1) {
    //   return (
    //     <View
    //       style={{
    //         height: 44,
    //         backgroundColor: "rgb(200,200,200)",
    //         justifyContent: "center",
    //         alignItems: "center"
    //       }}
    //     >
    //       <Text>{"正在加载...."}</Text>
    //     </View>
    //   );
    // } else if (this.state.isLoreMoreing == "LoreMoreEmpty") {
    //   return (
    //     <View
    //       style={{
    //         height: 44,
    //         backgroundColor: "rgb(200,200,200)",
    //         justifyContent: "center",
    //         alignItems: "center"
    //       }}
    //     >
    //       <Text>{"暂无更多"}</Text>
    //     </View>
    //   );
    // } else {
    //   return null;
    // }

    // 获取数据 fetch 请求
  }

  _renderList = item => {
    return (
      <ScrollView>
        <View style={styles.list}>
          {Platform.OS === "android" ? (
            <TouchableNativeFeedback onPress={this._alert.bind(this, item)}>
              <View>
                {/* <View style={[styles.listItem, { justifyContent: "center" }]}> */}
                <View style={styles.listItem}>
                  <Text style={styles.itemIndex}>
                    {`科目: ` + this.state.subjectName[item.index]}
                  </Text>
                  <Text style={styles.itemIndex}>
                    {`内容: ` + this.state.content[item.index]}
                  </Text>
                  <Text style={styles.itemIndex}>
                    {`创建人: ` + this.state.creator[item.index]}
                  </Text>
                  <Text style={styles.itemIndex}>
                    {`创建日期: ` + this.state.createDate[item.index]}
                  </Text>
                </View>
                <View style={{ height: 1, backgroundColor: "gray" }} />
              </View>
            </TouchableNativeFeedback>
          ) : (
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
    // 个数根据实际情况定.
    let homeWork = [];
    for (var i = 0; i < this.state.itemLenght; i++) {
      homeWork.push({ key: i, title: i + "" });
    }

    return (
      <View style={styles.container}>
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
          onEndReachedThreshold={0.5}
          /* ---- 下拉刷新 ---- */
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
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
  }
});
