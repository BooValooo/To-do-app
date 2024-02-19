import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DV from "../Components/defaultValues";
import { AntDesign, Fontisto } from '@expo/vector-icons';
import Headbar from '../Components/Headbar';

const Filter = ({ isVisible, onClose}) => {
    const infiniteDate = new Date('9999-12-31T23:59:59')

    const [name, setName] = useState('');
    const [showTask, setShowTask] = useState(true);
    const [showNote, setShowNote] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(infiniteDate);
    const [startDateText, setStartDateText] = useState("today");
    const [endDateText, setEndDateText] = useState("");
    const [showFinishedTasks, setShowFinishedTasks] = useState(false);

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

    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
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

    const handleClose = (close) => {
        console.log("Task: " + showTask);
        console.log("Note: " + showNote);
        console.log("Date between " + startDate + " and " + endDate);
        close();
    }

    const handleShowFinishedTasks = () => {
        setShowFinishedTasks(!showFinishedTasks);
    }

    const [endDateSelected, setEndDateSelected] = useState(false);

    return(
        <Modal transparent={false} visible={isVisible} animationType="slide">
            <View style={StyleSheet.compose(DV.styles.background, styles.moveHeadbarUp)}>
                {/** Headbar */}
                <Headbar showIcons={false} headBarText={"Filter"} subHeadBarText={"Filter your Task"} onSearchPress={null} onFiltersPress={null} onSettingsPress={null} />

                <View style={styles.container}>
                    {/** TaskNote */}
                    <View style={styles.taskNoteContainer}>
                        <TouchableOpacity onPress={() => setShowTask(!showTask)} style={showTask?styles.buttonLayoutPressed:styles.buttonLayout}>
                            <Text style={DV.styles.normalText}>Task</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowNote(!showNote)} style={showNote?styles.buttonLayoutPressed:styles.buttonLayout}>
                            <Text style={DV.styles.normalText}>Note</Text>
                        </TouchableOpacity>
                    </View>

                    {/** Deadline */}

                    <View style={styles.dates}>
                        <AntDesign name="clockcircleo" size={24} color="#24A19C" style={styles.spaceRight}/>
                        <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={[styles.buttonTime]}>
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

                        <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={[styles.buttonTime]}>
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
                    <View style={styles.dates}>
                        <Fontisto name="propeller-4" size={24} color="#24A19C" style={styles.spaceRight} />
                        <View style={styles.tag}>
                            <Text style={DV.styles.normalText}>"Tags"</Text>
                        </View>
                    </View>
                    <View style={styles.dates}>    
                        <AntDesign name="search1" size={24} color="#24A19C" style={styles.spaceRight} />                
                        <TextInput
                            style={StyleSheet.compose(styles.tag, DV.styles.normalText)}
                            placeholder=""
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                        <TouchableOpacity onPress={() => handleShowFinishedTasks()} style={styles.dates}>
                            {/* Display a checked or unchecked icon based on the isChecked prop */}
                            {showFinishedTasks ? (
                            <AntDesign name="checkcircle" size={DV.normalIconSize} color="green" style={styles.spaceRight}/>
                            ) : (
                            <AntDesign name="checkcircleo" size={DV.normalIconSize} color="grey" style={styles.spaceRight}/>
                            )}
                            <Text style={DV.styles.normalText}>{"Display finished tasks"}</Text>
                        </TouchableOpacity>
                    
                    {/** Save  */}
                    <TouchableOpacity onPress={() => handleClose(onClose)} style = {styles.close}>
                        <Text style={DV.styles.normalText}> Close </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    central: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    tag: {
        backgroundColor: '#EEEEEE',
        width: 330,
        height: 40,
        borderRadius: 10,
        paddingStart: 10
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
    moveHeadbarUp: {
        marginTop: -26,
    },
    spaceRight: {
        paddingRight: 5,
    },
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderRadius: 1,
        borderColor: '#000000',
        marginStart: 12,
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
        backgroundColor: '#aaaaaa',
        marginBottom: 10,
    },
    buttonLayout: {
        width: 150, 
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#aaaaaa',
        justifyContent:'center'
    },
    buttonLayoutPressed: {
        width: 150, 
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'        
    },
    close: {
        height: 50,
        width: 150,
        borderRadius: 25,
        backgroundColor: '#10BF10',
        alignItems: 'center', 
        marginTop: 30,
        justifyContent: "center",
        alignSelf: 'center',
    },
    dates:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        textAlignVertical: 'center',
        verticalAlign: 'middle',
    },
    dateTimeContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonTime: {
        width: 160,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'baseline',
        alignContent: "center",
        paddingStart: 10,
    },
    buttonText:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: "center",
    },
})

export default Filter;
