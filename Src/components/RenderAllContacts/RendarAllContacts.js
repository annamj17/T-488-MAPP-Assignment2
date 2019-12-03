import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const RenderAllContacts = ({ contacts, onPress }) => {

    return (
        <View>
            <FlatList
                data={contacts}
                // extraData={extraData}
                renderItem={({ item: { id, name, imageUri }, index }) => (
                    <ListItem
                        id={id}
                        title={name}
                        index={index}
                        leftAvatar={{
                            source: { uri: imageUri },
                            size: "medium",
                            containerStyle: { marginTop: 5 }
                        }}
                        bottomDivider
                        chevron
                        onPress={() => onPress(id)}
                    // extraData={name}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

export default RenderAllContacts;