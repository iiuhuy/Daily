import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView
} from "react-native";
import Connect from "../../util/Connect";
import RNPickerSelect from "react-native-picker-select";

export default class QueryCondition extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    return {
      // title: `${navigation.state.params.schoolName}`,
      title: `条件查询`
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      date: [],
      subject: [],
      setDate: null,
      setSubject: null
    };
  }

  /* 请求两个接口 */
  componentDidMount() {
    const recive = this.props.navigation.state.params;
    console.log("面对疾风吧, 锐雯.", recive);

    // 查询日期
    Connect.queryConditionDate({}, res => {
      if (res.success === "200") {
        const items = [];
        for (let i = 0; i < res.data.length; i++) {
          const obj = {};
          obj.label = res.data[i] + `月`;
          obj.value = res.data[i];
          items.push(obj);
        }
        this.setState({
          date: items
        });
      } else {
        Alert.alert("queryConditionDate 请求数据失败", response.message);
      }
    });

    // 查询科目
    const params = { classId: recive.classId };

    Connect.getSubjectByClassId(params, res => {
      if (res.success === "200") {
        console.log("返回的科目", res.data, res.data.length);
        const items = [];
        for (let i = 0; i < res.data.length; i++) {
          const obj = {};
          obj.label = res.data[i].subName;
          obj.value = res.data[i].subCode;
          items.push(obj);
        }
        this.setState({
          subject: items
        });
      }
    });

    // ---------- test ------------- //

    // this.state({ id: this.props.id });
    // console.log("传递过来的 id test 参数", this.state.id);
    // ---------- test ------------- //
  }

  _goBack() {
    const { navigate, goBack, state } = this.props.navigation;
    state.params.refresh(this.state.boom);
    this.props.navigation.goBack();
  }

  // 点击返回
  _returnListPage() {
    const params = {};
    // 路由参数
    // const recive = this.props.navigation.state.params;
    const { recive } = this.props.navigation.state;

    params.classId = recive.classId;
    params.page = "1";
    params.pageSize = "1";
    params.queryType = recive.queryType;
    params.monthTime = this.state.setDate;
    params.subCode = this.state.setSubject;
    // console.log("...0", params);
    this.props.navigation.navigate("HomeWork", params);
  }

  render() {
    const subject = {
      label: "请选择一条科目",
      value: null,
      color: "#9EA0A4"
    };
    const date = {
      label: "请选择查询日期",
      value: null,
      color: "#9EA0A4"
    };

    // const item = [];
    // const test = [
    //   "2019-2",
    //   "2019-3",
    //   "2019-4",
    //   "2019-5",
    //   "2019-6",
    //   "2019-7",
    //   "2019-8",
    //   "2019-9",
    //   "2019-10",
    //   "2019-11",
    //   "2019-12",
    //   "2019-13",
    //   "2019-14",
    //   "2019-15"
    // ];
    // for (let i = 0; i < test.length; i++) {
    //   const o = {};
    //   o.label = test[i];
    //   o.value = test[i];
    //   item.push(o);
    // }
    // console.log(item);

    return (
      <View style={styles.container}>
        {/* <ScrollView> */}
        <Text style={styles.title}> 选择科目 </Text>
        <RNPickerSelect
          placeholder={subject}
          items={this.state.subject}
          onValueChange={value => {
            console.log(value);
            this.setState({
              setSubject: value
            });
          }}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            height: 30
          }}
        />
        <Text style={styles.title}> 选择时间 </Text>
        <RNPickerSelect
          placeholder={date}
          items={this.state.date}
          // items={item}
          onValueChange={value => {
            console.log(value);
            this.setState({
              setDate: value
            });
          }}
          style={styles.test}
        />
        {/* </ScrollView> */}
        <View style={styles.btn}>
          <Button
            style={{
              borderColor: "#ccc",
              right: 20
            }}
            title={"点击查询"}
            // onPress={this._returnListPage.bind(this)}
            onPress={this._goBack.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    color: "gray",
    marginLeft: 10
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  test: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
