import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import {Camera} from 'expo-camera';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';

const TensorCamera = cameraWithTensors(Camera);

export default class App extends Component {
  state = {
    loadedTensorFlow: false,
    cameraPermissions: false,
    type: Camera.Constants.Type.front
  };

  async componentDidMount() {
    await this.getCameraPermission();
    await this.loadTensorFlow();
  }

  async getCameraPermission() {
    const permission = await Camera.requestPermissionsAsync();
    this.setState({cameraPermissions: (permission.status == 'granted')});
  };

  async loadTensorFlow() {
    await tf.ready();
    this.setState({loadedTensorFlow: true});
  };

  handleCameraStream(images, updatePreview, gl) {
    const loop = async () => {
      const nextImageTensor = images.next().value
      console.log(nextImageTensor);
      //
      // do something with tensor here
      //

      // if autorender is false you need the following two lines.
      // updatePreview();
      // gl.endFrameEXP();

      requestAnimationFrame(loop);
    }
    loop();
  }

  render() {
    let textureDims;
    if (Platform.OS === 'ios') {
      textureDims = {
        height: 1920,
        width: 1080,
      };
    } else {
      textureDims = {
        height: 1200,
        width: 1600,
      };
    }
    if (!this.state.loadedTensorFlow) {
      return (
        <View>
          <Text>Loading TensorFlow...</Text>
        </View>
      );
    } else if (!this.state.cameraPermissions) {
      return (
        <View>
          <Text>Camera Permission Denied.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TensorCamera
            // Standard Camera props
            style={styles.preview}
            type={this.state.type}
            // Tensor related props
            cameraTextureHeight={textureDims.height}
            cameraTextureWidth={textureDims.width}
            resizeHeight={200}
            resizeWidth={152}
            resizeDepth={3}
            onReady={this.handleCameraStream}
            autorender={true}
          />
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  preview: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
