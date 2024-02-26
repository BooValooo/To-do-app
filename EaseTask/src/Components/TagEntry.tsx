import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import DV from "../Components/defaultValues";
import ColorSelection from './ColorSelection';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { changeColorTag, changeNameTag } from '../Utils/database_utils';

const TagEntry = ({tag, moveDown, moveUp, newTag, deleteTag}) => {

    const[tagColor, setTagColor] = useState((tag!=null)?tag.color:'green');
    const[colorSelectorVisible, setColorSelectorVisible] = useState(false); 
    const[tagName, setTagName] = useState((tag!=null)?tag.name:"");

    const changeColor = () => {
        setColorSelectorVisible(true); 
    };
    const handleColorChange = (selectedColor) => {
        setTagColor(selectedColor);
        (tag != null) ? changeColorTag(tag, selectedColor) : null ;
        setColorSelectorVisible(false); 
        if (newTag == null){
            tag.color = selectedColor;
        }
    };
    const handleButtonDown = () => {
        moveDown(tag.id);
    };
    const handleButtonUp = () => {
        moveUp(tag.id);
    };
    const handleDelete = () => {
        deleteTag(tag.id);
    };
    const handleNewTag = () => {
        newTag(tagColor, tagName);
        setTagColor('green');
        setTagName('');
    };
    const handleRenameTag = (name) => {
        setTagName(name);
        (tag != null) ? changeNameTag(tag, name) : null ;
        if (newTag == null){
            tag.name = name;
        }
    }

    return (
        <View style={styles.tagEntry}>
            <TouchableOpacity onPress={changeColor} style={colorStyle(tagColor).circle}></TouchableOpacity>
            <TextInput
                style={StyleSheet.compose(styles.textField, DV.styles.normalText)}
                placeholder=""
                value={tagName}
                onChangeText={handleRenameTag}
            />
            {(newTag == null)?<>
                <TouchableOpacity onPress={handleButtonDown} style={styles.moveButtons}>
                    <AntDesign name="downcircleo" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleButtonUp} style={styles.moveButtons}>
                    <AntDesign name="upcircleo" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.moveButtons}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                </TouchableOpacity>
            </>:
            <TouchableOpacity onPress={handleNewTag} style={styles.moveButtons}>
                <FontAwesome5 name="check" size={24} color="black" />
            </TouchableOpacity>
            }
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
        width: 240,
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