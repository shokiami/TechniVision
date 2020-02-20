import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import styles from './Styles/CameraStyles';
import RecordButton from './RecordButton';

const defaultColor = "#ffffff";
const redColor = "#eb2821";

export default class Camera extends Component {
  state = {
      cameraFace: RNCamera.Constants.Type.back,
      isRecording: false,
      options: {quality: RNCamera.Constants.VideoQuality["288p"]}
  };
  
  constructor(props) {
    super(props);
  }

  toggleRecording = () => {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  };

  async startRecording() {
    try {
      this.camera.refreshAuthorizationStatus;
      this.setState({isRecording: true});
      var data = await this.camera.recordAsync(this.state.options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  stopRecording() {
    this.setState({isRecording: false})
    this.camera.stopRecording();
  }

  render = () => {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraFace}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio = {false}
        >
          <View>
            <TouchableOpacity onPress={this.toggleRecording} activeOpacity={1}>
                <RecordButton recording={this.state.isRecording}/>
            </TouchableOpacity>
          </View>
        </RNCamera>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {this.state.isRecording ? redColor : defaultColor} translucent = {true}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Camera', () => Camera);
