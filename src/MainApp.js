import React, {Component} from 'react';
import Camera from './Camera';
import {View, Text, StyleSheet, Modal, TouchableHighlight, Alert, Button} from 'react-native';
import Dialog, {ScaleAnimation, DialogContent} from 'react-native-popup-dialog';
import CheckBox from 'react-native-check-box'; //apparently outdated? we have to search for another checkbox library or create our own checkbox

/*
The record button has a lot of code that probably shouldn't go into main.js,
including 2 state variables, a function, and its actual html look.
I don't know how to import it however.
*/

export default class App extends Component {
	state = {
		modalVisible: false,
		visible: true, //this refers to the disclaimer popup
	};

	setModalVisible(visible) { //this function changes whether the modal is visible
		this.setState({modalVisible: visible});
	}

	dismissDisclaimerPopup() { //if the checkbox is checked, dismisses the popup. You can't actually press the button without checking it anyway but just in case?
		if (this.state.isChecked){
			this.setState({visible: false});
		}
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {Alert.alert('Modal closed.');}} //this has no purpose currently but its probably good to do this
					>
					<View style={styles.bufferContainer}>
						<TouchableHighlight
							style={styles.grayButton}
							onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
							>
							<Text>Hide Modal</Text>
						</TouchableHighlight>
					</View>
				</Modal>
				<Dialog 
					visible={this.state.visible}
					dialogAnimation={new ScaleAnimation({useNativeDriver:true})}
					>
					<DialogContent>
					{
						<View style={{marginTop:20}}>
							<Text style={styles.title}>Disclaimer</Text>
							<View style={styles.outlinedContainer}>
								<Text> This is app is not intended to replace a physical{"\n"}therapist. Computer vision is smart and can{"\n"}provide valuable feedback, but exercises done{"\n"}with improper technique can be dangerous even{"\n"}with the assistance of this app. By using this app, you{"\n"}agree to 100% of the responsibility should you be{"\n"}injured in any capacity.</Text>
							</View>
							<CheckBox
								style={{padding: 10}}
								onClick={()=>{
									this.setState({
									isChecked:!this.state.isChecked
									})
								}}
								isChecked={this.state.isChecked}
								leftText={"I agree to the terms and conditions listed above."}
								/>
							<Button
								disabled={!this.state.isChecked}
								title="Continue"
								color="#2e9ad9"
								onPress={() => this.dismissDisclaimerPopup()}/>
						</View>
					}
					</DialogContent>
				</Dialog>
                <Camera/>
            </View>
		);
	}
}

const styles = StyleSheet.create({
  bufferContainer: {
    borderRadius: 4,
    borderWidth: 5,
    paddingHorizontal: 10,
    borderColor: "#ffffff",
    marginTop: 20,
    marginBottom: 20,
  },
  outlinedContainer: {
    borderRadius: 4,
    borderWidth: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#eeeeee",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 29,
    fontWeight: "bold",
  },
  grayButton: {
    alignItems: "center",
    backgroundColor: "#dddddd",
    padding: 20,
  },
});