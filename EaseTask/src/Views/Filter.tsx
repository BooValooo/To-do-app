import React, { startTransition, useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DV from "../Components/defaultValues";
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Headbar from '../Components/Headbar';
import Note from '../Utils/note';
import Task from '../Utils/task';
import { getAllNotes, getAllTasks } from '../Utils/database_utils';
import SelectTag from '../Components/SelectTag';
import Tag from '../Utils/tag';

const Filter = ({ isVisible, onClose, setNotesMain, setTasksMain}) => {
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

    const [tasks, setTasks] = useState<Task[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    // const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    // const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const [showTask, setShowTask] = useState(true);
    const [showNote, setShowNote] = useState(true);


    const [startDate, setStartDate] = useState(new Date());
    const [startDateText, setStartDateText] = useState("today");
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (selectedDate > endDate){
            console.log("illegal input");
        } else {
            if (selectedDate) {
                const selectedDateFormated = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
                setStartDate(selectedDateFormated);
            }
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1; // Months are zero-based, so we add 1
            const day = selectedDate.getDate();
            setStartDateText("" + day + "/" + month + "/" + year);
        }
    };


    const infiniteDate = new Date('9999-12-31T23:59:59')
    const [endDate, setEndDate] = useState(infiniteDate);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [endDateText, setEndDateText] = useState("until");
    const [endDateSelected, setEndDateSelected] = useState(false);
    const handleEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (startDate > selectedDate){
            console.log("illegal input");            // TODO warn user because end date before start date
        } else {
            if (selectedDate) {
                const selectedDateFormated = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
                setEndDate(selectedDateFormated);
            }
            setEndDateSelected(true);
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1; // Months are zero-based, so we add 1
            const day = selectedDate.getDate();
            setEndDateText("" + day + "/" + month + "/" + year);
        }
    };


    const [search, setSearch] = useState('');


    const [showFinishedTasks, setShowFinishedTasks] = useState(false);
    const handleShowFinishedTasks = () => {
        setShowFinishedTasks(!showFinishedTasks);
    }

    // Fetches the tasks and notes in the DB (only once)
    useEffect(() => {
        getAllNotes(setNotes);
        getAllTasks(setTasks);
    }, []);

    const filterTask = () => {
        const filtering = tasks.filter((task) => {
            const date = new Date(task.year,task.month - 1,task.day);
            return (showTask &&
                date >= startDate &&
                date <= endDate &&
                (showFinishedTasks || (!showFinishedTasks && !task.isChecked))
                // Complete with conditions for "tags" and "search"
            )
        })
        setTasksMain(filtering);
    }

    const filterNote = () => {
        const filtering = notes.filter((note) => {
            const date = new Date(note.year,note.month - 1,note.day);
            return (showNote &&
                date >= startDate &&
                date <= endDate &&
                (showFinishedTasks || (!showFinishedTasks && !note.isChecked))
                // Complete with conditions for "tags" and "search"
            )
        })
        setNotesMain(filtering);
    }

    const handleClose = (close) => {
        console.log("Task: " + showTask);
        console.log("Note: " + showNote);
        console.log("Date between " + startDate + " and " + endDate);
        filterNote();
        filterTask();
        close();
    }

    /**
     * State for tag selection visibility
     */
    const [tagVisible, setTagVisible] = useState(false);

    const onOpenTag = () => {
        console.log(buttonPosition.x)
        setTagVisible(true)
    }
    const onCloseTag = () => {
        setTagVisible(false);
    }

    /*                                         tag selection                                                       */
    const allTagsSelected = "all Tags"
    const [tags, setTags] = useState<Tag[]>(testTags);                    /* should be updated with all tags when tagManager changes them */
    const [selectedTags, setSelectedTags] = useState<Tag[]>(testTags.filter(tag => tag.color.length < 5));    /* should remove tag when tagManager deletes one */
    const [selectedTagName, setSelectedTagName] = useState(allTagsSelected);

    /**
     * Changes selectedTags to newTags. Creates a comma seperated list of the name of all selected Tags
     * @param newTags 
     */
    const handleTags = (newTags) => {
        setSelectedTags(newTags)
        if (newTags.length == tags.length){
            setSelectedTagName(allTagsSelected);
        } else {
            let list = ""
            newTags.forEach(tag => {
                list += tag.name + ", "
            })
            setSelectedTagName(list)
        }
    }

    /* Safes the caller position from the tag modal */
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

    /**
     * Gets the position of the button that was pressed to display the tag Selection
     * @param event 
     */
    const handleLayout = (event) => {
        const { x, y } = event.nativeEvent.layout;
        setButtonPosition({ x, y });
        console.log("Position: " + x + ", " + y)
    };

    return(
        <Modal transparent={false} visible={isVisible} animationType="slide">
            <View style={DV.styles.background}>
                {/** Headbar */}
                <Headbar showIcons={false} headBarText={"Filter"} subHeadBarText={"Filter your Task"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />

                <View style={DV.styles.entryContainer}>
                    {/** TaskNote */}
                    <View style={DV.styles.taskNoteContainer}>
                        <TouchableOpacity onPress={() => setShowTask(!showTask)} style={StyleSheet.compose(DV.styles.closeButton, (showTask?DV.styles.taskNotePressed:DV.styles.taskNoteUnpressed))}>
                            <Text style={DV.styles.normalText}>Task</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowNote(!showNote)} style={StyleSheet.compose(DV.styles.closeButton, (showNote?DV.styles.taskNotePressed:DV.styles.taskNoteUnpressed))}>
                            <Text style={DV.styles.normalText}>Note</Text>
                        </TouchableOpacity>
                    </View>

                    {/** Deadline */}

                    <View style={DV.styles.entry}>
                        <AntDesign name="clockcircleo" size={DV.normalIconSize} color="#24A19C" />
                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={StyleSheet.compose(DV.styles.entryField, DV.styles.dateField)}>
                            <Text style={StyleSheet.compose(DV.styles.normalText, styles.centeredText)}>{startDateText}</Text>
                        </TouchableOpacity>
                        {showStartDatePicker ? (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={handleStartDateChange}
                            />
                        ) : null}
                        <Text style={DV.styles.normalText}>:</Text>
                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={StyleSheet.compose(DV.styles.entryField, DV.styles.dateField)}>
                            <Text style={StyleSheet.compose(DV.styles.normalText, styles.centeredText)}>{endDateText}</Text>
                        </TouchableOpacity>
                        {showEndDatePicker ? (
                            <DateTimePicker
                                value={endDateSelected ? endDate : new Date()}
                                mode="date"
                                display="default"
                                onChange={handleEndDateChange}
                            />
                        ) : null}
                    </View>
                    <View style={styles.tags}>
                        <View style={DV.styles.entry}>
                            <Fontisto name="propeller-4" size={DV.normalIconSize} color="green" />
                            <TouchableOpacity onPress={() => onOpenTag()}  style={StyleSheet.compose(DV.styles.entry, DV.styles.resetVerticalMarginAndPadding)}>
                                <Text style={StyleSheet.compose(DV.styles.entryField, DV.styles.normalText)}>{selectedTagName}</Text>
                                <AntDesign name="caretdown" size={DV.normalIconSize} color="black" style={styles.negateMarginToIcon} onLayout={handleLayout} />
                            </TouchableOpacity>
                        </View>
                        <SelectTag isVisible={tagVisible} onClose={onCloseTag} setTags={handleTags} topPosition={360} tags={tags} selectedTags={selectedTags}/>
                    </View>
                    <View style={DV.styles.entry}>    
                        <AntDesign name="search1" size={DV.normalIconSize} color={"green"/* Color was #24A19C */}/>
                        <TextInput
                            style={StyleSheet.compose(DV.styles.entryField, DV.styles.normalText)}
                            placeholder="search"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <TouchableOpacity onPress={() => handleShowFinishedTasks()} style={DV.styles.entry}>
                        {/* Display a checked or unchecked icon based on the isChecked prop */}
                        {showFinishedTasks ? (
                        <AntDesign name="checkcircle" size={DV.normalIconSize} color="green" />
                        ) : (
                        <AntDesign name="checkcircleo" size={DV.normalIconSize} color="black" />
                        )}
                        <Text style={StyleSheet.compose(styles.marginToIcon, DV.styles.normalText)}>{"Display finished tasks"}</Text>
                    </TouchableOpacity>
                    
                    {/** Save  */}
                    <TouchableOpacity onPress={() => handleClose(onClose)} style = {DV.styles.closeButton}>
                        <Text style={DV.styles.normalText}> Close </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    marginToIcon: {
        marginLeft: 15
    },
    centeredText: {
        marginTop: 5
    },
    negateMarginToIcon: {
        marginLeft: -15 - DV.normalIconSize
    },
    modalStyle: {
        verticalAlign: 'bottom'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    tags:{
        flexDirection: 'column',
    }
})

export default Filter;
