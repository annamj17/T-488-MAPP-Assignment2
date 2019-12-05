import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const RenderAllContacts = ({ contacts, onPress }) => {
	return (
		<View>
			<FlatList
				data={contacts}
				extraData={contacts}
				renderItem={({ item: { name, imageUri }, index }) => (
					<ListItem
						title={name}
						index={index}
						leftAvatar={{
							source: { uri: imageUri },
							size: "large",
							containerStyle: { marginTop: 5 }
						}}
						bottomDivider
						chevron
						onPress={() => onPress(name)}
					/>
				)}
				keyExtractor={item => item.name.toString()}
			/>
		</View>
	);
}

export default RenderAllContacts;