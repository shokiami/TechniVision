import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Canvas from 'react-native-canvas';
import styles from './Styles';
 
export default class Skeleton extends Component {
  
  drawPose(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  }
  
  render() {
    if (this.props.pose != null) {
      const score = this.props.pose.score;
      return (
        <View style={styles.container}>
          <Text>score:</Text>
          <Text>{score}</Text>
          <Canvas ref={this.drawPose}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>no pose passed in</Text>
          <Canvas/>
        </View>
      )
    }
  }
}
