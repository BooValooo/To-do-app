import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DV from "../Components/defaultValues";

const TagEntry = ({name, color, prioriy}) => {

    const[tagColor, setTagColor] = useState(color);
    const[modalVisible, setModalVisible] = useState(false); 

    const changeColor = () => {
        setModalVisible(true); 
    };

    const handleColorChange = (selectedColor) => {
        setTagColor(selectedColor); 
        setModalVisible(false); 
    };

    const colors = ['#FF0000', '#00FF00', '#0000FF']; 

    return (
        <View style={styles.tagEntry}>
            <TouchableOpacity onPress={changeColor} style={colorStyle(tagColor).circle}></TouchableOpacity>
            <Text style={DV.styles.normalText}>{name}</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {colors.map((c, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[colorStyle(c).circle, {margin: 5}]}
                                onPress={() => handleColorChange(c)}
                            />
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const colorStyle = (color) => StyleSheet.create({
    circle:{
        height: DV.normalIconSize,
        width: DV.normalIconSize,
        borderRadius: DV.normalIconSize,
        backgroundColor: color,
        borderWidth: 1
    },
});

const styles = StyleSheet.create({
    tagEntry: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});

export default TagEntry;