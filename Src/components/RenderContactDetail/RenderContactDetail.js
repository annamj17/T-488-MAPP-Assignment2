import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, FlatList, View, List } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import { getContentUriAsync } from 'expo-file-system';

const RenderContactDetail = ({ contact }) => {
    console.log("hallo", contact);
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

            <TouchableOpacity style={styles.buttonContainer}>
                <Text>Edit</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "gray",
      //backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "gray",
      //color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "gray",
      //backgroundColor: "#00BFFF",
    },
  });

export default RenderContactDetail;