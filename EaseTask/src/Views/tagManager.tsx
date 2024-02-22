import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DV from "../Components/defaultValues";
import Headbar from '../Components/Headbar';
import TagEntry from "../Components/TagEntry";
import Tag from '../Utils/tag';

const TagManager = ({isVisible, onClose}) => {
    let nextId = 0;

    const handleImportant = (id: Number) => {
        const unsortedTags: Tag[] = tags;
        
        const thisTag = unsortedTags.filter(tag => tag.id == id)[0];
        const otherTag = unsortedTags.filter(tag => tag.priority == (thisTag.priority - 1))[0];

        if (otherTag != undefined){
            thisTag.priority--;
            otherTag.priority++;
        }
        orderTags(unsortedTags);
    };

    const handleUnimportant = (idabcd: Number) => {
        const unsortedTags: Tag[] = tags;

        const thisTag = unsortedTags.filter(tag => tag.id == idabcd)[0];
        const otherTag = tags.filter(tag => tag.priority == (thisTag.priority + 1))[0];

        if (otherTag != undefined){
            thisTag.priority++;
            otherTag.priority--;
        }
        orderTags(unsortedTags);
    };

    const orderTags = (unsortedTags: Tag[]): void => {
        unsortedTags.sort((a, b) => a.priority - b.priority);
        setTags(prevTags => {
            return unsortedTags;
        });
        printTags(unsortedTags);
    };

    const printTags = (printedTags) => {        // Only for debugging
        console.log(printedTags.length + " tags existing");
        printedTags.forEach(tag => console.debug(tag.id + ": " + tag.name + " " + tag.color + " Prio: " + tag.priority));
    };

    const deleteTag = (idToDelete: number): void => {
        setTags(prevTags => {
            const tagPriority = tags.filter(tag => tag.id == idToDelete)[0].priority;
            const updatedTags = prevTags.filter(tag => tag.id !== idToDelete);

            updatedTags.forEach(tag => {
                if (tag.priority > tagPriority) {
                    tag.priority -= 1;
                }
            });

            return updatedTags;
        });
    };


    const createTag = (color: string, name: string) => {
        const id = nextId;
        const priority = tags.length;
        console.log("New Tag");
        console.log('Tag created: ', {id, name, color, priority});
        let newTag: Tag = {
            id: id,
            name: name,
            priority: priority,
            color: color
        };
        setTags(prevTags => {
            prevTags.push(newTag);
            return prevTags;
        })
        nextId++;
        console.debug("create: " + tags.length);
    };

    const [tags, setTags] = useState<Tag[]>([]);

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
                        key={tag.id} tag={tag} moveDown={handleUnimportant} moveUp={handleImportant} newTag={null} deleteTag={deleteTag}/>
                ))}
                <Text style={DV.styles.normalText}>{"new Tag:"}</Text>
                <TagEntry tag={null} moveDown={null} moveUp={null} newTag={createTag} deleteTag={null}/>
            </View>

            <TouchableOpacity onPress={onClose} style = {DV.styles.closeButton}>
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