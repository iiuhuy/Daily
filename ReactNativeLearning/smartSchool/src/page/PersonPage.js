import React from "react";
import PropTypes from "prop-types";

import ReactNative, {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ListView,
  Image,
  PixelRatio
} from "react-native";
import px2dp from "../util/px2dp";
import theme from "../config/theme";
// import NavigationBar from "../component/SimpleNavigationBar";
// import PageComponent from "./BackPageComponent";

export default class IndividualPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          title="个人主页"
          backOnPress={this._handleBack.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
