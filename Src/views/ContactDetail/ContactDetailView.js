import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import AddModal from '../../components/AddModal/AddModal';

import data from '../../resources/data';
import RenderContactDetail from '../../components/RenderContactDetail/RenderContactDetail';

const contacts = data.contacts;

class ContactDetailView extends React.Component {

    static navigationOptions = ({ navigation }) => {
		return {
			// headerTitle: () => <LogoTitle />,
			headerRight: () => (
				<Button
					onPress={ navigation.getParam('openModal')}
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
        const { navigation } = this.props;
        const contactIdent = navigation.getParam('id', 0);
        this.setState({
            contact: contacts.find(c => c.id === contactIdent)
            //contact: console.log(contacts.filter(c => c.id === contactIdent))
        });
        this.props.navigation.setParams({ openModal: this._openModal });
    };

    _openModal = () => {
		this.setState({ modal: this.state.isAddModalOpen=true });
	};

    render() {
        const { navigate } = this.props.navigation;
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