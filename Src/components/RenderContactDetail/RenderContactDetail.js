import React from 'react';
import { Text, Image, View, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import { Linking } from 'react-native'

const RenderContactDetail = ({ contact }) => {

	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<Image style={styles.avatar} source={{ uri: contact.image }} />
			<View style={styles.body}>
				<View style={styles.bodyContent}>
				</View>
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