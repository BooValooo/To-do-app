import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Headbar from '../Components/Headbar';
import SettingsToggle from '../Components/SettingsToggle';
import SettingsShow from '../Components/SettingsShow';


const Settings = () => {
    const headbarText = 'Settings';
    const subHeadbarText = '';

    const doNothing = () => {

    };


    const handleCheckPress = (setting) =>{
        console.log(setting.id + " pressed");
    }

    const settings = [
        { id: 1, description: "Synchronized", value: true},
        { id: 2, description: "Push Notifications", value: false},
        { id: 3, description: "Dark Mode", value: false}
    ]
    const arrow = [
        { id: 1, description: "About us", value: true},
        { id: 2, description: "Privacy Police", value: false},
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
                    key={setting.id}
                    id={setting.id}
                    description={setting.description}
                    value={setting.value}
                    onCheckPress={handleCheckPress(setting)}
                    />
                ))}
                {arrow.map((setting) => (
                    <SettingsShow                    
                    key={setting.id}
                    id={setting.id}
                    description={setting.description}
                    value={setting.value}
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
