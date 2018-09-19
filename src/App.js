import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SplitButton, MenuItem } from 'react-bootstrap';
import * as THREE from 'three';

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
        <div className="center-block text-center">
          <Threejs/>
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

class Threejs extends Component{

      componentDidMount(){
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
          75,
          width / height,
          0.1,
          1000
        )
        this.camera.position.z = 4
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#000000')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        //ADD CUBE
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)
    this.start()
      }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
      }
    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }
    stop = () => {
        cancelAnimationFrame(this.frameId)
      }
    animate = () => {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
    }
    renderScene = () => {
      this.renderer.render(this.scene, this.camera)
    }
    render(){
        return(
          <div
            style={{ width: '800px', height: '800px' }}
            ref={(mount) => { this.mount = mount }}
          ></div>
        );
      }
    }

export default App;
