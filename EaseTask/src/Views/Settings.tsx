import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import TaskBox from '../Components/TaskBox';
import NoteBox from '../Components/NoteBox';
import FloatingActionButton from '../Components/FloatingActionButton';
import ModalOptions from '../Components/ModalOptions';
import Task from '../Utils/task';
import Note from '../Utils/note';
import SettingsToggle from '../Components/SettingsToggle';

const Settings = () => {
    const headbarText = 'Settings';
    const subHeadbarText = '';

    const doNothing = () => {

    };

    const handleCheckPress = (setting) =>{
        console.log(setting.id + " pressed");
    }

    const settings = [
        { id: 1, description: "Synchronized", defaultValue: true},
        { id: 2, description: "Push Notifications", defaultValue: false},
        { id: 3, description: "Dark Mode", defaultValue: false}
    ]

    return (
        <View style={styles.container}>
            <Headbar
            showIcons={false}
            onFiltersPress={doNothing}
            onSearchPress={doNothing}
            onSettingsPress={doNothing}
            headBarText={headbarText}
            subHeadBarText={subHeadbarText}/>
            <ScrollView style={styles.settingsList}>
                {settings.map((setting) => (
                    <SettingsToggle
                    id={setting.id}
                    description={setting.description}
                    defaultValue={setting.defaultValue}
                    onCheckPress={handleCheckPress(setting)}
                    />
                ))}
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    settingsList:{
        flex: 1,
        marginTop: 10,
    },
});

export default Settings;
