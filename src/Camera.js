import React, {Component} from 'react';
import {View, TouchableOpacity, StatusBar, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RecordButton from './RecordButton';
import styles from './Styles';
import Video from 'react-native-video';

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
  
  async toggleRecording() {
    console.log(RNCamera.Constants.VideoQuality);
    console.log(this.state.options);
    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }
  
  async startRecording() {
    this.setState({
      isRecording: true,
      options: {
        quality: RNCamera.Constants.VideoQuality["480p"]
      }
    });
    var data = await this.camera.recordAsync(this.state.options);
    this.setState({fileUri: data.uri});
    console.log(data.uri);
  }

  stopRecording() {
    this.setState({isRecording: false})
    this.camera.stopRecording();
  }
  
  onBuffer() {
    
  }
  
  videoError() {
    
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
          <Video source={{uri: this.state.fileUri}}
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
