import { StyleSheet, Dimensions } from 'react-native';

const { width: winWidth } = Dimensions.get('window');

export default StyleSheet.create({
	icon: {
		fontSize: 60,
		// marginTop: 20,
		// marginBottom: 20
		marginLeft: 10,
		marginRight: 10,
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
		marginTop: 10,
	},
	myModal: {
		justifyContent: 'center',
		borderRadius: 30,
		shadowRadius: 10,
		//width: winWidth - 80,
		height: 280,
	},
	textInput: {
		height: 40,
		borderBottomColor: 'gray',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		marginBottom: 20,
		borderBottomWidth: 1,
		textAlign: "auto",
		// alignSelf: 'stretch',
		// color: 'black',
		// alignItems: 'center',
		// alignContent: 'center',
		// backgroundColor: 'black',
		// fontSize: 18,
		// left: 30
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
		// marginLeft: 70,
		// marginRight: 70,
		height: 40,
		borderRadius: 6,
		backgroundColor: 'gray'
	}
});