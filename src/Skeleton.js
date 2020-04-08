import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Canvas from 'react-native-canvas';
import styles from './Styles';

var pose;

export default class Skeleton extends Component {
  drawSkeleton(canvas) {
    console.log('hi');
    // const ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'purple';
    //ctx.fillRect(0, 0, 100*pose.score, 100*pose.score);
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
      pose = this.props.pose;
      return (
        <View style={styles.canvas}>
          <Canvas ref={this.drawSkeleton}/>
        </View>
      );
    }
  }
}
