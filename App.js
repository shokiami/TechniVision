import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Camera} from 'expo-camera';

export default class App extends Component {
  state = {
    cameraPermissions: false,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    await this.getCameraPermission();
  }

  async getCameraPermission() {
    const permission = await Camera.requestPermissionsAsync();
    this.setState({cameraPermissions: (permission.status == 'granted')});
  };

  render() {
    console.log(this.state);
    if (!this.state.cameraPermissions) {
      return (
        <View>
          <Text>Camera Permission Denied.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            style={styles.preview}
            type={this.state.type}
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