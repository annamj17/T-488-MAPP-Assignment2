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
		console.log("===================================================deleteOldContact");
		oldObject = this.props.value.name;
		console.log("deleteOldContact> Old object:", oldObject);
		oldObject = await makeValidStringForFileName(oldObject);
		console.log("deleteOldContact> Old object after makeValidStringForFileName: ", oldObject);
		console.log(await removeContact(oldObject))
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
		console.log("oldContactInfo", oldContactInfo);
	};

	async editContact() {
		console.log("===================================================editContact");
		console.log("Before delete: this.props.name: ", this.oldContactInfo.name);
		await this.deleteOldContact();
		console.log("After delete: this.state.name: ", this.state.name);
		newContact = {
			"name": this.state.name ? this.state.name : this.oldContactInfo.name,
			"phone": this.state.phone ? this.state.phone : this.oldContactInfo.phone,
			"imageUri": this.state.imageUri ? this.state.imageUri : this.oldContactInfo.imageUri
		}
		console.log("this.state.name: ", this.state.name);
		await addContact(newContact);
		console.log("ADDED CONTACT", newContact)
		this.setState({ closeModal: true, name: '', phone: '', imageUri: '' })
		this.props.closeModal();
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