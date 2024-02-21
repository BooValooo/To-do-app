import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DV from "../Components/defaultValues";
import Headbar from '../Components/Headbar';
import TagEntry from "../Components/TagEntry";

const TagManager = ({isVisible, onClose}) => {
    return(
        <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}>
            <Headbar headBarText={"Tag manager"} subHeadBarText={"create, delete and prioritize tags"} showIcons={false} onFiltersPress={null} onSearchPress={null} onSettingsPress={null}/>
            <View style={styles.container}>
                <TagEntry name={"first tag"} color={"green"} prioriy={1}></TagEntry>
            </View>
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