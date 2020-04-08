import React, { Component } from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import Svg, {Circle, Line} from 'react-native-svg';

export default class Skeleton extends Component {
  drawSkeleton(pose) {
    var minScore = 0.3;
    const point = (part) => {
      if (pose.keypoints[part].score > minScore) {
        return(
          <Circle key={''+part} r='5' cx={pose.keypoints[part].position.x + '%'} cy={0.75 * pose.keypoints[part].position.y + '%'} fill='blue'/>
        );
      }
    }
    const line = (part1, part2) => {
      if (pose.keypoints[part1].score > minScore && pose.keypoints[part2].score > minScore) {
        return(
          <Line key={''+part1+part2} strokeWidth='5' x1={pose.keypoints[part1].position.x + '%'} y1={0.75 * pose.keypoints[part1].position.y + '%'} x2={pose.keypoints[part2].position.x + '%'} y2={0.75 * pose.keypoints[part2].position.y + '%'} stroke='blue'/>
        );
      }
    }
    return ([
      //Face
      point(0),
      point(1),
      point(2),
      point(3),
      point(4),
      //Torso
      line(5,6),
      line(5,11),
      line(6,12),
      line(11,12),
      //Left arm
      line(5,7),
      line(7,9),
      //Right arm
      line(6,8),
      line(8,10),
      //Left leg
      line(11,13),
      line(13,15),
      //Right leg
      line(12,14),
      line(14,16),
    ]);
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
          <Svg height="100%" width="100%" viewbox="0 0 100 100">
            {this.drawSkeleton(pose)}
          </Svg>
        </View>
      );
    }
  }
}
