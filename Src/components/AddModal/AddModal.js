import React from 'react';
import { TextInput, Text, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import Modal from '../Modal/Modal';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import { addContact } from '../../services/services';

class AddModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			imageUri: '',
			isAddModalOpen: true,
		}
	}

	async validateAndPassOn() {
		if (this.state.name && this.state.phone && this.state.imageUri) {
			newContact = {
				"name": this.state.name,
				"phone": this.state.phone,
				"imageUri": this.state.imageUri
			}
			console.log("newContact", newContact);
			await addContact(newContact);
		}
	}


	render() {
		const { isOpen, closeModal, addContact, didChange, takePhoto, selectFromCameraRoll } = this.props;
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
					onChangeText={(imageUri) => this.setState({ imageUri })}
					value={this.state.imageUri}
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
					{/* onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber} */}
				</TextInput>
				<TextInput
					style={styles.textInput}
					onChangeText={(name) => this.setState({ name })}
					value={this.state.name}
					placeholder="New contact's name"
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
					{/* onChangeText={(name) => this.setState({ name })}
                    value={this.state.name} */}
				</TextInput>
				<TextInput
					style={styles.textInput}
					style={styles.textInput}
					onChangeText={(phone) => this.setState({ phone })}
					placeholder="New phone number"
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
					{/* onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber} */}

				</TextInput>
				<TouchableOpacity
					onPress={() => takePhoto()}>
					<Entypo style={styles.icon} name="camera" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => selectFromCameraRoll()}>
					<Entypo style={styles.icon} name="image" />
				</TouchableOpacity>
				<Button style={styles.submitButton}
					//onPress={() => { console.log("Button pressed") 
					onPress={this.validateAndPassOn.bind(this)}
				>
					Save
                </Button>
			</Modal>
		);
	}
}

export default AddModal;
