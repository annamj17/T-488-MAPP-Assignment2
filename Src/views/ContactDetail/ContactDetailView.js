import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class ContactDetailView extends React.Component {


    render() {
        const { navigate } = this.props.navigation;
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