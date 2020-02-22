import React, {Component} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNVideo from 'react-native-video';
import RecordButton from './RecordButton';
import styles from './Styles';

const defaultColor = "#ffffff";
const redColor = "#eb2821";

export default class Camera extends Component {
  state = {
    cameraFace: RNCamera.Constants.Type.back,
    isRecording: false,
    fileUri: null,
    options: {
      quality: RNCamera.Constants.VideoQuality["480p"]
    }
  };
  
  toggleRecording() {
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }
  
  async startRecording() {
    this.setState({isRecording: true, options: {quality: RNCamera.Constants.VideoQuality["480p"]}});
    const data = await this.camera.recordAsync(this.state.options);
    this.setState({isRecording: false, fileUri: data.uri});
    console.log(data.uri);
  }

  stopRecording() {
    this.camera.stopRecording();
  }
  
  render() {
    if (this.state.fileUri == null) {
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
    } else {
      return (
        <View style={styles.container}>
          <RNVideo source={{uri: this.state.fileUri}}
          ref={ref => {
            this.playback = ref;
          }}
          resizeMode = "stretch"
          onEnd = {() => {
            this.setState({fileUri: null})
          }}
          style={styles.backgroundVideo} />
        </View>
      );
    }
  }
}
