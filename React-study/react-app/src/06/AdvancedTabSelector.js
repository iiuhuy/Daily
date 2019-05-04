import React, { PureComponent } from "react"
import PropTypes from "prop-types"

export default class AdvancedTabSelector extends PureComponent {
  static propTypes = {
    value: PropTypes.object,
    options: PropTypes.array,
    onChange: PropTypes.func,
    // 多了一个 children 的属性
    children: PropTypes.func
  };

  static defaultProps = {
    value: null,
    options: [],
    onChange: () => {},
    children: () => {}
  };

  render() {
    
  }
}