import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppContainer from './src/routes';

export default function App() {
	return (
		<View style={styles.screens}>
			<AppContainer />
		</View>
	);
}

const styles = StyleSheet.create({
	screens: {
		flex: 1
	}
});