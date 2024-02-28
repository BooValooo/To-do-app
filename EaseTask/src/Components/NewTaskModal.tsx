import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTask, getAllTags } from '../Utils/database_utils';
import Headbar from './Headbar';
import DV from './defaultValues';
import SelectTag from './SelectTag';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Tag from '../Utils/tag';

const NewTaskModal = ({isVisible, onClose}) => {

    const testTags: Tag[] = [
        { id: 1, name: 'Tag 1', priority: 1, color: 'red' },
        { id: 2, name: 'Tag 2', priority: 2, color: 'blue' },
        { id: 3, name: 'Tag 3', priority: 3, color: 'green' },
        { id: 4, name: 'Tag 4', priority: 4, color: 'yellow' },
        { id: 5, name: 'Tag 5', priority: 5, color: 'orange' },
        { id: 6, name: 'Tag 6', priority: 6, color: 'purple' },
        { id: 7, name: 'Tag 7', priority: 7, color: 'cyan' },
        { id: 8, name: 'Tag 8', priority: 8, color: 'magenta' },
        { id: 9, name: 'Tag 9', priority: 9, color: 'pink' },
        { id: 10, name: 'Tag 10', priority: 10, color: 'black' },
        { id: 11, name: 'Tag 1', priority: 1, color: 'red' },
        { id: 12, name: 'Tag 2', priority: 2, color: 'blue' },
        { id: 13, name: 'Tag 3', priority: 3, color: 'green' },
        { id: 14, name: 'Tag 4', priority: 4, color: 'yellow' },
        { id: 15, name: 'Tag 5', priority: 5, color: 'orange' },
        { id: 16, name: 'Tag 6', priority: 6, color: 'purple' },
        { id: 17, name: 'Tag 7', priority: 7, color: 'cyan' },
        { id: 18, name: 'Tag 8', priority: 8, color: 'magenta' },
        { id: 19, name: 'Tag 9', priority: 9, color: 'pink' },
        { id: 20, name: 'Tag 10', priority: 10, color: 'black' }
    ];

    const [name, setName] = useState('');
    const [tag, setTag] = useState(testTags);
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date())
    const [tags, setTags] = useState([]);       //all Tags
    const [selectedTags, setSelectedTags] = useState([]);   // only selected once
    const [selectedTagName, setSelectedTagName] = useState("");
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
        setTag([]);
        setDate(new Date());
        setTime(new Date());
        setText('');
        onClose();
    };

    useEffect(() => {
        getAllTags(setTags);
      }, []);

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
                <SelectTag isVisible={tagVisible} onClose={onCloseTag} setTags={handleTags} topPosition={340} tags={tags} selectedTags={selectedTags}/>
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
    negateMarginToIcon: {
        marginLeft: -15 - DV.normalIconSize,
        marginTop: -15
    },
    noMarginVertical: {
        marginVertical: 0,
    },
});

export default NewTaskModal;