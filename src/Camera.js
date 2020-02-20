import React, {Component} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RecordButton from './RecordButton';
import styles from './Styles';

const defaultColor = "#ffffff";
const redColor = "#eb2821";

export default class Camera extends Component {
  state = {
    cameraFace: RNCamera.Constants.Type.back,
    isRecording: false,
    options: {
      quality: RNCamera.Constants.VideoQuality["288p"]
    }
  };

  async toggleRecording() {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    this.setState({isRecording: true});
    var data = await this.camera.recordAsync(this.state.options);
    console.log(data.uri);
  }

  stopRecording() {
    this.setState({isRecording: false})
    this.camera.stopRecording();
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={cam => {
            this.camera = cam;
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
            <TouchableOpacity onPress={this.toggleRecording.bind(this)} activeOpacity={1}>
                <RecordButton recording={this.state.isRecording}/>
            </TouchableOpacity>
          </View>
        </RNCamera>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {this.state.isRecording ? redColor : defaultColor} translucent = {true}/>
      </View>
    );
  }
}