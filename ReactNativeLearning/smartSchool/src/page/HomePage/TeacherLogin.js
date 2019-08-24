import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView
} from "react-native";
import WebChart from "../../component/WebChart/index";
import theme from "../../config/theme";
import Connect from "../../util/Connect";
import px2dp from "../../util/px2dp";
import { storage } from "../../storage/storage.js";

export default class TeacherLogin extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log(".???", navigation);
    console.log(".???", navigation.state.params.schoolName);
    return {
      // title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      title: `${navigation.state.params.schoolName}`
    };
    // title: "云书包实验小学";
  };

  constructor(props) {
    super(props);
    this.state = {
      schoolName: "schoolName",
      teacherLoginData: "",
      itemLenght: null,
      gradeCode: [],
      gradeName: [], // 年级名字, title
      classData: [], // y 每个班级的显示的数据
      className: [], // x 班级名字的数据,
      allGradeClassId: [], // 整个年级的 classId,
      queryType: "", // queryType 应该从首页过来是统一的,
      hint: [] // button 提示作用
    };
  }

  // 在页面渲染前调用
  componentDidMount() {
    storage.load("homeChartData", data => {
      this.setState({
        teacherLoginData: data.teacherLoginCountlist
      });

      // console.log(this.props.navigation.state.params);
      // 查询接口参数，如果需要存储到 storage 里面, 简易 JSON 序列化
      let params = this.props.navigation.state.params;
      // console.log("辣鸡接口",params);

      // 按照条件查询的请求
      Connect.queryEveryGradeDataAnalysisByConditions(params, res => {
        if (res.success === "200") {
          // 这里会展示条件返回全部的数据
          console.log("按条件查询返回数据", res.data, typeof res.data);
          const showGradeCode = [];
          const showGradeName = []; // 年级名字
          const showClassName = []; // x 轴显示的名字
          const showClassData = []; // y 轴班级的数据
          const showallGradeClassId = []; // 整个年级的 classId

          for (let i = 0; i < res.data.length; i++) {
            const gradeCode = res.data[i].gradeCode;
            const gradeName = res.data[i].gradeName;
            showGradeCode.push(gradeCode);
            showGradeName.push(gradeName);

            let resClassName = []; // 班级名字
            let resClassData = []; // 各个班级的人数
            const everGradeClassId = []; // 拿到每个年级的 classId

            // 遍历每个年级的班级名字 和 人数
            const count = res.data[i].dataAnalysisVos.length;
            for (let j = 0; j < count; j++) {
              const everClass = res.data[i].dataAnalysisVos;

              const name = everClass[j].className;
              resClassName.push(name); // 整个年级的班级名字

              const data = everClass[j].count;
              resClassData.push(data);
              const clazzVo = {
                classId: res.data[i].dataAnalysisVos[j].classId,
                className: name
              };
              everGradeClassId.push(clazzVo);
            }

            showClassName.push(resClassName);
            showClassData.push(resClassData);
            showallGradeClassId.push(everGradeClassId);
          }

          // let grade = [];
          // storage.save("allGradeClassId", showallGradeClassId);

          this.setState({
            itemLenght: res.data.length, // 图形 Item 的个数, 根据返回长度来判断.
            gradeName: showGradeName,
            gradeCode: showGradeCode,
            className: showClassName,
            classData: showClassData,
            allGradeClassId: showallGradeClassId,
            schoolName: params.schoolName,
            schoolId: params.schoolId,
            queryType: params.queryType,
            hint: params.hint
          });
          // console.log("年级数组", this.state.className, this.state.classData);
        } else {
          Alert.alert("按条件查询数据失败.", response.message);
        }
      });
    });
  }

  // 分隔栏
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: "gray" }} />;
  };

  // 页面跳转 -> 向下一个页面传递参数
  _jumpClassPage(item) {
    // 判断 queryType 是否为 4 => 即 老师登录页面
    // console.log(this.state.allGradeClassId, this.state.allGradeClassId.length);
    let params = {};

    console.log(this.state.queryType);

    if (this.state.queryType === "4") {
      console.log("当前的是老师登录页面.......................");

      params.schoolName = this.state.schoolName;
      params.queryType = this.state.queryType;
      params.schoolId = this.state.schoolId;
      params.gradeCode = this.state.gradeCode[item];
      params.pageSize = "1"; // pageSize 表示几天的数据
      params.page = "1";

      console.log(
        "👅向下一页(queryEverySubjectDataAnalysisByClazz)传递的参数",
        params
      );

      this.props.navigation.navigate("HomeWork", params);
    } else {
      console.log("羊来...", this.state.allGradeClassId[item]);
      const classId = this.state.allGradeClassId[item];
      params.schoolName = this.state.schoolName;
      params.schoolId = this.state.schoolId;
      params.clazzS = classId;
      params.queryType = this.state.queryType;
      params.hint = this.state.hint;

      console.log("向下一页(ClassDataPage)传递的参数", params);
      this.props.navigation.navigate("ClassDataPage", params);
    }
  }

  // 渲染的条目
  _renderItem = item => {
    // ------------- test --------------- //

    // ------------- test --------------- //
    const option = {
      // title: {
      //   text: this.state.gradeName[item.index],
      //   x: "center"
      // },
      tooltip: {},
      xAxis: {
        // x 轴坐标显示名字
        data: this.state.className[item.index]
      },
      yAxis: {},
      series: [
        {
          name: "人数",
          type: "bar",
          data: this.state.classData[item.index]
        }
      ]
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {this.state.gradeName[item.index]} </Text>
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
        {/* <View style={{ height: px2dp(15) }}>
          <Text style={{ color: "blue", fontSize: px2dp(15) }} />
        </View> */}
        <View style={styles.btn}>
          <Button
            title={`显示 ${this.state.gradeName[item.index]} ${
              this.state.hint[parseInt(this.state.queryType) - 1]
            }详情数据`}
            onPress={this._jumpClassPage.bind(this, item.index)}
          />
        </View>
      </View>
    );
  };

  render() {
    // 图型的个数,取决于来自后台请求的字段.
    var chatItem = [];
    // 长度 itemLenght -> 柱状图个数
    console.log("柱状图的个数: ", this.state.itemLenght);
    for (var i = 0; i < this.state.itemLenght; i++) {
      chatItem.push({ key: i, title: i + "" });
    }

    return (
      <View>
        <FlatList
          data={chatItem}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._separator}
          // keyExtractor 作为每个 item 的标识
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  title: {
    textAlign: "center",
    height: 20,
    fontSize: 14,
    color: "#333333",
    top: 5
  },
  chart: {
    height: 300,
    marginTop: 5,
    marginBottom: 5
  },
  btn: {
    flex: 1,
    justifyContent: "center"
  },
  tip: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
    marginLeft: 10
  }
});
