import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import data from '../../resources/data';
import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddModal from '../../components/AddModal/AddModal';
// import { getAllContacts, addContact } from '../../services/fileService';

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
			id: '',
			data: contacts,
			search: '',
			isAddModalOpen: false,
			modal: true
			// contacts: []
			// loadingContacts: true,
		}
	};

	componentDidMount() {
		// this._fetchItems;
		this.props.navigation.setParams({ openModal: this._openModal });
	}

	_openModal = () => {
		this.setState({ modal: this.state.isAddModalOpen = true });
	}

	// async _fetchItems() {
	// 	this.setState({ loadingContacts: true });
	// 	const contacts = await getAllContacts();
	// 	this.setState({ loadingImages: false, contacts })
	// }

	filterData = () => {
		const { search, data } = this.state;
		data.sort((a, b) => (a.name < b.name) ? -1 : 1);
		let filteredData = data.filter(function (item) {
			return item.name.toLowerCase().includes(search.toLowerCase());
		});
		return filteredData;
	};

	render() {
		const { navigate } = this.props.navigation;
		const { search, isAddModalOpen } = this.state;
		const filteredData = this.filterData();
		return (
			<View style={styles.screens}>
				<SearchBar value={search} onSearch={search => this.setState({ search })} />
				<RenderAllContacts
					contacts={filteredData}
					onPress={id => navigate('ContactDetailView', { id: id })}
				/>
				<AddModal
					isOpen={isAddModalOpen}
					closeModal={() => this.setState({ isAddModalOpen: false })}
				// takePhoto={() => this.takePhoto()}
				// selectFromCameraRoll={() => this.selectFromCameraRoll()} 
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