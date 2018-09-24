import React, { Component } from 'react';
import * as THREE from 'three';


class Grid extends Component {
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

  export default Grid;