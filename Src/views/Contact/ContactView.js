import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getAllImages, addImage } from '../../services/services';
import data from '../../resources/data';
import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';
import SearchBar from '../../components/SearchBar/SearchBar';

const contacts = data.contacts;

class ContactView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			data: contacts,
			search: ''
		}
	};

	filterData = () => {
		const { search, data } = this.state;
		let filteredData = data.filter(function (item) {
			return item.name.includes(search);
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
		const { search } = this.state;
		const filteredData = this.filterData();
		return (
			<View style={styles.screens}>
				<SearchBar value={search} onSearch={search => this.setState({ search })} />
				<RenderAllContacts
					contacts={filteredData}
					onPress={id => navigate('ContactDetailView', { id: id })}
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