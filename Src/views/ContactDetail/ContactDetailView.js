import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import data from '../../resources/data';
import RenderContactDetail from '../../components/RenderContactDetail/RenderContactDetail';

const contacts = data.contacts;

class ContactDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: {},
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const contactIdent = navigation.getParam('id', 0);
        this.setState({
            contact: contacts.find(c => c.id === contactIdent)
            //contact: console.log(contacts.filter(c => c.id === contactIdent))
        });
    };

    render() {
        return (
            <View style={styles.screens}>
                <RenderContactDetail
                    contact={this.state.contact}
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

export default ContactDetailView;