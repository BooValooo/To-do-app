import React from "react";
import { StyleSheet , Text, View, TouchableOpacity} from "react-native";

const OnBoarding1 = () => {
    const header = "Welcome";
    const caption = "Take notes\neverywhere";
    const text = "Note down everything you care about.\nAnd of cause the task"
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
        backgroundColor: '#FF634888',
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
        backgroundColor: '#FF634840',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 200
    }
})

export default OnBoarding1
