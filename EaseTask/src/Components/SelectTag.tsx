import { View, Modal, StyleSheet } from "react-native";
import SelectTagEntry from "./SelectTagEntry";
import Tag from "../Utils/tag";

const SelectTag = ({isVisible, onClose, setTags, topPosition, tags, selectedTags}) => {
    const addTag = (tag: Tag) => {
    let insertIndex = 0;
    while (insertIndex < tags.length && tags[insertIndex].priority < tag.priority) {
        insertIndex++;
    }

    const updatedTags = [...tags.slice(0, insertIndex), tag, ...tags.slice(insertIndex)];

    setTags(updatedTags);
    }

    return(
        <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={onClose} >
            <View style={StyleSheet.compose(position(topPosition).top, styles.box)}>
                {tags.map((tag) => <SelectTagEntry key={tag.id} isSelected={selectedTags.includes(tag)} tag={tag} onPress={null}/>
                )}
            </View>
        </Modal>
    );
}

const position = (topPosition) => StyleSheet.create({
        top: {
            position: 'absolute',
            top: topPosition - 55,
            borderWidth: 1
        }
    });

const styles = StyleSheet.create({
    box: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '95%',
        margin: 10,
        minHeight: 10,
        borderBottomWidth: 2,
    },
});

export default SelectTag;