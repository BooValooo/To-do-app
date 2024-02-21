import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DV from "../Components/defaultValues";
import Headbar from '../Components/Headbar';
import TagEntry from "../Components/TagEntry";
import Tag from '../Utils/tag';

const TagManager = ({isVisible, onClose}) => {
    let nextId = 0;
    
    const handleClose = (close) => {
        close();
    }

    const handleImportant = (id) => {
        const thisTag = tags.find(tag => tag.id == id);
        if (thisTag.id != 1) {
            const nextTag = tags.find(tag => tag.priority == thisTag.priority - 1);
            if (nextTag == undefined){
                console.warn("No tag with priority " + (thisTag.priority - 1));
            } else {
                thisTag.priority--;
                nextTag.priority++;
            }
        }
    }

    const handleUnimportant = (id) => {
        const thisTag = tags.find(tag => tag.id == id);
        if (thisTag.id != tags.length) {
            const nextTag = tags.find(tag => tag.priority == thisTag.priority + 1);
            if (nextTag == undefined){
                console.warn("No tag with priority " + (thisTag.priority + 1));
            } else {
                thisTag.priority++;
                nextTag.priority--;
            }
        }
    }

    const deleteTag = (id) => {
        console.log("delete tag with id: " + id);
        // TODO 
    }

    const [tags, setTags] = useState<Tag[]>([]);

    const createTag = (color, name) => {
        const id = nextId;
        const priority = tags.length;
        console.log("New Tag")
        console.log('Tag created: ', {id, name, color, priority});
        // TODO
        //createTag(id, name, color, priority); has to be created in the database
        nextId++;
    }

    const testTag1: Tag = {
        id: 1,
        name: "first Tag",
        priority: 1,
        color: 'green'
    };


    return(
        <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}>
            <Headbar headBarText={"Tag manager"} subHeadBarText={"create, delete and prioritize tags"} showIcons={false} onFiltersPress={null} onSearchPress={null} onSettingsPress={null}/>
            <View style={styles.container}>
                {tags.map((tag) => (
                    <TagEntry
                        key={tag.id} name={tag.name} color={tag.color} moveDown={handleUnimportant(tag.id)} moveUp={handleImportant(tag.id)} newTag={null} deleteTag={deleteTag(tag.id)}/>
                ))}
                <Text style={DV.styles.normalText}>{"new Tag:"}</Text>
                <TagEntry name={""} color={"green"} moveDown={null} moveUp={null} newTag={createTag} deleteTag={null}/>
            </View>

            <TouchableOpacity onPress={() => handleClose(onClose)} style = {DV.styles.closeButton}>
                <Text style={DV.styles.normalText}> Close </Text>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {    // same like filter
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginStart: 12,
    },
});

export default TagManager;