import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import DV from './defaultValues';

const SettingsShow = ({ id, description, value, onCheckPress}) => {
    
    const[isChecked, setIsChecked] = useState(false);

    const changeVal = () => {
        console.log('checkbox pressed');
        setIsChecked(!isChecked);
    }

    return (
        <View style={DV.globalStyles.settingsEntry}>
            <TouchableOpacity onPress={changeVal} style={styles.checkbox}>
                <Text style={styles.description}>{description}</Text>
                <AntDesign name="right" size={DV.iconSize} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox:{
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    description:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
});

export default SettingsShow;
