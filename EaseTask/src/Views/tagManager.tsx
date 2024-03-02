import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DV from "../Components/defaultValues";
import Headbar from '../Components/Headbar';
import TagEntry from "../Components/TagEntry";
import Tag from '../Utils/tag';
import { changePriorityTag, createTagDB, deleteTagDB, getAllTags } from '../Utils/database_utils';

// TODO can't open on IOS

const TagManager = ({isVisible, onClose}) => {
    const [nextId, setNextId] = useState(1);
    const [update, setUpdate] = useState(false);

    const handleImportant = (id: Number) => {
        const unsortedTags: Tag[] = tags;
        
        const thisTag = unsortedTags.filter(tag => tag.id == id)[0];
        const otherTag = unsortedTags.filter(tag => tag.priority == (thisTag.priority - 1))[0];

        if (otherTag != undefined){
            thisTag.priority--;
            changePriorityTag(thisTag,(thisTag.priority));
            otherTag.priority++;
            changePriorityTag(otherTag,(otherTag.priority));
        }
        orderTags(unsortedTags);
    };

    const handleUnimportant = (id: Number) => {
        const unsortedTags: Tag[] = tags;

        const thisTag = unsortedTags.filter(tag => tag.id == id)[0];
        const otherTag = tags.filter(tag => tag.priority == (thisTag.priority + 1))[0];

        if (otherTag != undefined){
            thisTag.priority++;
            changePriorityTag(thisTag,(thisTag.priority));
            otherTag.priority--;
            changePriorityTag(otherTag,(otherTag.priority));
        }
        orderTags(unsortedTags);
    };

    const orderTags = (unsortedTags: Tag[]): void => {
        unsortedTags.sort((a, b) => a.priority - b.priority);
        setTags(prevTags => {
            return unsortedTags;
        });
        printTags(unsortedTags);
        setUpdate(!update);
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
                    changePriorityTag(tag,(tag.priority));
                }
            });

            return updatedTags;
        });
        deleteTagDB(idToDelete);
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
        createTagDB(id, name, priority, color)
        setTags(prevTags => {
            prevTags.push(newTag);
            return prevTags;
        })
        setNextId(nextId + 1);
        console.debug("create: " + tags.length);
    };

    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        getAllTags((newTags) => {
            setTags(newTags);
            const maxId = newTags.reduce((max, tag) => {
                return tag.id > max ? tag.id : max;
            }, 0);
            setNextId(maxId + 1);
            orderTags(newTags);
        });
      }, []);

    return(
        <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}>
            <Headbar headBarText={"Tag manager"} subHeadBarText={"create, delete and prioritize tags"} showIcons={false} onFiltersPress={null} onSearchPress={null} onSettingsPress={null}/>
            <View style={DV.styles.entryContainer}>
                {tags.map((tag) => (
                    <TagEntry
                        key={tag.id} tag={tag} moveDown={handleUnimportant} moveUp={handleImportant} newTag={null} deleteTag={deleteTag}/>
                ))}
                <Text style={DV.styles.normalText}>{"new Tag:"}</Text>
                <TagEntry tag={null} moveDown={null} moveUp={null} newTag={createTag} deleteTag={null}/>
            </View>

            <TouchableOpacity onPress={onClose} style = {DV.colorStyles('gray').closeButton}>
                <Text style={DV.styles.normalText}> Close </Text>
            </TouchableOpacity>
        </Modal>
    );
};

export default TagManager;