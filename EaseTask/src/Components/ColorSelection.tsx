import { Modal, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import DV from "./defaultValues";
import Colors from "../Utils/Colors";

const ColorSelection = ({isVisible, handleColorChange}) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {Colors.colors.map((c, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[DV.tagColorStyles(c).circle, {margin: 5}]}
                            onPress={() => handleColorChange(c)}
                        />
                    ))}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
})

export default ColorSelection;