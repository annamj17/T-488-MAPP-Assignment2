import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ContactView from '../views/Contact/ContactView';
import ContactDetailView from '../views/ContactDetail/ContactDetailView';

const StackNavigator = createStackNavigator({
    ContactView: ContactView,
    ContactDetailView: ContactDetailView
}, {

    defaultNavigationOptions: {
        headerTitle: "Contacts",
        headerStyle: {
            height: 70,
            backgroundColor: 'gray',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
        },
        headerBackTitle: "contacts",
        headerTintColor: '#fff',
    }
}

);

export default createAppContainer(StackNavigator);