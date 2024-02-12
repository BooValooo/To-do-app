import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

/**
 * Represents a chat modal component.
 * @param {boolean} isVisible - Indicates whether the modal is visible or not.
 * @param {Function} onClose - Callback function to close the modal.
 * @returns {JSX.Element} The rendered chat modal component.
 */

const ChatModal = ({ isVisible, onClose }) => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const mockBackendResponse = (message) => {
        return new Promise(resolve => {
            setTimeout(() => {
                // mock response
                resolve({ text: message, sent: new Date(), from: 'Backend' });
            }, 2000); // Simulate 
        });
    };
    useEffect(() => {
        const initialMessage = { text: "Hej, what can I help you today?", sent: new Date(), from: 'AI' };
        setMessages([initialMessage]);
    }, []);
    const sendToBackend = async (message) => {
        const backendResponse = await mockBackendResponse(message);
        setMessages(prevMessages => [...prevMessages, backendResponse]);
    };

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = { text: inputText, sent: new Date(), from: 'User' };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputText('');
            setShowSuggestions(false);
            sendToBackend(inputText); // Send message to backend
        }
    };

    const renderMessageBubble = (message) => {
        let isUser = message.from === 'User';
        return (
            <View key={message.sent.getTime().toString()} style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
                <Image
                    style={styles.avatar}
                    source={isUser ? require('../Assets/Avatars-2.png') : require('../Assets/Avatars.png')}
                />
                <View>
                    <Text style={styles.messageText}>{message.text}</Text>
                    <Text style={styles.messageTime}>{message.sent.toLocaleTimeString()}</Text>
                </View>
            </View>
        );
    };

    const suggestions = [
        "Create a new task for today's calendar",
        "Enquiry of vacancy for a certain period",
        "Check the weather for today",
        "What are the tasks for today",];

    const renderSuggestions = () => {
        if (inputText) {
            return (<ScrollView>
                <View style={styles.suggestionsContainer}>
                    {suggestions.map((suggestion, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestionBubble}
                            onPress={() => {
                                setInputText(suggestion);
                                setShowSuggestions(false);
                            }}
                        >
                            <Text style={styles.suggestionText}>{suggestion}</Text>

                        </TouchableOpacity>
                    ))}
                </View></ScrollView>
            );
        }
        return null;
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
            ><TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={onClose}
                />
                <View style={styles.container}>
                    <ScrollView
                        style={styles.messagesContainer}
                        contentContainerStyle={styles.messagesContentContainer}
                    >
                        {messages.map((message) => (
                            renderMessageBubble(message)
                        ))}
                    </ScrollView>
                    {renderSuggestions()}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ask me anything..."
                            placeholderTextColor="#888"
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
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    suggestionBubble: {
        backgroundColor: '#EEE',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    suggestionText: {
        color: '#333',
    },
    suggestionsContainer: {
        paddingHorizontal: 10,
    },
    messageBubble: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    messageTime: {
        fontSize: 10,
        color: '#888',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#FFF',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexGrow: 1,
        maxHeight: '50%',
        flex: 1,
    },
    messagesContainer: {
        paddingHorizontal: 10,
        flex: 1,
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
        color: '#000',
    },
    userBubble: {
        backgroundColor: '#e0ffeb',
        alignSelf: 'flex-end',
    },
    aiBubble: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    messageText: {
        fontSize: 16,
    },
    addButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        backgroundColor: '#30d0c6',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    messagesContentContainer: {
        paddingBottom: 20,
    },
});

export default ChatModal;
