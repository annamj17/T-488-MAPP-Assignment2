import React from 'react';
import { TextInput } from 'react-native';
import Modal from '../Modal/Modal';
import styles from './styles';

class AddModal extends React.Component {
    render() {
        const { isOpen, closeModal, addContact } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                closeModal={closeModal}>
                <TextInput
                    style={styles.textInput}
                    // onChangeText={(name) => this.setState({ name })}
                    // value={this.state.name}
                    placeholder="New contact's name"
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
                <TextInput
                    style={styles.textInput}
                    // onChangeText={(name) => this.setState({ name })}
                    // value={this.state.name}
                    placeholder="New phone number"
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
            </Modal>
        );
    }
}

export default AddModal;