import React, { Component } from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import Svg, {
  Circle,
  Polygon,
  Polyline,
  Line,
} from 'react-native-svg';

export default class Skeleton extends Component {
  drawSkeleton(pose) {
    objs = []
    for (let i = 0; i < pose.keypoints.length; i ++) {
      const key = pose.keypoints[i];
      if (key.part == 'nose') {
         objs.push(<Circle key={i} r="5" cx={key.position.x + "%"} cy={key.position.y*0.65 + "%"} fill='red'/>);
      }
    }
    return (
      <>
      <Text>score:</Text>
      <Text>{pose.score}</Text>
        <Svg height="100%" width="100%" viewbox="0 0 100 100">
          {objs}
        </Svg>
      </>
    );
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
          {this.drawSkeleton(pose)}
        </View>
      );
    }
  }
}
