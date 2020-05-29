import React, { Component } from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import Svg, {Circle, Line} from 'react-native-svg';

export default class Skeleton extends Component {
  drawSkeleton(pose) {
    var min_confidence = 0.;
    const point = (part) => {
      if (pose[part].confidence > min_confidence) {
        return(
          <Circle key={part} r='5' cx={pose[part].x + '%'} cy={pose[part].y + '%'} fill='blue'/>
        );
      }
    }
    const line = (part1, part2) => {
      if (pose[part1].confidence > min_confidence && pose[part2].confidence > min_confidence) {
        return(
          <Line key={part1 + part2} strokeWidth='5' x1={pose[part1].x + '%'} y1={pose[part1].y + '%'} x2={pose[part2].x + '%'} y2={pose[part2].y + '%'} stroke='blue'/>
        );
      }
    }
    return ([

      //Face
      point("nose"),
      point("left_eye"),
      point("right_eye"),
      point("left_ear"),
      point("right_ear"),
      //Torso
      line("neck", "left_shoulder"),
      line("neck", "right_shoulder"),
      line("left_shoulder", "left_waist"),
      line("right_shoulder", "right_waist"),
      line("left_waist", "center_waist"),
      line("right_waist", "center_waist"),
      //Left arm
      line("left_shoulder", "left_elbow"),
      line("left_elbow", "left_wrist"),
      //Right arm
      line("right_shoulder", "right_elbow"),
      line("right_shoulder", "right_wrist"),
      //Left leg
      line("left_waist", "left_knee"),
      line("left_knee", "left_ankle"),
      //Left foot
      line("left_ankle", "left_toe"),
      line("left_toe", "left_midfoot"),
      line("left_midfoot", "left_heel"),
      line("left_heel", "left_ankle"),
      //Right leg
      line("right_waist", "right_knee"),
      line("right_knee", "right_ankle"),
      //Right foot
      line("right_ankle", "right_toe"),
      line("right_toe", "right_midfoot"),
      line("right_midfoot", "right_heel"),
      line("right_heel", "right_ankle"),
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
