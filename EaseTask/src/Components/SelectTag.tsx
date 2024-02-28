import { View, Modal, StyleSheet, Touchable, ScrollView, TouchableOpacity } from "react-native";
import SelectTagEntry from "./SelectTagEntry";
import Tag from "../Utils/tag";
import { useState } from "react";

const SelectTag = ({isVisible, onClose, setTags, topPosition, tags, selectedTags}) => {
    const addTag = (tag: Tag) => {
        if (!selectedTags.some(selectedTag => selectedTag.id === tag.id)){
            let insertIndex = 0;
            while (insertIndex < selectedTags.length && selectedTags[insertIndex].priority < tag.priority) {
                insertIndex++;
            }
            const updatedTags = [...selectedTags.slice(0, insertIndex), tag, ...selectedTags.slice(insertIndex)];
            selectedTags = updatedTags;
            setTags(selectedTags);
        } else {
            console.warn(tag.id + " is already in selected Tags");
        }
    }

    const removeTag = (tag: Tag) => {
        if(selectedTags.some(selectedTag => selectedTag.id === tag.id)){
            const removeIndex = selectedTags.findIndex(t => t.id === tag.id);
            const updatedTags = [...selectedTags.slice(0, removeIndex), ... selectedTags.slice(removeIndex + 1)];
            selectedTags = updatedTags;
            setTags(selectedTags);
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
            <TouchableOpacity onPress={onClose} style={styles.modalOverlay} />
            <ScrollView style={StyleSheet.compose(position(topPosition).top, styles.box)}>
                    {tags.map((tag) => <SelectTagEntry key={tag.id} isSelected={selectedTags.some(selectedTag => selectedTag.id === tag.id)} tag={tag} onPress={handlePress}/>
                    )}
            </ScrollView>
        </Modal>
    );
}

const position = (topPosition) => StyleSheet.create({
        top: {
            position: 'absolute',
            top: topPosition - 55,
        }
    });

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    box: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '95%',
        margin: 10,
        minHeight: 10,
        borderBottomWidth: 2,
        maxHeight: 3500,
        flex: 1,
    },
});

export default SelectTag;