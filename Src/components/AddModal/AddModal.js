import React from 'react';
import { TextInput, Text, Alert } from 'react-native';
import Button from 'react-native-button';
import Modal from '../Modal/Modal';
import styles from './styles';

class AddModal extends React.Component {
    render() {
        const { isOpen, closeModal, addContact } = this.props;
        return (
            <Modal
                style={styles.myModal}
                isOpen={isOpen}
                closeModal={closeModal}>
                <Text style={styles.textStyle}>
                    Create New Contact
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Image URL"
                    placeholderTextColor='gray'
                    underlineColorAndroid='transparent'>
                    {/* onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber} */}
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder="New contact's name"
                    placeholderTextColor='gray'
                    underlineColorAndroid='transparent'>
                    {/* onChangeText={(name) => this.setState({ name })}
                    value={this.state.name} */}
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder="New phone number"
                    placeholderTextColor='gray'
                    underlineColorAndroid='transparent'>
                    {/* onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber} */}
                </TextInput>
                <Button style={styles.submitButton}
                    onPress={() => { console.log("Button pressed") }}>
                    Save
                </Button>
            </Modal>
        );
    }
}

export default AddModal;