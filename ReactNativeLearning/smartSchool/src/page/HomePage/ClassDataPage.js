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

export default class ClassDataPage extends Component {
  static navigationOptions = {
    title: "云书包实验小学"
  };

  constructor(props) {
    super(props);
    this.state = {
      itemLenght: null,
      classIds: null,
      subjects: null,
      subjectCount: null,
      title: [],
      graphic: [] // 没有数据的情况下默认暂时
    };
  }

  // 在页面渲染前调用
  componentDidMount() {
    // ----------------- test -------------------- //
    const graphicData = [
      {
        type: "image",
        id: "logo",
        right: 20,
        top: 20,
        z: -10,
        bounding: "raw",
        origin: [75, 75],
        style: {
          image: "http://echarts.baidu.com/images/favicon.png",
          width: 150,
          height: 150,
          opacity: 0.4
        }
      }
      // {
      //     type: 'group',
      //     rotation: Math.PI / 4,
      //     bounding: 'raw',
      //     right: 110,
      //     bottom: 110,
      //     z: 100,
      //     children: [
      //         {
      //             type: 'rect',
      //             left: 'center',
      //             top: 'center',
      //             z: 100,
      //             shape: {
      //                 width: 400,
      //                 height: 50
      //             },
      //             style: {
      //                 fill: 'rgba(0,0,0,0.3)'
      //             }
      //         },
      //         {
      //             type: 'text',
      //             left: 'center',
      //             top: 'center',
      //             z: 100,
      //             style: {
      //                 fill: '#fff',
      //                 text: 'ECHARTS BAR CHART',
      //                 font: 'bold 26px Microsoft YaHei'
      //             }
      //         }
      //     ]
      // },
      // {
      //     type: 'group',
      //     left: '10%',
      //     top: 'center',
      //     children: [
      //         {
      //             type: 'rect',
      //             z: 100,
      //             left: 'center',
      //             top: 'middle',
      //             shape: {
      //                 width: 190,
      //                 height: 90
      //             },
      //             style: {
      //                 fill: '#fff',
      //                 stroke: '#555',
      //                 lineWidth: 2,
      //                 shadowBlur: 8,
      //                 shadowOffsetX: 3,
      //                 shadowOffsetY: 3,
      //                 shadowColor: 'rgba(0,0,0,0.3)'
      //             }
      //         },
      //         {
      //             type: 'text',
      //             z: 100,
      //             left: 'center',
      //             top: 'middle',
      //             style: {
      //                 fill: '#333',
      //                 text: [
      //                     '横轴表示温度，单位是°C',
      //                     '纵轴表示高度，单位是km',
      //                     '右上角有一个图片做的水印',
      //                     '这个文本块可以放在图中各',
      //                     '种位置'
      //                 ].join('\n'),
      //                 font: '14px Microsoft YaHei'
      //             }
      //         }
      //     ]
      // }
    ];
    // ----------------- test -------------------- //

    // 取首页数据
    storage.load("homeChartData", value => {
      this.setState({ title: null });
    });

    console.log(this.props.navigation.state.params);
    const params = this.props.navigation.state.params;
    console.log(params);

    Connect.queryEverySubjectDataAnalysisByClazz(params, res => {
      if (res.success === "200") {
        console.log("各个班科目📕返回数据", res.data, typeof res.data);
        const showClassName = []; // 班级
        const showSubjects = []; // x 轴
        const showSubjectCount = []; // y 轴

        for (let i = 0; i < res.data.length; i++) {
          const className = res.data[i].className;
          showClassName.push(className);

          let Subjects = [];
          let SubjectCount = [];
          let analysData = res.data[i].dataAnalysisVos;
          // console.log("OwO", analysData, analysData.length);

          // 遍历每个年级的班级名字 和 人数
          let count = analysData.length;
          // console.log("count", count);

          // if (count === 0) {
          //   console.log("aaaaaaa");
          //   console.log(this.state.graphic);

          //   this.setState({ graphic: graphicData });
          //   // return;
          // }
          console.log("count1", count);

          for (let j = 0; j < count; j++) {
            console.log("count2", count);

            // if (count === 0) {
            //   // 如果为空, 默认加上么有数据的 logo
            //   console.log("aaaaaaa");
            //   console.log(this.state.graphic);

            //   this.setState({ graphic: graphicData });
            //   // return;
            // } else {
            const name = analysData[j].subjectName;
            Subjects.push(name);

            const count = analysData[j].count;
            SubjectCount.push(count);
            // }
          }
          showSubjects.push(Subjects);
          showSubjectCount.push(SubjectCount);
        }

        this.setState({
          itemLenght: res.data.length, // 图形 Item 的个数, 根据返回长度来判断.
          title: showClassName,
          subjects: showSubjects,
          subjectCount: showSubjectCount
        });
      } else {
        Alert.alert("按条件查询数据失败.", response.message);
      }
    });
  }

  // 分隔栏
  _separator = () => {
    return <View style={{ height: 2, backgroundColor: "gray" }} />;
  };

  // 页面跳转
  // _jumpHomeWorkPage = () => {
  //   this.props.navigation.navigate("HomeWork");
  // };
  _jumpHomeWorkPage(item) {
    console.log(item);
    this.props.navigation.navigate("HomeWork");
  }

  // 渲染的条目
  _renderItem = item => {
    // ------------- test --------------- //

    // ------------- test --------------- //

    const option = {
      title: {
        text: this.state.title[item.index],
        // text: title,
        x: "center"
      },
      tooltip: {},
      xAxis: {
        // x 轴坐标显示名字
        data: this.state.subjects[item.index]
        // data: data1
      },
      yAxis: {},
      graphic: this.state.graphic,
      series: [
        {
          name: "人数",
          type: "bar",
          data: this.state.subjectCount[item.index]
          // data: data2
        }
      ]
    };
    return (
      <View>
        <ScrollView>
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
          />
          <View style={{ height: px2dp(15) }}>
            <Text style={{ color: "blue", fontSize: px2dp(15) }} />
          </View>
          <View style={styles.container}>
            {/* <Button title="显示详情数据" onPress={this._jumpHomeWorkPage} /> */}
            <Button
              title="显示详情数据"
              onPress={this._jumpHomeWorkPage.bind(this, item.index)}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  render() {
    // 图型的个数,取决于来自后台请求的字段.
    var chatItem = [];
    // 长度 itemLenght -> 柱状图个数
    console.log("柱状图个数: ", this.state.itemLenght);
    for (var i = 0; i < this.state.itemLenght; i++) {
      chatItem.push({ key: i, title: i + "" });
    }

    return (
      <View>
        <FlatList
          data={chatItem}
          renderItem={this._renderItem}
          // renderItem={({ index }) => (
          //   <Text
          //     style={{
          //       textAlign: "center",
          //       width: "100%",
          //       height: 100
          //     }}
          //   >
          //     Settings - {index}
          //   </Text>
          // )}
          ItemSeparatorComponent={this._separator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center"
  },
  charts: {
    width: "100%",
    padding: 10,
    // height: "20%",
    // backgroundColor: "gray",
    borderBottomColor: "#D3D3D3"
  },
  txt: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 30
  },

  // test echarts demo
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#111c4e"
  },
  title: {
    fontSize: 20,
    color: "#fff",
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
