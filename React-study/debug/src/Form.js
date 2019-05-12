import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    
    this.initialState = {
      name: '',
      job: ''
    };

    // 将一些空属性的对象赋值给 state
    this.state = this.initialState;
  }

  // 每次在表单中更新字段的时候更新 From 的 state
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
        [name] : value
    });
  }

  // 提交表单
  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {
    const { name, job } = this.state; 

    return (
      // 表单提交
      <form onSubmit={this.onFormSubmit}>
        <label>名字</label>
        <input 
          type="text" 
          name="name" 
          value={name} 
          onChange={this.handleChange} />
        <label>工作</label>
        <input 
          type="text" 
          name="job" 
          value={job} 
          onChange={this.handleChange} />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
