import { Modal } from "react-native";
import Headbar from "../Components/Headbar";
import { View } from "native-base";

const TagManager = ({isVisible, onClose}) => {
    return(
        <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={onClose}>
            <Headbar headBarText={"Tag manager"} subHeadBarText={"create, delete and prioritize tags"} showIcons={false} onFiltersPress={null} onSearchPress={null} onSettingsPress={null}/>

        </Modal>
    );
}
export default TagManager;