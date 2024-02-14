import React from "react";
import { StyleSheet , Text, View, TouchableOpacity, Image} from "react-native";
import DV from "../Components/defaultValues";
import { useNavigation } from '@react-navigation/native';
import  OnBoarding2  from "./OnBoarding2";
const OnBoarding1 = () => {
    const style = DV.styles;
    const navigation = useNavigation();
    const header = "Welcome";
    const caption = "Take notes\neverywhere";
    const text = "Note down everything you care about.\nCreate new tasks everyday."
    const buText = "Continue"

    const handleButton = () => {
        console.log('Press!');
        // navigation.navigate(OnBoarding2);
    }


    return (
        <View style={StyleSheet.compose(style.onBoardingBackGround, styles.background)}>
            <Text style={StyleSheet.compose(style.headerCaptionText, style.onBoardingHeader)}>{header}</Text>
            <Image
            source={require('../Assets/OnBoarding1.png')}
            style={styles.image}
            resizeMode="contain" // Optional: Adjust the resizeMode as needed
              />
            <Text style={StyleSheet.compose(style.normalText, style.onBoardingText)}>{caption}</Text>
            <Text style={StyleSheet.compose(style.smallText, style.onBoardingText)}>{text}</Text>
            <TouchableOpacity onPress={() => handleButton()} style={[styles.button]}>
                <Text style={styles.buttonText}>{buText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FF634888',
    },
    buttonText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    button:{
        width: '75%',
        height: 100,
        backgroundColor: '#FF634840',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 200,
    },
    image:{
        width: 300, 
        height: 300, 
    }
})

export default OnBoarding1
