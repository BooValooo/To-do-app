import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const SettingsToggle = ({ id, description, defaultValue, onCheckPress}) => {
    return (
        <View style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.description}>{description}</Text>
                <TouchableOpacity onPress={onCheckPress} style={styles.checkbox}>
                    <FontAwesome name={defaultValue?"toggle-on":"toggle-off"} size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
    },
    field:{
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5, 
        marginVertical: 8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
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
