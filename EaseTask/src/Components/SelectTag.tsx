import { View, Modal, StyleSheet, Touchable } from "react-native";
import SelectTagEntry from "./SelectTagEntry";
import Tag from "../Utils/tag";
import { useState } from "react";

const SelectTag = ({isVisible, onClose, setTags, topPosition, tags, selectedTags}) => {
    const addTag = (tag: Tag) => {
        if (!selectedTags.includes(tag)){
            let insertIndex = 0;
            while (insertIndex < selectedTags.length && selectedTags[insertIndex].priority < tag.priority) {
                insertIndex++;
            }
            const updatedTags = [...selectedTags.slice(0, insertIndex), tag, ...selectedTags.slice(insertIndex)];
            selectedTags = updatedTags;
            setTags(updatedTags);
        } else {
            console.warn(tag.id + " is already in selected Tags");
        }
    }

    const removeTag = (tag: Tag) => {
        if(selectedTags.includes(tag)){
            const removeIndex = selectedTags.findIndex(t => t.id === tag.id);
            const updatedTags = [...selectedTags.slice(0, removeIndex), ... selectedTags.slice(removeIndex + 1)];
            selectedTags = updatedTags;
            setTags(updatedTags);
        } else {
            console.warn(tag.id + " wasn't in selected Tags");
        }
    }

    const printSelectedTags = (message: String) => {
        let output = "";
        selectedTags.forEach((tag: { id: Number; }) => {
            output = output + tag.id + ", " 
        });
        console.log(message + output)
    }

    const handlePress = (id, isSelected) => {
        console.log("Input: " + id + isSelected)
        const tag = tags.find(t => t.id === id);
        if (isSelected){
            addTag(tag);
        } else {
            removeTag(tag)
        }
        printSelectedTags("Selected Tags: ")
    }

    return(
        <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={onClose} >
            <View style={StyleSheet.compose(position(topPosition).top, styles.box)}>
                {tags.map((tag) => <SelectTagEntry key={tag.id} isSelected={selectedTags.includes(tag)} tag={tag} onPress={handlePress}/>
                )}
            </View>
        </Modal>
    );
}

const position = (topPosition) => StyleSheet.create({
        top: {
            position: 'absolute',
            top: topPosition - 55,
            borderWidth: 1
        }
    });

const styles = StyleSheet.create({
    box: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '95%',
        margin: 10,
        minHeight: 10,
        borderBottomWidth: 2,
    },
});

export default SelectTag;