import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        backgroundColor: "black",
        //backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 35,
        color: "#696969",
        fontWeight: "600",
        textDecorationLine: "underline"
    },
    info: {
        fontSize: 19,
        color: "black",
        marginTop: 30
    }
});
