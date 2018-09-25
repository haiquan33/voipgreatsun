import { StyleSheet } from 'react-native'
import { correctFontSizeForScreen } from '../../utils/scale'
import config from "../../config/app";
export default StyleSheet.create({
    containerGradient: {
        flex: 1,

        alignItems: 'center',
        width: config.screenWidth,
        height: config.screenHeight,
        //borderWidth: 1, borderColor: "red"
    },
    logo: {
        width: config.screenWidth / 1.25,
        height: config.screenWidth / 1.25,

        justifyContent: 'center',

        alignItems: 'center',

    },
    input: {
        width: config.screenWidth * 0.80,
        height: 50,

        backgroundColor: '#4352AE',

        textAlign: 'center',
        fontSize: 15,
        color:'#fff'

    },
    loginButton: {
        width: config.screenWidth * 0.80,
       
        marginTop:50,

        backgroundColor: '#FDEA03',
        borderRadius: 25,



    },
    loginText: {
        textAlign: 'center',
        padding:15,
        fontSize: 15,
        fontWeight: 'bold',
        color:'#2035C3'
    }
})
