import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const SettingsToggle = ({ id, description, value, onCheckPress}) => {
    
    const[isChecked, setIsChecked] = useState(false);

    const changeVal = () => {
        console.log('checkbox pressed');
        setIsChecked(!isChecked);
    }

    return (
        <View style={styles.field}>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity onPress={changeVal} style={styles.checkbox}>
                <FontAwesome name={isChecked?"toggle-on":"toggle-off"} size={30} color={isChecked?"green":"black"} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    field:{
        marginHorizontal: 5, 
        marginVertical: 4,
        flexDirection: 'row',   //destroys other
        alignItems: 'center',   //destroys other
        justifyContent: 'space-between',
        padding: 5,
    },
    checkbox:{
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    description:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
});

export default SettingsToggle;
