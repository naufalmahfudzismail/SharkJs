import React, { Component } from 'react';
import './App.css';
import { SplitButton, MenuItem } from 'react-bootstrap';
import * as THREE from 'three';

class App extends Component {
  render() {
    return (
      <div>
        <div >
          <Boot/>
        </div>
        <div >
          <Threejs/>
        </div>
        <div >
          <Grid/>
        </div>
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

class Threejs extends Component {
      componentDidMount(){
        
          const width = window.innerWidth
          const height = window.innerHeight
          //const aspectRatio = this.width / this.height
          //ADD SCENE
          this.scene = new THREE.Scene()
          //ADD CAMERA
          this.camera = new THREE.PerspectiveCamera(
            50, width / height, 1, 1000
          )
          this.camera.position.z = 5
          //this.camera.aspect = aspectRatio;
          //ADD RENDERER
          this.renderer = new THREE.WebGLRenderer( { antialias : true} )
          this.renderer.setClearColor('#000000')
          this.renderer.setSize(width, height)
          this.camera.updateProjectionMatrix();
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
        this.cube.rotation.x += 0.05
        this.cube.rotation.y += 0.05
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
      }
      renderScene = () => {
        this.renderer.render(this.scene, this.camera)
      }
        render(){
            return(
              <div
                ref={(mount) => { this.mount = mount }}
              ></div>
            );
          }
    }

    class Grid extends Component{

      componentDidMount(){

        
        const spherical = new THREE.Spherical()
        const rotationMatrix = new THREE.Matrix4()
       
        const geometry = new THREE.ConeBufferGeometry( 0.1, 0.5, 8 )
        const material = new THREE.MeshNormalMaterial()
        const target = this.target;
     

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 )
        this.camera.position.z = 5
        //

        this.scene = new THREE.Scene()
        //
        geometry.rotateX(Math.PI* 5)

        this.Mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.Mesh)

        //

        const targetGeometry = new THREE.SphereBufferGeometry( 0.05)
        const targetMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
        this.target = new THREE.Mesh( targetGeometry, targetMaterial )
			  this.scene.add( target )

        //

        const sphereGeometry = new THREE.SphereBufferGeometry( 2, 32, 32 )
			  const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true, transparent: true, opacity: 0.3 } );
			  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )
        this.scene.add( sphere )
        
        //

        this.renderer = new THREE.WebGLRenderer( { antialias: true } )
			  this.renderer.setPixelRatio( window.devicePixelRatio )
			  this.renderer.setSize( window.innerWidth, window.innerHeight )
        this.mount.appendChild( this.renderer.domElement )

        this.animate();
        
      }

      animate = () => {
        const speed  = 2;
        const clock = new THREE.Clock();
        const targetRotation = new THREE.Quaternion()

        requestAnimationFrame( this.animate );
        const delta = clock.getDelta();

        if ( ! this.Mesh.quaternion.equals( targetRotation ) ) {
          const step = speed * delta;
          this.Mesh.quaternion.rotateTowards( this.targetRotation, step );
        }
        this.renderer.render( this.scene, this.camera );
      }

      onResize = () =>{

        this.camera.aspect = window.innerWidth / window.innerHeight;
		  	this.camera.updateProjectionMatrix();
			  this.renderer.setSize( window.innerWidth, window.innerHeight );
      }

      generateTarget = () => {
        // generate a random point on a sphere
        this.spherical.theta = Math.random() * Math.PI * 2;
        this.spherical.phi = Math.acos( ( 2 * Math.random() ) - 1 );
        this.spherical.radius = 2;
        this.target.position.setFromSpherical( this.spherical );
        // compute target rotation
        this.rotationMatrix.lookAt( this.target.position, this.Mesh.position, this.Mesh.up );
        this.targetRotation.setFromRotationMatrix( this.rotationMatrix );
        this.setTimeout( this.generateTarget, 2000 );
      }
      
      render(){
        return (
          <div
          ref={(mount) => { this.mount = mount }}
        ></div>
        );
      }
    }

export default App;
