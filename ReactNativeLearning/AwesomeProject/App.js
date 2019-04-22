/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Image } from 'react-native';
// 样式
// import { }

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

// 在 Greeting 组件中将 name 作为一个属性来定制 
class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name} !</Text>
      </View>
    );
  }
}

// statue 使用
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };

    // 每 1000ms 对 showText 状态做一次取反操作
    setInterval(() => {
      // state 的修改必须通过 setState 方法
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText};
      });
    }, 1000); 
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    if (!this.state.isShowingText) {
      return null;
    }

    return (
      <Text>{this.props.text}</Text>
    );
  }
}

// export default class LotsOfGreetings extends Component {
//   render() {
//     return (
//       <View style={{alignItems: 'center'}}>
//         <Greeting name='余辉'/>
//         <Greeting name='哈哈哈'/>
//         <Greeting name='嘿嘿嘿'/>
//       </View>
//     );
//   }
// }

export default class App extends Component<Props> {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }
    return (
      // <View style={styles.container}> 
      <View style={{flex: 1}}> 
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue'}}>
          <Image source={pic} style={{width: 193, height: 110}} />
        </View>
        <View style={{flex: 3, backgroundColor: 'steelblue'}}>
          {/* 使用定时器不停调用 setState，每隔 1s 就重新渲染 */}
          <Blink text='I love to blink' />
          <Blink text='Yes blinking is so great' />
          <Blink text='Why did they ever take this out of HTML' />
          <Blink text='Look at me look at me look at me' />
        </View>

        <View style={styles.container}> 
          {/* <Text style={styles.welcome}>Welcome to React Native!</Text> */}
          {/* <Text style={styles.instructions}>To get started, edit App.js</Text> */}
          {/* <Text style={styles.instructions}>{instructions}</Text> */}
          {/* 使用 props 传递参数， {pic} 这样的形式，括号内部为一个 js 变量或表达式 */}
          <Greeting name='余辉'/>
          <Greeting name='哈哈哈'/>
          <Greeting name='嘿嘿嘿'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
