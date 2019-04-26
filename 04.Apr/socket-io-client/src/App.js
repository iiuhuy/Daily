import React,{ Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import socketIOClient from 'socket.io-client'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://192.168.31.52:3001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}> 
        {response
        ? <p> 
            The temperature in Florence is: {response} °F
          </p>
          
        : <p> Loading... </p>
        }
      </div>
    );
  }
}

export default App;
