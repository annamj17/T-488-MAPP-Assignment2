import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AddModal from '../../components/AddModal/AddModal';
import { getAllContacts } from '../../services/services';
import RenderContactDetail from '../../components/RenderContactDetail/RenderContactDetail';

let contacts = [];

class ContactDetailView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: () => (
                <Button
                    onPress={navigation.getParam('openModal')}
                    title="Edit"
                    color="#fff"
                />
            ),
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            isAddModalOpen: false,
            modal: true
        }
    };

    async componentDidMount() {
        this.props.navigation.setParams({ openModal: this._openModal });
        await this._fetchItems();
    };

    async _fetchItems() {
        const { navigation } = this.props;
        contacts = await getAllContacts();
        const contactIdent = navigation.getParam('name', 0);
        this.setState({
            contact: contacts.find(c => c.name === contactIdent)
        });
    };

    _openModal = () => {
        this.setState({ modal: this.state.isAddModalOpen = true });
    };

    render() {
        const { isAddModalOpen } = this.state;
        return (
            <View style={styles.screens}>
                <RenderContactDetail
                    contact={this.state.contact}
                />
                <AddModal
                    isOpen={isAddModalOpen}
                    closeModal={() => this.setState({ isAddModalOpen: false })}
                // takePhoto={() => this.takePhoto()}
                // selectFromCameraRoll={() => this.selectFromCameraRoll()} 
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    screens: {
        flex: 1
    }
});

export default ContactDetailView;
