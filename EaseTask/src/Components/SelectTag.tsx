import { View, Modal, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const SelectTag = ({isVisible, onClose, setTags, topPosition}) => {
    return(
        <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={onClose} >
            <View style={position(topPosition).top}>
                <View style={styles.box}>
                </View>
            </View>
        </Modal>
    );
}

const position = (topPosition) => StyleSheet.create({
        top: {
            position: 'absolute',
            top: topPosition,
            borderWidth: 1
        }
    });

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: 123,
        borderWidth: 1,
        margin: 10
    },
    smallBox: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderWidth: 1
    }
});

export default SelectTag;