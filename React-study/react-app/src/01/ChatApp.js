import React from "react"
import withTimer from "../06/withTimer";

class MessageList extends React.PureComponent {
  render() {
    return <ul>{ this.props.messages.map(msg => <li>{msg}</li>)}</ul>;
  }
}

export class ChatApp extends React.Component {
  state = {
    messages: [],
    inputMsg: ""
  };

  handleInput = evt => {
    this.setState({
      inputMsg: evt.target.value,
    });
  };

  handleSend = () => {
    const text = this.state.inputMsg;
    if (text) {
      const newMessages = [...this.state.messages, text];
      this.setState({
        messages: newMessages,
        inputMsg: "",
      });
    }
  };
  
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <div>
          {/* 受控组件要有 value & onChange 属性, 它的状态来自外部 */}
          {/* 非受控组件, 它的状态是由内部维护的，要拿到状态需要通过其他方式拿到值, 这样的组件不需要 value & onChange, 但是要让外部要知道原生 DOM node 是什么 */}
          <input 
            value={this.state.inputMsg} 
            // 如果没有 onChange 那么组件就是非受控的; 在输入框中输入任何字符都是没有作用的(受控组件的状态来自外部)
            onChange={this.handleInput}
          />
          <button onClick={this.handleSend}> 发送 </button>
        </div>
        <h2>{this.props.time.toLocaleString()}</h2>
      </div>
    )
  }
}

export default withTimer(ChatApp);