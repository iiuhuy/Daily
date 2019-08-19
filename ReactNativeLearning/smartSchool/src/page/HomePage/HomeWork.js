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
  FlatList
} from "react-native";
import px2dp from "../../util/px2dp";
import theme from "../../config/theme";
import Connect from "../../util/Connect";
import { storage } from "../../storage/storage.js";

// import Icon from "react-native-vector-icons/Ionicons";
// import TextButton from "../../component/TextButton";
// import Avatar from "../../component/Avatar";

export default class HomeWork extends Component {
  static navigationOptions = {
    title: "云书包实验小学"
  };

  constructor(props) {
    super(props);
    this.state = { itemLenght: null, subjectName: [], content: [], page: 1 };
  }

  componentDidMount() {
    storage.load("homeChartData", data => {
      console.log(data);

      // 查询接口参数
      const params = {
        classId: "3f5b29963a8b4aa8bcd6d3171dd8d5fc",
        queryType: "2",
        subCode: "",
        sTime: "",
        eTime: "",
        page: "3",
        pageSize: "1"
      };

      // 按照条件查询的请求
      Connect.queryEverySubjectDataAnalysisList(params, res => {
        if (res.success === "200") {
          console.log("按条件查询返回数据", res.data, typeof res.data);
          let data = [];
          let time = [];

          // 遍历对象
          obj = res.data;
          Object.keys(obj).forEach(function(key) {
            // console.log(key, obj[key]);
            // let value = [];
            data = obj[key];
            time.push(key);
          });
          // console.log(data, data.length);
          const subjectName = [];
          const content = [];
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i].subjectName);
            // console.log(data[i].content);
            subjectName.push(data[i].subjectName);
            content.push(data[i].content);
          }
          this.setState({
            timeTitle: time[0],
            itemLenght: data.length,
            subjectName: subjectName,
            content: content
          });
          // console.log("嘻..", this.state.subjectName);
          // console.log("哈..", this.state.content);
        } else {
          Alert.alert("按条件查询数据失败.", response.message);
        }
      });
    });
  }

  _alert() {
    if (Platform.OS === "android") {
      Alert.alert("乖孩子", "就要好好学习,天天向上!😀", [
        { text: "OK", onPress: () => {} }
      ]);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert("乖孩子", "就要好好学习,天天向上!😀", [
        { text: "OK", onPress: () => {} }
      ]);
    }
  }

  // 隔栏条
  // _separator = () => {
  //   return <View style={{ height: 1, backgroundColor: "gray" }} />;
  // };

  _renderList = item => {
    return (
      <ScrollView>
        <View style={styles.list}>
          {Platform.OS === "android" ? (
            <TouchableNativeFeedback onPress={this._alert.bind(this, 1)}>
              <View>
                <View style={[styles.listItem, { justifyContent: "center" }]}>
                  <Text style={{ color: "blue", fontSize: px2dp(15) }}>
                    {this.state.subjectName[item.index]} :
                    {this.state.content[item.index]}
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
                    ${this.state.subjectName[item.index]} : $
                    {this.state.content[item.index]}{" "}
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
    height: px2dp(55),
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: px2dp(5),
    paddingRight: px2dp(25),
    borderBottomColor: "#c4c4c4",
    borderBottomWidth: 1 / PixelRatio.get()
  }
});
