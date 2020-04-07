import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  //Camera.js
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  camera: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  canvas: {
    position: 'absolute'
  }
});
