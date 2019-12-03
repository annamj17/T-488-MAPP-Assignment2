import React from 'react';
import { SearchBar as NativeSearchBar } from 'react-native-elements';

const SearchBar = ({ value, onSearch }) => (
    <NativeSearchBar
        round
        lightTheme
        placeholder="Type Here..."
        onChangeText={onSearch}
        // onClearText={someMethod}
        value={value}
        showLoading={false}
        containerStyle={{ borderWidth: 1, borderRadius: 5 }}
    />
);

export default SearchBar;