import React, { useState } from "react";
import { StyleSheet , Text, View, TouchableOpacity, Image} from "react-native";
import { AntDesign } from '@expo/vector-icons';


const OnBoarding2 = () => {
    const header = "Welcome";
    const caption = "Your information\nis yours";
    const text = "All your information is encrypted"
    const buText = "Sign in with Google"
    const checkText = "I accept the terms and privacy policy"

    const handleButton = () => {
        console.log('Press!');
    }

    const [isChecked,setIsChecked] = useState(false);

    const handleCheckbox = () => {
        console.log(`checkbox pressed`);
        setIsChecked(!isChecked);
      };

    return (
        <View style={styles.background}>
            <Text style={styles.header}>{header}</Text>
            <Image
            source={require('../Assets/OnBoarding2.png')}
            style={styles.image}
            resizeMode="contain" // Optional: Adjust the resizeMode as needed
              />
            <Text style={styles.caption}>{caption}</Text>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={() => handleCheckbox()} style={[styles.checkbox]}>
                {/* Display a checked or unchecked icon based on the isChecked prop */}
                {isChecked ? (
                <AntDesign name="checkcircle" size={24} color="green" />
                ) : (
                <AntDesign name="checkcircleo" size={24} color="grey" />
                )}
                <Text style={styles.checkboxText}>{checkText}</Text>
            </TouchableOpacity>
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
        paddingTop: 40,
    },
    caption:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        paddingTop: 40,
        textAlign: 'center',
    },
    text:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        paddingVertical: 20,
    },
    checkbox:{
        flexDirection: 'row', // Change to row to display items horizontally
        justifyContent: 'space-between',
        alignItems: 'center', // Center items vertically
        marginBottom: 20, // Adjust spacing if needed
    },
    checkboxText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        paddingVertical: 20,
        marginLeft: 10, // Add left margin for spacing between icon and text
    },
    buttonText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    button:{
        width: 230,
        height: 48,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 200,
    },
    image:{
        width: 300, 
        height: 300, 
    }
})

export default OnBoarding2
