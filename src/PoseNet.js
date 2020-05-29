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
const xsize = 160;
const ysize = 160;

export default class Posenet extends Component {
  state = {
    loaded: false,
    permission: false,
    type: Camera.Constants.Type.front,
    pose: null
  }

  async componentDidMount() {
    //On opening
    this.mounted = true;
    this.handleCameraStream = this.handleCameraStream.bind(this);
    //Ask for camera permission
    const permission = await Camera.requestPermissionsAsync();
    this.setState({permission: (permission.status == 'granted')});
    //Load TensorFlow and PoseNet
    await tf.ready();
    TensorCamera = cameraWithTensors(Camera);
    model = await tf.loadGraphModel(bundleResourceIO(require('./openpose/structure.json'), require('./openpose/weights.bin')));
    this.setState({loaded: true});
  }

  async componentWillUnmount() {
    //On closing
    this.mounted = false;
  }

  handleCameraStream(images) {
    var loop = async () => {
      if (this.mounted) {
        //Get tensor for current frame
        const nextImageTensor = images.next().value;
        //Convert nextImageTensor into shape required by openpose
        const r = nextImageTensor.slice([0,0,0],[xsize,ysize,1]);
        const g = nextImageTensor.slice([0,0,1],[xsize,ysize,1]);
        const b = nextImageTensor.slice([0,0,2],[xsize,ysize,1]);
        var data = tf.div(tf.stack([b,g,r]).squeeze().expandDims().asType('float32'), 255.0);
        //Run openpose on data
        const output = model.predict(data);
        //Keypoint names
        const names = [
          "nose", "neck", "left_shoulder", "left_elbow", "left_wrist", "right_shoulder", "right_elbow", "right_wrist",
          "center_waist", "left_waist", "left_knee", "left_ankle", "right_waist", "right_knee", "right_ankle",
          "left_eye", "right_eye", "left_ear", "right_ear",
          "right_toe", "right_midfoot", "right_heel", "left_toe", "left_midfoot", "left_heel"
        ];
        var pose = {};
        for (let keypoint = 0; keypoint < names.length; keypoint ++) {
          var layer = await output.slice([0,keypoint,0,0], [1,1,xsize/8, ysize/8]).squeeze().array();
          var max_confidence = 0;
          var x = 0;
          var y = 0;
          for (let i = 0; i < xsize/8; i ++) {
            for (let j = 0; j < ysize/8; j ++) {
              if (layer[i][j] > max_confidence) {
                x = i;
                y = j;
                max_confidence = layer[i][j];
              }
            }
          }
          pose[names[keypoint]] = {"confidence": max_confidence, "x": 5 * x, "y": 5 * y};
        }
        console.log(pose);
        this.setState({pose: pose});
        requestAnimationFrame(loop);
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
            resizeHeight={ysize}
            resizeWidth={xsize}
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
