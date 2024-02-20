import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DV from "../Components/defaultValues";
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Headbar from '../Components/Headbar';

const Filter = ({ isVisible, onClose}) => {
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
                setStartDate(selectedDate);
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
    const [endDateText, setEndDateText] = useState("");
    const [endDateSelected, setEndDateSelected] = useState(false);
    const handleEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(Platform.OS === 'ios'); // For iOS, showDatePicker remains true
        if (startDate > selectedDate){
            console.log("illegal input");            // TODO warn user because end date before start date
        } else {
            if (selectedDate) {
                setEndDate(selectedDate);
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


    const handleClose = (close) => {
        console.log("Task: " + showTask);
        console.log("Note: " + showNote);
        console.log("Date between " + startDate + " and " + endDate);
        close();
    }

    return(
        <Modal transparent={false} visible={isVisible} animationType="slide">
            <View style={StyleSheet.compose(DV.styles.background, styles.moveHeadbarUp)}>
                {/** Headbar */}
                <Headbar showIcons={false} headBarText={"Filter"} subHeadBarText={"Filter your Task"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />

                <View style={styles.container}>
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
                            <Text style={DV.styles.normalText}>{startDateText}</Text>
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
                            <Text style={DV.styles.normalText}>{endDateText}</Text>
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
                    <View style={DV.styles.entry}>
                        <Fontisto name="propeller-4" size={DV.normalIconSize} color="green" />
                        <Text style={StyleSheet.compose(DV.styles.entryField, DV.styles.normalText)}>"Tags"</Text>
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
    moveHeadbarUp: {
        marginTop: -26,
    },
    marginToIcon: {
        marginLeft: 15
    },
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: 1,
        borderColor: '#000000',
        marginStart: 12,
    },
})

export default Filter;
