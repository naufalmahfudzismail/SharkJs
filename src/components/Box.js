import React, {Component} from 'react'
import * as THREE from 'three'

class Box extends Component {
    componentDidMount() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      //const aspectRatio = this.width / this.height
      //ADD SCENE
      this.scene = new THREE.Scene();
      //ADD CAMERA
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
      this.camera.position.z = 5;
      //this.camera.aspect = aspectRatio;
      //ADD RENDERER
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setClearColor("#99ff99");
      this.renderer.setSize(width, height);
      this.camera.updateProjectionMatrix();
      this.mount.appendChild(this.renderer.domElement);
      //ADD CUBE
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
      this.start();
    }
  
    componentWillUnmount() {
      this.stop();
      this.mount.removeChild(this.renderer.domElement);
    }
    start = () => {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate);
      }
    };
    stop = () => {
      cancelAnimationFrame(this.frameId);
    };
    animate = () => {
      this.cube.rotation.x += 0.05;
      this.cube.rotation.y += 0.05;
      this.renderScene();
      this.frameId = window.requestAnimationFrame(this.animate);
    };
    renderScene = () => {
      this.renderer.render(this.scene, this.camera);
    };
    render() {
      return (
        <div class = {style.container}
          ref={mount => {
            this.mount = mount;
          }}
        />
      );
    }
  }

  const style  = {
      container :{
        
        margin : 20,
        justifyContent : "center",
        alignItems : "center",
        display : "flex"
      }
  }

  export default Box;