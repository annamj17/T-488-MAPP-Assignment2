import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { getAllImages, addImage } from '../../services/services';
import data from '../../resources/data';
import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';

const contacts = data.boards;

class ContactView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			data: contacts,
			contacts: [],
		}
	};

	async componentDidMount() {
		await this._fetchItems();
	}

	async _fetchItems() {
		const contacts = await getAllImages();
		console.log(contacts);
		this.setState({ contacts });
	}
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.screens}>
				<RenderAllContacts
					contacts={this.state.contacts}
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