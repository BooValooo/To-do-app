import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DV from "./defaultValues";
import { useState } from "react";

const SelectTagEntry = ({isSelected, tag, onPress}) => {
    const handlePress = () => {
        console.log(tag.id + "is pressed. State was " + isPressed);
        onPress(tag.id, !isPressed);
        setIsPressed(!isPressed);
    }

    const [isPressed, setIsPressed] = useState(isSelected)

    return(
        <TouchableOpacity onPress={() => handlePress()} style={StyleSheet.compose(styles.box, isPressed?styles.pressed:styles.unpressed)}>
            <View style={DV.tagColorStyles(tag.color).circle}/>
            <Text style={DV.styles.normalText}>{tag.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 5,
    },
    pressed: {
        backgroundColor: 'gray',
    },
    unpressed: {
        backgroundColor: 'cyan',
    }
})

export default SelectTagEntry;