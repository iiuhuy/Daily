import React from "react";
import JSXBaseDemo from "./JSXBaseDemo";
import ConditionDemo from "./ConditionDemo";
import ListDemo from "./ListDemo";
import EventDemo from "./EventDemo";
import FormDemo from "./FormDemo";
import PropsDemo from "./PropsDemo";
import StateDemo from "./StateDemo";
import StateDemo1 from "./StateDemo1";

class BaseUseDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const titleStyle = { color: "pink" };

    return (
      <div>
        <h4 style={titleStyle}>JSXBaseDemo</h4>
        <JSXBaseDemo />

        <h4 style={titleStyle}>ConditionDemo</h4>
        <ConditionDemo />

        <h4 style={titleStyle}>ListDemo</h4>
        <ListDemo />

        <h4 style={titleStyle}>EventDemo</h4>
        <EventDemo />

        <h4 style={titleStyle}>FormDemo</h4>
        <FormDemo />

        <h4 style={titleStyle}>PropsDemo</h4>
        <PropsDemo />

        <h4 style={titleStyle}>StateDemo</h4>
        <StateDemo />

        <h4 style={titleStyle}>StateDemo1</h4>
        <StateDemo1 />
      </div>
    );
  }
}

export default BaseUseDemo;

// React 组件生命周期图示
// http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
