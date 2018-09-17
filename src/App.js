import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
       data: 
       [
          {
             "id": 1,
             "name":"Foo",
             "age":"20"
          },
          {
             "id":2,
             "name":"Bar",
             "age":"30"
          },
          {
             "id":3,
             "name":"Baz",
             "age":"40"
          }
       ]
    }
 }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
        <table>
               <tbody>
                  {this.state.data.map((person, i) => <Mage key = {i} 
                     data = {person} />)}
               </tbody>
            </table>
        </div>
      </div>
    );
  }
}

class Mage extends Component{
  render(){
    return (
      <div className="App">
        <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.age}</td>
         </tr>
      </div>
    );
  }
}

export default App;
