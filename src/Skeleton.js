import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Canvas from 'react-native-canvas';
import styles from './Styles';
 
export default class Skeleton extends Component {
  

  render() {
    if (this.props.pose != null) {
      const pose = this.props.pose;
      var texts = []
      for (let i = 0; i < pose.keypoints.length; i ++) {
        const style = {
          position: 'absolute', left: pose.keypoints[i].position.x*3.4, top: pose.keypoints[i].position.y*4.9, color: 'red'
        };
        if (pose.keypoints[i].score > 0.3) {
          texts.push( <Text style={style} key={i}>{pose.keypoints[i].part + " \nscore:" + Math.round(pose.keypoints[i].score*1000)/1000.0}</Text> );
        }
      }
      return (
        <View style={{position: 'absolute', zIndex: 10}}>
          <Text>score:</Text>
          <Text>{pose.score}</Text>
          <>{texts}</>
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
