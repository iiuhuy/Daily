import React, { Component } from 'react';
import Table from './Table'
import Form from './Form'
import './index.css';

class App extends Component {
  state = {
    characters: [
      {
        'name': 'Charlie',
        'job': 'Janitor'
      },
      {
        'name': 'Mac',
        'job': 'Bouncer'
      },
      {
        'name': 'Dee',
        'job': 'Aspring actress'
      },
      {
        'name': 'Dennis',
        'job': 'Bartender'
      }
    ]
  };

  removeCharacter = index => {
    const { characters } = this.state;
 
    this.setState({
      characters: characters.filter((character, i) => { 
          return i !== index;
      })
    });
  }

  // 使用现有的 this.state.characters ES6 扩展运算符添加新的 character 参数来更新 state
  handleSubmit = character => {
    this.setState({characters: [...this.state.characters, character]});
  }
  // removeCharacter = index => {
  //   // 通过 state 进行访问
  //   const { characters } = this.state;

  //   this.setState({
  //     // filter 不会改变原来的数组，而是新建一个新的数组
  //     characters: characters.filter((character, i) => {
  //       return i !== index;
  //     })
  //   })
  // }

  render() {
    const { characters } = this.state;

    // const characters = [
    //   {
    //       'name': 'Charlie',
    //       'job': 'Janitor'
    //   },
    //   {
    //       'name': 'Mac',
    //       'job': 'Bouncer'
    //   },
    //   {
    //       'name': 'Dee',
    //       'job': 'Aspring actress'
    //   },
    //   {
    //       'name': 'Dennis',
    //       'job': 'Bartender'
    //   }
    // ];


    return (
      <div className="container">
        <Table 
          characterData={ characters }
          removeCharacter={this.removeCharacter} 
        />
        <h3>Add New</h3>
        <Form handleSubmit={this.handleSubmit} />
        {/* <Form/> */}
      </div>
    );
  }
}

export default App;