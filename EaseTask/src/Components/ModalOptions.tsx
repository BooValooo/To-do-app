// ModalOptions.tsx
import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalOptions = ({ isVisible, onClose, onOptionPress, onNewModalPress }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Option buttons */}
          <TouchableOpacity onPress={() => onOptionPress('New Task')}>
            <Text>New Task</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNewModalPress}>
            <Text>New Chat</Text>
          </TouchableOpacity>
          {/* ... other options */}
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ModalOptions;
