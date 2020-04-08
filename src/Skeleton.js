import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Canvas from 'react-native-canvas';
import styles from './Styles';
 
export default class Skeleton extends Component {
  drawPose(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 300);
  }
  
  render() {
    if (this.props.pose != null) {
      this.pose = this.props.pose;
      return (
        <View style={{position: 'absolute', zIndex: 10, top:0, bottom:0, left:0, right:0}}>
          <Text style={{position: 'absolute', bottom:0, color: (this.pose.score>0.5) ? 'green' : 'red'}}>{"Total Score: \n" + this.pose.score}</Text>
          <Canvas ref={this.drawPose}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>no pose passed in</Text>
        </View>
      )
    }
  }
}
