import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	icon: {
		fontSize: 60,
		marginLeft: 10,
		marginRight: 10
	},
	iconLayout: {
		flexDirection: "row"
	},
	image: {
		alignSelf: 'center',
		height: 150,
		width: 150,
		borderWidth: 1,
		borderRadius: 75,
		marginTop: 10
	},
	myModal: {
		justifyContent: 'center',
		borderRadius: 30,
		shadowRadius: 10,
		height: 280
	},
	textInput: {
		height: 40,
		borderBottomColor: 'gray',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		marginBottom: 20,
		borderBottomWidth: 1,
		textAlign: "auto"
	},
	textStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		alignSelf: "auto"
	},
	submitButton: {
		fontSize: 18,
		color: 'white',
		padding: 8,
		height: 40,
		borderRadius: 6
	}
});