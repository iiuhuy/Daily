import React, { Component } from "react";
import { StyleSheet, View, Text, Picker, Alert } from "react-native";
import Connect from "../../util/Connect";

import RNPickerSelect from "react-native-picker-select";

export default class QueryCondition extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // title: `${navigation.state.params.schoolName}`,
      title: `选择条件查询`
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      date: [],
      subject: []
    };
  }

  componentDidMount() {
    /* 请求两个接口 */
    Connect.queryConditionDate({}, res => {
      if (res.success === "200") {
        console.log(res.data);
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
        console.log(items);
      } else {
        Alert.alert("queryConditionDate 请求数据失败", response.message);
      }
    });

    const params = {
      classId: "750c5f27b2934505aef09113be4bc99f"
    };

    Connect.getSubjectByClassId(params, res => {
      if (res.success === "200") {
        console.log(res.data);
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> 使用示例 </Text>
        {/* <Picker
          selectedValue={this.state.data}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }
        >
          <Picker.Item label={this.state.date} value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker> */}
        <RNPickerSelect
          onValueChange={value => console.log(value)}
          items={this.state.date}
        />
        <RNPickerSelect
          onValueChange={value => console.log(value)}
          items={this.state.subject}
        />
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
  tip: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
    marginLeft: 10
  },
  chart: {
    height: 300,
    marginTop: 10,
    marginBottom: 40
  }
});
