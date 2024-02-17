import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import DV from './defaultValues';

const SettingsToggle = ({ id, description, value, onCheckPress}) => {
    
    const[isChecked, setIsChecked] = useState(false);

    const changeVal = () => {
        console.log('checkbox pressed');
        setIsChecked(!isChecked);
    }

    return (// Changed the layout of the first View and the icon size in global Settings 
        <View style={[DV.styles.settingsEntry, styles.extra]}> 
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity onPress={changeVal} style={styles.checkbox}>
                <FontAwesome name={isChecked?"toggle-on":"toggle-off"} size={DV.normalIconSize} color={isChecked?"green":"black"} /> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    extra:{
        flexDirection: 'row',
        alignItems: 'center'
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
