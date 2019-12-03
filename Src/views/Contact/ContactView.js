import React from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import data from '../../resources/data';
import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddModal from '../../components/AddModal/AddModal';
import { Ionicons } from '@expo/vector-icons';

const contacts = data.contacts;

class ContactView extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			// headerTitle: () => <LogoTitle />,
			headerRight: () => (
				<Button
					onPress={ navigation.getParam('openModal')}
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
		}
	};

	componentDidMount() {
		this.props.navigation.setParams({ openModal: this._openModal });
	}

	_openModal = () => {
		this.setState({ modal: this.state.isAddModalOpen=true });
	}

	filterData = () => {
		const { search, data } = this.state;
		data.sort((a, b) => (a.name < b.name) ? -1 : 1);
		let filteredData = data.filter(function (item) {
			return item.name.toLowerCase().includes(search.toLowerCase());
		});
		return filteredData;
	};

	// async componentDidMount() {
	// 	await this._fetchItems();
	// }

	// async _fetchItems() {
	// 	const contacts = await getAllImages();
	// 	console.log(contacts);
	// 	this.setState({ contacts });
	// }

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