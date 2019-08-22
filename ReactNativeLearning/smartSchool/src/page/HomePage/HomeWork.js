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
    this.state = {
      itemLenght: null, // 列表长度
      page: 1, // 页数
      subjectName: [], //科目
      content: [], // 内容
      createDate: [], // 创建时间
      creator: [] // 创建人
    };
  }

  componentDidMount() {
    storage.load("homeChartData", data => {
      const params = this.props.navigation.state.params;

      console.log("homeChartData", data);
      console.log("菲欧娜满血复活...", params);

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
          // console.log("嘻..", this.state.subjectName);
          // console.log("哈..", this.state.content);
        } else {
          Alert.alert("按条件查询数据失败.", response.message);
        }
      });
    });
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
