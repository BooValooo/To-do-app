import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

/**
 * Represents a chat modal component.
 * @param {boolean} isVisible - Determines whether the modal is visible or not.
 * @param {function} onClose - Callback function to close the modal.
 * @param {function} onSendMessage - Callback function to send a message.
 * @returns {JSX.Element} The chat modal component.
 */
const ChatModal = ({ isVisible, onClose, onSendMessage }) => {
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText(''); // Clear the input 
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.container}>
                    <ScrollView style={styles.messagesContainer}>
                        {/* Messages*/}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="What tasks do I have today?"
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={sendMessage}
                            returnKeyType="send"
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#FFF',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '50%',
    },
    messagesContainer: {
        paddingHorizontal: 10,
    },
    inputContainer: {
        borderTopWidth: 1,
        borderColor: '#EEE',
        padding: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
    },
});

export default ChatModal;
