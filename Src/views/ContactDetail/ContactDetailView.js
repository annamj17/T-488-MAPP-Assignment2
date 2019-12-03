import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import data from '../../resources/data';

const contacts = data.contacts;

class ContactDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: [],
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const boardsIdent = navigation.getParam('id', 0);
        this.setState({
            contact: console.log(contacts.filter(c => c.id === boardsIdent))
        });
    };

    render() {
        return (
            <View style={styles.screens}>
                <Text>HALLO</Text>
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