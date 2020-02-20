import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    //MainApp.js
    bufferContainer: {
        borderRadius: 4,
        borderWidth: 5,
        paddingHorizontal: 10,
        borderColor: "#ffffff",
        marginTop: 20,
        marginBottom: 20
    },
    outlinedContainer: {
        borderRadius: 4,
        borderWidth: 3,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: "#eeeeee",
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        textAlign: "center",
        fontSize: 29,
        fontWeight: "bold"
    },
    grayButton: {
        alignItems: "center",
        backgroundColor: "#dddddd",
        padding: 20
    },

    //RecordButton.js
    recordButton: {
        width: 100, 
        height: 100
    },

    //Camera.js
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    preview: {
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
