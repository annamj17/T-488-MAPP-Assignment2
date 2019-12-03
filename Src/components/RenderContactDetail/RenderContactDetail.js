import React from 'react';
import { Text, Image, TouchableOpacity, FlatList, View, List } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { getContentUriAsync } from 'expo-file-system';
import styles from './styles';

const RenderContactDetail = ({ contact }) => {
    console.log(contact);
    return (
        
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: contact.imageFile }} />
            <View style={styles.body}>
            <View style={styles.bodyContent}>
            </View>
            </View>
            <Text style={styles.name}> {contact.name} </Text>
            <Text style={styles.info}> {contact.phone} </Text>
            {/* <TouchableOpacity style={styles.buttonContainer}>
                <Text>Edit</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default RenderContactDetail;