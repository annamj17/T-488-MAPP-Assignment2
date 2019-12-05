import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Entypo } from '@expo/vector-icons';

import Modal from '../Modal/Modal';
import styles from './styles';
import { addContact } from '../../services/services';
import { colors } from 'react-native-elements';
import { selectFromCameraRoll, takePhoto } from '../../services/imageService';

class AddModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			imageUri: '',
		}
	}

	async takePhoto() {
		const photo = await takePhoto();
		this.setState({ imageUri: photo });
	}

	async selectFromCameraRoll() {
		const photo = await selectFromCameraRoll();
		this.setState({ imageUri: photo });
	}

	async validateAndPassOn() {
		if (this.state.name && this.state.phone && this.state.imageUri) {
			newContact = {
				"name": this.state.name,
				"phone": this.state.phone,
				"imageUri": this.state.imageUri,
			}
			console.log("newContact", newContact);
			await addContact(newContact);
			this.setState({ closeModal: true, updateList: true, name: '', phone: '', imageUri: '' })
			this.props.closeModal();
		}
	}

	render() {

		const { isOpen, closeModal, updateList, addContact, didChange } = this.props;
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
					placeholder="New contact's name"
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<TextInput
					style={styles.textInput}
					onChangeText={(phone) => this.setState({ phone })}
					value={this.state.phone}
					keyboardType='numeric'
					maxLength={7}
					placeholder="New phone number"
					placeholderTextColor='gray'
					underlineColorAndroid='transparent'>
				</TextInput>
				<Button style={styles.submitButton}
					activeOpacity={.5}
					onPress={this.validateAndPassOn.bind(this)}
					disabled={isEnabled ? false : true}
					style={isEnabled ? { backgroundColor: 'gray' } : { backgroundColor: 'darkgray' }}>

					Save
					</Button>
			</Modal>
		)
	}
}

export default AddModal;