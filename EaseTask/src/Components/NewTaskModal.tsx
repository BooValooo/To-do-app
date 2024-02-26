import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask, getAllTags } from '../Utils/database_utils';
import Headbar from './Headbar';
import DV from './defaultValues';
import RNPickerSelect from 'react-native-picker-select';

const NewTaskModal = ({isVisible, onClose}) => {
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date())
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
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
        console.log('Task created:', { name, tag, date, time, text });

        // Call the createTask function to insert the task into the database
        createTask(name, tag, year, month, day, timeTask, text);

        // Reset input fields and close modal
        setName('');
        setTag('');
        setDate(new Date());
        setTime(new Date());
        setText('');
        onClose();
    };

    useEffect(() => {
        getAllTags(setTags);
      }, []);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <Headbar showIcons={false} headBarText={"New task"} subHeadBarText={"Create a new task"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />
            <View style={styles.container}>
                <Text style={DV.styles.normalText}>Task Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Task Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={DV.styles.normalText}>Tag</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tag"
                    value={tag}
                    onChangeText={setTag}
                />
                {/* <RNPickerSelect
                    onValueChange={(value) => setTag(value)}
                    items={[
                        { label: 'Tag 1', value: 'tag1' },
                        { label: 'Tag 2', value: 'tag2' },
                        { label: 'Tag 3', value: 'tag3' },
                    ]}
                    value={tag}
                    placeholder={{
                        label: 'Select a tag...',
                        value: null,
                    }}
                /> */}
                <View style={styles.dateTimeContainer}>
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
                    <Text style={DV.styles.normalText}>Time</Text>               
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
                <Text style={DV.styles.normalText}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Task Description"
                    value={text}
                    onChangeText={setText}
                />
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
        marginTop: 0,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        marginTop: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    dateTimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonTime: {
        width: 100,
        height: 30,
        marginBottom: 20,
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#bcbcbc',
        justifyContent: 'center'
    },
    buttonAction: {
        width: 200,
        height: 50,
        marginTop: 20,
        marginBottom: 5,
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