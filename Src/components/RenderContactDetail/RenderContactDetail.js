import React from 'react';
import { Text, Image, View } from 'react-native';

import styles from './styles';

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
            <Text style={styles.info}> {contact.phonenumber} </Text>
        </View>
    );
}

export default RenderContactDetail;