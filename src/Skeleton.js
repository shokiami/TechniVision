import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
import {Text} from 'react-native';
 
export default class Skeleton extends Component {
  
  drawPose() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  }
  
  render() {
    if (this.props.pose != null) {
      const score = this.props.pose.score;
      return (
        <>
          <Text>score:</Text>
          <Text>{score}</Text>
          <Canvas ref={ drawPose }/>
        </>
      )
    } else {
      return (
        <Text>no pose passed in</Text>
        <Canvas ref={  }/>
      )
    }
  }
}
