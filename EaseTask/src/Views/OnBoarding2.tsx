import React from "react";
import { StyleSheet , Text, View, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';


const OnBoarding2 = () => {
    const header = "Welcome";
    const caption = "Your information\nis yours";
    const text = "All your information is encrypted\nwith high level algorithem"
    const buText = "Sign in with Google"
    const checkText = "I accept the terms and privacy policy"

    const handleButton = () => {
        console.log('Press!');
    }

    let isChecked = false;

    const handleCheckbox = () => {
        console.log(`checkbox pressed`);
        isChecked = !isChecked;
        return (isChecked?<AntDesign name="checkcircle" size={24} color="green" />:<AntDesign name="checkcircleo" size={24} color="grey" />)
      };

    return (
        <View style={styles.background}>
            <Text style={styles.header}>{header}</Text>
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        paddingVertical: 20,
    },
    checkbox:{
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    checkboxText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left',
        paddingVertical: 20,
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
    }
})

export default OnBoarding2
