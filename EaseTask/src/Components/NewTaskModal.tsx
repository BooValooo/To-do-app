import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addTagTask, createTask, getAllTags } from '../Utils/database_utils';
import Headbar from './Headbar';
import DV from './defaultValues';
import SelectTag from './SelectTag';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Tag from '../Utils/tag';

const NewTaskModal = ({isVisible, onClose}) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date())
    const [dateStr, setDateStr] = useState("PICK DEADLINE")
    const [tags, setTags] = useState([]);       //all Tags
    const [selectedTags, setSelectedTags] = useState([]);   // only selected once
    const [selectedTagName, setSelectedTagName] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [timeStr, setTimeStr] = useState("PICK TIME")
    const [showTimePicker, setShowTimePicker] = useState(false);


    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (selectedDate) {
            setDate(selectedDate);
            setDateStr(selectedDate.getDate()+"/"+selectedDate.getMonth()+"/"+selectedDate.getFullYear());
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios'); // For iOS, showTimePicker remains true
        if (selectedTime) {
            setTime(selectedTime);
            setTimeStr(selectedTime.toLocaleTimeString());
        }
    };

    const handleCreateTask = () => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const day = date.getDate();
        const timeTask = time.toLocaleTimeString(); // Extract time as a string

        // Call the createTask function to insert the task into the database
        createTask(name, year, month, day, timeTask, text,selectedTags);

        // Reset input fields and close modal
        setName('');
        setSelectedTags([]);
        setSelectedTagName("");
        setDate(new Date());
        setTime(new Date());
        setText('');
        onClose();
    };

    useEffect(() => {
        getAllTags(setTags);
      }, [isVisible]);

    const handleTags = (newTags) => {
        setSelectedTags(newTags)
        let listOfNames = ""
        newTags.forEach(tag => {
            listOfNames += tag.name + ", "
        });
        setSelectedTagName(listOfNames);
    }
    const [tagVisible, setTagVisible] = useState(false);
    const onCloseTag = () => {
        setTagVisible(false);
    }
    const onOpenTag = () => {
        setTagVisible(true);
    }
    const [buttonPosition, setButtonPosition] = useState({x: 0, y: 0});
    const handleLayout = (event) => {
        const { x, y } = event.nativeEvent.layout;
        setButtonPosition({ x, y });
        console.log("Position: " + x + ", " + y)
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
                <Text style={DV.styles.normalText}>Task Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Task Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={DV.styles.normalText}>Tag</Text>

                <View style={StyleSheet.compose(DV.styles.entry, styles.noMarginVertical)}>
                    <TouchableOpacity onPress={() => onOpenTag()} onLayout={handleLayout} style={StyleSheet.compose(DV.styles.entry, DV.styles.resetVerticalMarginAndPadding)}>
                        <Text style={StyleSheet.compose(styles.input, DV.styles.normalText)}>{selectedTagName}</Text>
                        <AntDesign name="caretdown" size={DV.normalIconSize} color="black" style={styles.negateMarginToIcon}  />
                    </TouchableOpacity>
                </View>
                <SelectTag isVisible={tagVisible} onClose={onCloseTag} setTags={handleTags} topPosition={buttonPosition.x} tags={tags} selectedTags={selectedTags}/>
                <View style={styles.dateTimeContainer}>
                    <Text style={DV.styles.normalText}>Deadline</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.buttonTime]}>
                        <Text style={styles.buttonText}>{dateStr}</Text>
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
                        <Text style={styles.buttonText}>{timeStr}</Text>
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
        width: 150,
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
    negateMarginToIcon: {
        marginLeft: -15 - DV.normalIconSize,
        marginTop: -15
    },
    noMarginVertical: {
        marginVertical: 0,
    },
});

export default NewTaskModal;