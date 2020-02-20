import React, {Component} from 'react';
import {Image} from 'react-native';
import styles from './Styles';

const notRecording = require('./assets/stop_button.png');
const recording = require('./assets/record_button.png');

export default class RecordButton extends Component {

	render() {
		return (
			<Image 
				source={this.props.recording ? notRecording : recording}
				resizeMode='contain'
				style={styles.recordButton}
			/>
		);
	}
}
