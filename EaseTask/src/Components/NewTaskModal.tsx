import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask } from '../Utils/database_utils';
import Headbar from './Headbar';
import DV from './defaultValues';

const NewTaskModal = ({isVisible, onClose}) => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date())
    const [showTimePicker, setShowTimePicker] = useState(false);


    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios'); // For iOS, showTimePicker remains true
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const handleCreateTask = () => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const day = date.getDate();
        const timeTask = time.toLocaleTimeString(); // Extract time as a string
        console.log('Task created:', { name, tag, date, time });

        // Call the createTask function to insert the task into the database
        createTask(name, tag, year, month, day, timeTask);

        // Reset input fields and close modal
        setName('');
        setTag('');
        setDate(new Date());
        setTime(new Date())
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Headbar showIcons={false} headBarText={"New task"} subHeadBarText={"Create a new task"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />
            <View style={styles.container}>
                <Text style={DV.globalStyles.normalText}>Task Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Task Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={DV.globalStyles.normalText}>Tag</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tag"
                    value={tag}
                    onChangeText={setTag}
                />
                <View style={styles.dateTimeContainer}>
                    <Text style={DV.globalStyles.normalText}>Date</Text>
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
                    <Text style={DV.globalStyles.normalText}>Time</Text>               
                    <TouchableOpacity onPress={() => setShowTimePicker(true)} style={[styles.buttonTime]}>
                        <Text style={styles.buttonText}>{"PICK TIME"}</Text>
                    </TouchableOpacity>
                    {showTimePicker ? (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    ) : null}
                </View>
                <TouchableOpacity onPress={handleCreateTask} style={[styles.buttonAction]}>
                        <Text style={styles.buttonText}>{"CREATE TASK"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={[styles.buttonAction]}>
                        <Text style={styles.buttonText}>{"GO BACK TO MAIN MENU"}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 25,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
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
    buttonAction: {
        width: 200,
        height: 50,
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
});

export default NewTaskModal;