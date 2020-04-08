import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Canvas from 'react-native-canvas';
import styles from './Styles';

export default class Skeleton extends Component {
  drawSkeleton(pose, ctx) {
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 10, 100);
  }
  
  render() {
    if (this.props.pose == null) {
      return (
        <View style={styles.canvas}>
          <View style={styles.text}>
            <Text>Awaiting PoseNet...</Text>
          </View>
        </View>
      );
    } else {
      const handleCanvas = (canvas) => {
        if (canvas != null) {
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.drawSkeleton(this.props.pose, ctx);
        }
      }
      return (
        <View style={styles.canvas}>
          <Canvas ref={handleCanvas}/>
        </View>
      );
    }
  }
}
