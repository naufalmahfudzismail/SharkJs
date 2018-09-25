import * as THREE from "three";
import React, { Component } from "react";
import Detector from "../controls/Detector";
import DragControls from "three-dragcontrols";
import OrbitControls from "three-orbit-controls";

var camera, scene, renderer, dragControls, controls;

class MoveAble extends Component {
  componentDidMount() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    const objects = [];

    this.container = document.createElement("div");
    document.body.appendChild(this.container);

    //set the camera
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(400, 200, 0);

    //set the control so you can rotating the scene
    controls = new OrbitControls(camera);
    controls.enableDamping = true; // to create an inertia effect when camera is moving. an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25; // set the factor of damping
    controls.screenSpacePanning = false;
    controls.minDistance = 100; // how far the camera will zoom out
    controls.maxDistance = 500; // how near the camera will zoom in
    controls.maxPolarAngle = Math.PI / 2;

    // Create the Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    //light effect for the mesh
    const light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x002288);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    const light3 = new THREE.AmbientLight(0x222222);
    scene.add(light3);

    // set the movable object
    const geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true
    });

    for (var i = 0; i < 500; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = Math.random() * 1600 - 800;
      mesh.position.y = Math.random() * 1600 - 800;
      mesh.position.z = Math.random() * 1600 - 800;
      scene.add(mesh);
      objects.push(mesh);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#2E2B40");
    this.container.appendChild(renderer.domElement);

    //add the drag controller so the item can be drag
    dragControls = new DragControls(objects, camera, renderer.domElement);

    dragControls.addEventListener("dragstart", function(event) {
      this.controls.enabled = false;
    }); //when start drag, stop rotate when click
    dragControls.addEventListener("dragend", function(event) {
      this.controls.enabled = true;
    }); // enable rotate click when drag event end
    //set event listener for resizing the scene

    window.addEventListener("resize", function() {
      var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    controls.update(); //only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default MoveAble;
