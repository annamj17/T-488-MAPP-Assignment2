import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Entypo } from '@expo/vector-icons';

import Modal from '../Modal/Modal';
import styles from './styles';
import { selectFromCameraRoll, takePhoto } from '../../services/imageService';
import { addContact, removeContact, makeValidStringForFileName } from '../../services/services';

class AddEditModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			imageUri: '',
			oldContactInfo: []
		}
	};

	async deleteOldContact() {
		oldObject = this.props.value.name;
		oldObject = await makeValidStringForFileName(oldObject);
		await removeContact(oldObject);
	};

	async takePhoto() {
		const photo = await takePhoto();
		this.setState({ imageUri: photo });
	};

	async selectFromCameraRoll() {
		const photo = await selectFromCameraRoll();
		this.setState({ imageUri: photo });
	};

	async setOldInfo(oldContactInfo) {
		this.oldContactInfo = oldContactInfo;
	};

	async editContact() {
		await this.deleteOldContact();
		newContact = {
			"name": this.state.name ? this.state.name : this.oldContactInfo.name,
			"phone": this.state.phone ? this.state.phone : this.oldContactInfo.phone,
			"imageUri": this.state.imageUri ? this.state.imageUri : this.oldContactInfo.imageUri
		}
		await addContact(newContact);
		this.setState({ closeModal: true, name: '', phone: '', imageUri: '' })
	};

	render() {

		const { isOpen, closeModal, value } = this.props;
		const { imageUri, name, phone } = this.state;

		return (
			<Modal
				isOpen={isOpen}
				closeModal={closeModal}>
				<Text style={styles.textStyle}>
					Edit Contact
				</Text>
				<View>
					{
						imageUri
							?
							<Image source={{ uri: imageUri }} style={styles.image} />
							:
							<View style={styles.iconLayout}>
								<TouchableOpacity
									onPress={() => this.takePhoto()}>
									<Entypo style={styles.icon} name="camera" />
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.selectFromCameraRoll()}>
									<Entypo style={styles.icon} name="image" />
								</TouchableOpacity>
							</View>
					}
				</View>
				<TextInput
					style={styles.textInput}
					onChangeText={(name) => this.setState({ name })}
					value={name}
					maxLength={20}
					placeholder={value.name}
					editable={true}
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<TextInput
					style={styles.textInput}
					onChangeText={(phone) => this.setState({ phone })}
					value={phone}
					keyboardType='numeric'
					maxLength={7}
					editable={true}
					placeholder={value.phone}
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<Button style={styles.submitButton}
					onPress={this.setOldInfo(value)}
					onPress={this.editContact.bind(this)}>
					Update
				</Button>
				<Button style={styles.submitButton}
					onPress={this.deleteOldContact.bind(this)}>
					Delete
				</Button>
			</Modal>
		);
	}
}

export default AddEditModal;