import React from 'react';
import { SearchBar } from 'react-native-elements';
import data from '../../resources/data';

const contacts = data.contacts;

export default class App extends React.Component {
    state = {
        search: '',
        data: contacts,
        filteredData: []
    };

    updateSearch = search => {
        this.setState({ search: search });
        let filteredData = this.state.data.filter(function (item) {
            return item.name.includes(search);
        });
        this.setState({ filteredData: filteredData });
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                round
                lightTheme
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                // onClearText={someMethod}
                value={search}
                showLoading={false}
                containerStyle={{ borderWidth: 1, borderRadius: 5 }}
            />
        );
    }
}