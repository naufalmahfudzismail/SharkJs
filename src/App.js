import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SplitButton, MenuItem } from 'react-bootstrap';

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
        <div>
          <Boot/>
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

class Boot extends Component{

  state = { theme: null }
  
  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    if (theme.toLowerCase() === 'reset') { theme = null }
    this.setState({ theme });
  }
  render(){

    const { theme } = this.state;
    const themeClass = theme ? theme.toLowerCase() : 'default';
    
    const parentContainerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'table'
    };

    const subContainerStyles = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'table-cell',
      verticalAlign: 'middle'
    };
    return (
      <div style={parentContainerStyles}>
      <div style={subContainerStyles}>
      
        <span className={`h1 center-block text-center text-${theme ? themeClass : 'muted'}`} style={{ marginBottom: 25 }}>{theme || 'Default'}</span>
        
        <div className="center-block text-center">
          <SplitButton bsSize="large" bsStyle={themeClass} title={`${theme || 'Default'} Theme`}>
            <MenuItem eventKey="Primary" onSelect={this.chooseTheme}>Primary Theme</MenuItem>
            <MenuItem eventKey="Danger" onSelect={this.chooseTheme}>Danger Theme</MenuItem>
            <MenuItem eventKey="Success" onSelect={this.chooseTheme}>Success Theme</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="Reset" onSelect={this.chooseTheme}>Default Theme</MenuItem>
          </SplitButton>
        </div>
        
      </div>
    </div>
    );
  }
}

export default App;
