import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import Modal from '../Modal/Modal';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import { colors } from 'react-native-elements';
import { selectFromCameraRoll, takePhoto } from '../../services/imageService';
import { addContact, removeContact, makeValidStringForFileName } from '../../services/services';

class AddModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			imageUri: '',
		}
	}

	async deleteOldContact() {
		oldObject = this.props.value.name;
		console.log("deleteOldContact> Old object", oldObject);
		oldObject = makeValidStringForFileName(oldObject);
		console.log("deleteOldContact> Old object2", oldObject);
		await removeContact(oldObject);
		console.log("REMOVED CONTACT", oldObject);
	}

	async takePhoto() {
		const photo = await takePhoto();
		this.setState({ imageUri: photo });
	}

	async selectFromCameraRoll() {
		const photo = await selectFromCameraRoll();
		this.setState({ imageUri: photo });
	}

	async editContact() {
		newContact = {
			"name": this.state.name,
			"phone": this.state.phone,
			imageUri: this.state.imageUri,
		}
		await addContact(newContact);
		console.log("ADDED CONTACT", newContact)
		await this.deleteOldContact();
		this.setState({ closeModal: true, updateList: true, name: '', phone: '', imageUri: '' })
		this.props.closeModal();
	}

	render() {
		const { isOpen, closeModal, updateList, value, didChange } = this.props;
		const { imageUri, name, phone } = this.state;
		const isEnabled = name.length > 0 && phone.length > 0 && imageUri.length > 0;
		return (

			<Modal
				isOpen={isOpen}
				closeModal={closeModal}
				updateList={updateList} >
				<Text style={styles.textStyle}>
					Create New Contact
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
					value={this.state.name}
					maxLength={20}
					placeholder={value.name}
					editable={true}
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<TextInput
					style={styles.textInput}
					onChangeText={(phone) => this.setState({ phone })}
					value={this.state.phone}
					keyboardType='numeric'
					maxLength={7}
					editable={true}
					placeholder={value.phone}
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<Button style={styles.submitButton}
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

export default AddModal;