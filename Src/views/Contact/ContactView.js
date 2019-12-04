import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddModal from '../../components/AddModal/AddModal';
import { getAllContacts, addContact, addImage } from '../../services/services';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';

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
			name: '',
			data: [],
			search: '',
			isAddModalOpen: false,
			modal: true
		}
	};

	async componentDidMount() {
		await this._fetchItems();
		this.props.navigation.setParams({ openModal: this._openModal });
	}

	async _fetchItems() {
		const tempObj = { name: "nokkvi", phonenumber: "7734691", image: "" };
		const tempObjM = { name: "magga", phonenumber: "8237163", image: "" }
		await addContact(tempObj);
		await addContact(tempObjM);
		const contactData = await getAllContacts();
		contactData.sort((a, b) => (a.name < b.name) ? -1 : 1);
		this.setState({ data: contactData })
	}


	_openModal = () => {
		this.setState({ modal: this.state.isAddModalOpen = true });
	}

	filterData = () => {
		const { search, data } = this.state;
		data.sort((a, b) => (a.name < b.name) ? -1 : 1);
		let filteredData = data.filter(function (item) {
			return item.name.toLowerCase().includes(search.toLowerCase());
		});
		return filteredData;
	};

	async takePhoto() {
		const photo = await takePhoto();
		if (photo.length > 0) { await this.addImage(photo); }
	}

	async selectFromCameraRoll() {
			const photo = await selectFromCameraRoll();
			if (photo.length > 0) { await this.addImage(photo); }
	}

	async addImage(image) {
		this.setState({ loadingImages: true });

		const newImage = await addImage(image);
		const { images } = this.state;
		this.setState({ images: [ ...images, newImage ], loadingImages: false, isAddModalOpen: false });
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
					onPress={name => navigate('ContactDetailView', { name: name })}
				/>
				<AddModal
					isOpen={isAddModalOpen}
					closeModal={() => this.setState({ isAddModalOpen: false })}
				  takePhoto={() => this.takePhoto()}
				  selectFromCameraRoll={() => this.selectFromCameraRoll()} 
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screens: {
		flex: 1
	}
});

export default ContactView;