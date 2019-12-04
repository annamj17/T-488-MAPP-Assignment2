import React from 'react';
import { TextInput, Text, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

import Modal from '../Modal/Modal';
import styles from './styles';
import { addContact } from '../../services/services';
import { colors } from 'react-native-elements';

class AddModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			imageUri: '',
		}
	}

	async validateAndPassOn() {
		//if (this.state.name && this.state.phone) {
		newContact = {
			"name": this.state.name,
			"phone": this.state.phone,
		}
		console.log("newContact", newContact);
		await addContact(newContact);
		this.setState({ closeModal: true, updateList: true, name: '', phone: '' })
		//}
	}

	render() {
		const { isOpen, closeModal, updateList, takePhoto, selectFromCameraRoll } = this.props;
		return (
			<Modal
				style={styles.myModal}
				isOpen={isOpen}
				closeModal={closeModal}
				updateList={updateList}>
				<Text style={styles.textStyle}>
					Create New Contact
                </Text>
				{/* <TouchableOpacity
					onPress={() => takePhoto()}>
					<Entypo style={styles.icon} name="camera" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => selectFromCameraRoll()}>
					<Entypo style={styles.icon} name="image" />
				</TouchableOpacity> */}
				<TextInput
					style={styles.textInput}
					onChangeText={(name) => this.setState({ name })}
					value={this.state.name}
					placeholder="New contact's name"
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<TextInput
					style={styles.textInput}
					style={styles.textInput}
					onChangeText={(phone) => this.setState({ phone })}
					value={this.state.phone}
					placeholder="New phone number"
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<Button style={styles.submitButton}
					onPress={this.validateAndPassOn.bind(this)}>
					Save
                </Button>
			</Modal>
		);
	}
}

export default AddModal;