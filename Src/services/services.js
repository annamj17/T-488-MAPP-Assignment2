import * as FileSystem from 'expo-file-system';
const contactsDirectory = `${FileSystem.documentDirectory}contacts`;
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';


const onException = (cb, errorHandler) => {
	try {
		return cb();
	} catch (err) {
		console.error(err);
	}
};

export const writeToFile = async (file, newLocation) => {
	onException(() => FileSystem.writeAsStringAsync(newLocation, file));
};
export const removeContact = async fileName => {
	console.log("removeContact>Dirname ", `${contactsDirectory}/${fileName}`);
	return onException(() => FileSystem.deleteAsync(`${contactsDirectory}/${fileName}`, { idempotent: true }));
};

// So filename is a valid string
export function makeValidStringForFileName(str) {
	const validString = str.replace(/\s/g, '')
	return validString.replace(/[^A-Za-z0-9\s-]/g, '');
};

export const addContact = async contactLocation => {
	const fileName = makeValidStringForFileName(contactLocation.name);
	console.log("addContact>fileName", fileName);
	const contJson = JSON.stringify(contactLocation);
	console.log("addContact>contJson", contJson);
	await onException(() => writeToFile(contJson, `${contactsDirectory}/${fileName}`));
};

// Read the entire contents of a file as a string. Binary will be returned in raw format, you will need to append data:image/png;base64, to use it as Base64.
export const loadContact = async fileName => {
	return await onException(() => FileSystem.readAsStringAsync(`${contactsDirectory}/${fileName}`));
};

// Create a new empty directory. 
// Is able to read from (but not write to) other locations.
const setupDirectory = async () => {
	const dir = await FileSystem.getInfoAsync(contactsDirectory);
	if (!dir.exists) {
		await FileSystem.makeDirectoryAsync(contactsDirectory);
	}
};

function getDataFromContactOS(data) {
	const contacts = [];
	let newContactOS = {};
	for (let i = 1; i < data.length; i += 1) {
		newContactOS.name = data[i].name;
		//console.log(data[i].name);

		if (data[i].phoneNumbers !== undefined) {
			newContactOS.phone = data[i].phoneNumbers[0].number;
			//console.log(data[i].phoneNumbers[0].number);
		} else {
			newContactOS.phone = '';
		}
		//newContactOS.phoneNumber = data[i].phoneNumbers[0].number;
		//console.log(data[i].phoneNumbers[0].number);

		if (data[i].imageAvailable == true) {
			newContactOS.imageUri = data[i].image.uri;
		}
		else {
			newContactOS.imageUri = 'https://www.clipartwiki.com/clipimg/detail/149-1490051_computer-icons-user-profile-male-my-profile-icon.png';
		}
		//newContactOS.image = data[i].images[0].image;
		//console.log(data[i].images[0].image);

		contacts.push(newContactOS);
		newContactOS = {};
	}
	return contacts;
}

// A Promise that resolves to an array of strings, each containing the name of a file or directory contained in the directory at fileUri.
export const getAllContacts = async () => {
	await setupDirectory();

	let newContactOSArray = [];
	const { status } = await Permissions.askAsync(Permissions.CONTACTS);
	if (status === 'granted') {
		const { data } = await Contacts.getContactsAsync({
			fields: [
				Contacts.Fields.Name,
				Contacts.Fields.PhoneNumbers,
				Contacts.Fields.Image
			],
		});

		newContactOSArray = (getDataFromContactOS(data));
		newContactOSArray.map(async (contact) => {
			await addContact(contact);
		});
	}
	const result = await onException(() => FileSystem.readDirectoryAsync(contactsDirectory));
	return Promise.all(result.map(async (fileName) => {
		return JSON.parse(await loadContact(fileName));
	}));
};