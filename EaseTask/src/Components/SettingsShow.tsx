import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const SettingsShow = ({ id, description, value, onCheckPress}) => {
    
    const[isChecked, setIsChecked] = useState(false);

    const changeVal = () => {
        console.log('checkbox pressed');
        setIsChecked(!isChecked);
    }

    return (
        <View style={styles.entry}>
            <TouchableOpacity onPress={changeVal} style={styles.checkbox}>
                <Text style={styles.description}>{description}</Text>
                <AntDesign name="right" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    description:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    entry:{
        marginHorizontal: 5,    // Distance to something left and right
        marginVertical: 4,      // Distance to something up and down
        padding: 5,             // Distance to something inside
        justifyContent: 'space-between',    // Elements inside are to the right and left
    }
});

export default SettingsShow;
