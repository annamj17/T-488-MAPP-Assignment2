import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getAllImages, addImage } from '../../services/services';
import { getAllContacts } from '../../services/services';
import data from '../../resources/data';
import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './styles';
import AddModal from '../../components/AddModal/AddModal';

const contacts = data.contacts;

class ContactView extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			headerRight: () => (
				<Button
					onPress={navigation.getParam('openModal')}
					title="+"
					color="#fff"
				/>
			),
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			data: contacts,
			search: '',
			contacts: [],
			loadingData: true,
			name: '',
			phone: '',
			imageUri: '',
			imageFile: '',
			isAddModalOpen: false,
			modal: true
		}
	};

	async componentDidMount() {
		await this._fetchItems();
		this.props.navigation.setParams({ openModal: this._openModal });
	}

	_openModal = () => {
		this.setState({ modal: this.state.isAddModalOpen = true });
	}

	async _fetchItems() {
		this.setState({ loadingData: true });
		const contacts = await getAllContacts();
		contacts.sort((a, b) => (a.name > b.name) ? 1 : -1);
		console.log("contacts2: ", contacts);
		this.setState({ loadingData: false, contacts });
	}

	filterData = () => {
		const { search, contacts } = this.state;
		//	const search = this.state;
		//	const contacts = await getAllContacts();
		let filteredData = contacts.filter(function(item) {
			return item.name.includes(search);
		});
		return filteredData;
	};

	async addContact() {
		this.setState({ loadingData: true });
		let contacts = await getAllContacts(); //breyta
		console.log("contacts: ", contacts);
		var newContact = {};
		if (this.state.name && this.state.phone) {
			newContact = {
				"name": this.state.name,
				"phone": this.state.phone,
				"imageUri": 'http://dummyimage.com/181x213.png/ff4444/ffffff',
				"imageFile": "'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII='"
			}
		}
		else {
			newContact = {
				"name": "NewName",//this.state.name,
				"phone": "(628) 3582765",//this.state.phone,
				"imageUri": 'http://dummyimage.com/181x213.png/ff4444/ffffff',
				"imageFile": "'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII='"
			}
		}
		console.log("new contact", newContact);
		await contacts.push(newContact);
		console.log("after push", contacts);
		contacts.forEach(contact => {
			console.log(contact.name);
		});
		this.setState({ contacts: [...contacts], loadingImages: false });
	}

	render() {
		const { navigate } = this.props.navigation;
		const { search, isAddModalOpen } = this.state;
		const filteredData = this.filterData();
		return (
			<View style={styles.screens}>
				<SearchBar value={search} onSearch={search => this.setState({ search })} />
				<RenderAllContacts
					contacts={filteredData}
					extraData={filteredData}
					onPress={id => navigate('ContactDetailView', { id: id })}
					imageFile={this.state.contacts.imageFile}
				/>
				<AddModal
					isOpen={isAddModalOpen}
					closeModal={() => this.setState({ isAddModalOpen: false })}
				// takePhoto={() => this.takePhoto()}
				// selectFromCameraRoll={() => this.selectFromCameraRoll()} 
				/>
				<View style={styles.footer}>
					<TextInput
						style={styles.textInput}
						onChangeText={(name) => this.setState({ name })}
						value={this.state.name}
						placeholder="New contact's name"
						placeholderTextColor='white'
						underlineColorAndroid='transparent'>
					</TextInput>

					<TextInput
						style={styles.textInput}
						onChangeText={(phone) => this.setState({ phone })}
						value={this.state.phone}
						placeholder='Phone number'
						placeholderTextColor='white'
						underlineColorAndroid='transparent'>
					</TextInput>
					<TouchableOpacity onPress={this.addContact.bind(this)} style={styles.addButton}>
						<Text style={styles.addContact}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


export default ContactView;