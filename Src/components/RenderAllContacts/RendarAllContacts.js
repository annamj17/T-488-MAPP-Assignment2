import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { ListItem } from 'react-native-elements';

const RenderAllContacts = ({ contacts, onPress, onLongPress, extraData }) => {

	return (
		<View>
			<FlatList
				data={contacts}
				extraData={extraData}
				renderItem={({ item: { name, phone, imageUri, imageFile }, index }) => (
					<ListItem
						title={name}
						index={index}
						leftAvatar={{
							source: { uri: imageUri },
							size: "large",
							containerStyle: { marginTop: 5 }
						}}
						rightAvatar={{
							source: { uri: imageFile },
							containerStyle: { marginTop: 5 }
						}}
						subtitle={phone}
						bottomDivider
						chevron
						onPress={() => onPress(name)} >
						{console.log(imageFile)}
					</ListItem>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}
styles = {
	image: {
		width: 115,
		height: 115,
		margin: 10
	},
}

export default RenderAllContacts;