import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 假设使用 Ionicons

const ModalOptions = ({ isVisible, onClose, onOptionPress, onNewModalPress }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Option buttons with icons */}
          <TouchableOpacity style={styles.optionButton} onPress={() => onOptionPress('New Task')}>
            <Icon name="add-outline" size={20} color="#000" />
            <Text style={styles.optionText}>New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={onNewModalPress}>
            <Icon name="chatbubble-outline" size={20} color="#000" />
            <Text style={styles.optionText}>New Chat</Text>
          </TouchableOpacity>
          {/* ... other options */}
          <TouchableOpacity style={styles.optionButton} onPress={onClose}>
          <Icon name="close-outline" size={20} color="#000" />
            <Text style={styles.optionText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default ModalOptions;
