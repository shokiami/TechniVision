import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import {Camera} from 'expo-camera';
import {cameraWithTensors, bundleResourceIO} from '@tensorflow/tfjs-react-native';
import * as posenet from '@tensorflow-models/posenet';
import Skeleton from './Skeleton';
import styles from './Styles';

var TensorCamera;
var model;

export default class Posenet extends Component {
  state = {
    loaded: false,
    permission: false,
    type: Camera.Constants.Type.front,
    pose: null
  }
  
  async componentDidMount() {
    //Set up functions
    this.mounted = true;
    this.handleCameraStream = this.handleCameraStream.bind(this);
    //Ask for camera permission
    const permission = await Camera.requestPermissionsAsync();
    this.setState({permission: (permission.status == 'granted')});
    //Load TensorFlow and PoseNet
    await tf.ready();
    TensorCamera = cameraWithTensors(Camera);
    console.log("Begining to load model");
    model = await tf.loadGraphModel(bundleResourceIO(require('./openpose/structure.json'), require('./openpose/weights.bin')));
    console.log("Finished loading model");
    // model = await posenet.load({
    //   architecture: 'MobileNetV1',
    //   outputStride: 16,
    //   inputResolution: {width: 320, height: 568},
    //   multiplier: 0.5
    // });
    this.setState({loaded: true});
  }
  
  async componentWillUnmount() {
    console.log("unmounting");
    this.mounted = false;
  }
  
  handleCameraStream(images) {
    var loop = async () => {
      const nextImageTensor = images.next().value;
      if (this.mounted) {
        //Apply posenet to nextImageTensor
        let cameraFlip;
        if (Platform.OS === 'ios') {
          cameraFlip = false;
        } else {
          cameraFlip = true;
        }
        var data = tf.div(tf.stack([nextImageTensor.slice([0,0,0],[16,16,1]),nextImageTensor.slice([0,0,1],[16,16,1]),nextImageTensor.slice([0,0,2],[16,16,1])]).squeeze().expandDims().asType('float32'),255.0);
        console.log(data);
        let pose = model.predict(data);
        
        //let pose = await model.estimateSinglePose(nextImageTensor, {flipHorizontal: cameraFlip});
        //this.setState({pose: pose});
        requestAnimationFrame(loop); //.bind(this);
      }
    }
    loop();
  }

  render() {
    let textureDims;
    if (Platform.OS === 'ios') {
      textureDims = {height: 1920, width: 1080};
    } else {
      textureDims = {height: 1200, width: 1600};
    }
    if (!this.state.permission) {
      return (
        <View style={styles.text}>
          <Text>Camera permission denied...</Text>
        </View>
      );
    } else if (!this.state.loaded) {
      return (
        <View style={styles.text}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TensorCamera
            style={styles.camera}
            type={this.state.type}
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={16}
            resizeWidth={16}
            resizeDepth={3}
            onReady={this.handleCameraStream}
            autorender={true}
          />
          <Skeleton pose={this.state.pose}/>
        </View>
      );
    }
  }
};
