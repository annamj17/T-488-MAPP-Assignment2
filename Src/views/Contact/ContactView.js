import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import data from '../../resources/data';
import RenderAllContacts from '../../components/RenderAllContacts/RendarAllContacts';

const contacts = data.boards;

class ContactView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            data: contacts,
            name: '',
            thumbnailPhoto: '',
            text: '',
        }
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.screens}>
                <RenderAllContacts
                    contacts={this.state.data}
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