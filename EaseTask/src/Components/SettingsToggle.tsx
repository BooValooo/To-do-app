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
                <FontAwesome name={isChecked?"toggle-on":"toggle-off"} size={24} color={isChecked?"green":"black"} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    field:{
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5, 
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#FFFFFF'
    },
    checkbox:{
        alignItems: 'flex-end',
        marginLeft: 10
    },
    description:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    }
});

export default SettingsToggle;
