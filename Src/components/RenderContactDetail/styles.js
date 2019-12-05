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
		flex: 1,
		marginTop: 60,
	},
	bodyContent: {
		flex: 1,
		alignItems: 'center',
		padding: 30,
		paddingBottom: 20,
		borderWidth: 1,
		borderColor: 'gray',
	},
	name: {
		fontSize: 35,
		color: "#696969",
		fontWeight: "600",
		alignSelf: 'center',
		justifyContent: 'center'
	},
	info: {
		fontSize: 20,
		color: "gray",
		marginTop: 40,
		borderWidth: 1,
		borderColor: 'gray',
	},
	icon: {
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20
	}
});