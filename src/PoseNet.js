import React, {Component} from 'react';
import {View, Text} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import {Camera} from 'expo-camera';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import * as posenet from '@tensorflow-models/posenet';
import styles from './Styles';

const TensorCamera = cameraWithTensors(Camera);
var model;

export default class Posenet extends Component {
    state = {
        loaded: false,
        permission: false,
        type: Camera.Constants.Type.front
    };

    async componentDidMount() {
        //Ask for camera permission
        const permission = await Camera.requestPermissionsAsync();
        this.setState({permission: (permission.status == 'granted')});
        //Load TensorFlow and PoseNet
        await tf.ready();
        model = await posenet.load();
        this.setState({loaded: true});
    }

    handleCameraStream(images, updatePreview, gl) {
        const loop = async () => {
            const nextImageTensor = images.next().value;
            //Apply posenet to nextImageTensor
            const pose = await model.estimateSinglePose(nextImageTensor, 0.5, false, 16);
            console.log(pose);

            requestAnimationFrame(loop);
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
                    <Text>Camera permission denied.</Text>
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