import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DV from "../Components/defaultValues";
import ColorSelection from './ColorSelection';
import { AntDesign } from '@expo/vector-icons';

const TagEntry = ({name, color, moveDown, moveUp}) => {

    const[tagColor, setTagColor] = useState(color);
    const[colorSelectorVisible, setColorSelectorVisible] = useState(false); 
    const[tagName, setTagName] = useState(name);

    const changeColor = () => {
        setColorSelectorVisible(true); 
    };

    const handleColorChange = (selectedColor) => {
        setTagColor(selectedColor); 
        setColorSelectorVisible(false); 
    };

    return (
        <View style={styles.tagEntry}>
            <TouchableOpacity onPress={changeColor} style={colorStyle(tagColor).circle}></TouchableOpacity>
            <TextInput
                style={StyleSheet.compose(styles.textField, DV.styles.normalText)}
                placeholder=""
                value={tagName}
                onChangeText={setTagName}
            />
            <TouchableOpacity onPress={moveDown} style={styles.moveButtons}>
                <AntDesign name="downcircleo" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={moveUp} style={styles.moveButtons}>
                <AntDesign name="upcircleo" size={24} color="black" />
            </TouchableOpacity>
            <ColorSelection isVisible={colorSelectorVisible} handleColorChange={handleColorChange}></ColorSelection>


        </View>
    );

}

const colorStyle = (color) => StyleSheet.create({
    circle:{
        height: DV.normalIconSize,
        width: DV.normalIconSize,
        borderRadius: DV.normalIconSize,
        backgroundColor: color,
        borderWidth: 1,
        alignSelf: 'center'
    },
});

const styles = StyleSheet.create({
    tagEntry: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    textField:{
        width: 269,
        height: 30,
        borderRadius: 10,
        paddingLeft: 10,
        marginLeft: 5,
        textAlignVertical: 'center',
    },
    moveButtons:{
        marginLeft: 5,
        alignSelf: 'center'
    }
});

export default TagEntry;