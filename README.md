# TechniVision
Steps to run: 
git clone https://github.com/shokiami/TechniVision.git
cd TechniVision
npm i
npm i react-native-camera --s
npm i react-native-video --s
npm i react-native-popup-dialog --s
npm i react-native-check-box --s
npx react-native link
cd android
./gradlew clean
cd ..
npx react-native run-android
