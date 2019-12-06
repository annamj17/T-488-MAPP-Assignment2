import React from 'react';
import { Text, Image, View, TouchableOpacity, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import styles from './styles';

const RenderContactDetail = ({ contact }) => {

	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<Image style={styles.avatar} source={{ uri: contact.imageUri }} />
			<View style={styles.body}>
				<View style={styles.bodyContent}></View>
			</View>
			<Text style={styles.name}> {contact.name} </Text>
			<TouchableOpacity
				onPress={() => { Linking.openURL(`tel:${contact.phone}`); }}>
				<Text style={styles.info}> {contact.phone}
					<Entypo style={styles.icon} name="phone" />
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default RenderContactDetail;