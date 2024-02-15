import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DV from "../Components/defaultValues";
import { AntDesign } from '@expo/vector-icons';
import Headbar from '../Components/Headbar';

const Filter = ({ isVisible, onClose}) => {
    const [showTask, setShowTask] = useState(true);
    const [showNote, setShowNote] = useState(true);
    const [date, setDate] = useState(new Date())



    const [showDatePicker, setShowDatePicker] = useState(false);
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return(
        <Modal transparent={false} visible={isVisible} animationType="slide">
            <View style={StyleSheet.compose(DV.styles.background, styles.moveHeadbarUp)}>
                <Headbar showIcons={false} headBarText={"Filter"} subHeadBarText={"Filter your Task"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />
                <View style={styles.container}>
                    <View style={styles.taskNoteContainer}>
                        <TouchableOpacity onPress={() => setShowTask(!showTask)} style={showTask?styles.buttonLayoutPressed:styles.buttonLayout}>
                            <Text style={DV.styles.normalText}>Task</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowNote(!showNote)} style={showNote?styles.buttonLayoutPressed:styles.buttonLayout}>
                            <Text style={DV.styles.normalText}>Note</Text>
                        </TouchableOpacity>
                    </View>

                        <Text style={DV.styles.normalText}>Date</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.buttonTime]}>
                            <Text style={styles.buttonText}>{"PICK DATE"}</Text>
                        </TouchableOpacity>
                        {showDatePicker ? (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        ) : null}
                    <TouchableOpacity onPress={onClose} style = {styles.close}>
                        <Text style={DV.styles.normalText}> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    moveHeadbarUp: {
        marginTop: -26,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 1,
        borderColor: '#000000',
        
    }, 
    taskNoteContainer: {
        width: 310,
        height: 50,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#000000',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: '#aaaaaa'
    }, 
    buttonLayout: {
        width: 150, 
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000000',
        alignItems: 'center',
        backgroundColor: '#aaaaaa'
    },
    buttonLayoutPressed: {
        width: 150, 
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000000',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'        
    },
    close: {
        height: 50,
        width: 150,
        borderRadius: 25,
        backgroundColor: '#10BF10',
        alignItems: 'center', 
        marginTop: 30
    },


    dateTimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonTime: {
        width: 100,
        height: 30,
        marginBottom: 30,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#bcbcbc',
        justifyContent: 'center'
    },
    buttonText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
})

export default Filter;
