import React from "react";
import { StyleSheet , Text, View, TouchableOpacity} from "react-native";
import {GoogleSignin, GoogleSigninButton, statusCodes,
  } from '@react-native-google-signin/google-signin';

const OnBoarding2 = () => {
    const header = "Welcome";
    const caption = "Your information\nis yours";
    const text = "All your information is encrypted\nwith high level algorithem"
    const buText = "Continue"

    const handleButton = () => {
        console.log('Press!');
    }


    return (
        <View style={styles.background}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.caption}>{caption}</Text>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={() => handleButton()} style={[styles.button]}>
                <Text style={styles.buttonText}>{buText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#5352ED88',
        alignItems: 'center',
        textAlign: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        paddingTop: 80,
    },
    caption:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        paddingTop: 250,
        textAlign: 'center',
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        paddingVertical: 20,
    },
    buttonText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    button:{
        width: '75%',
        height: 99,
        backgroundColor: '#5352ED40',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 200
    }
})

export default OnBoarding2
