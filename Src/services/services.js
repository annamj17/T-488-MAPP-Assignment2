import * as FileSystem from 'expo-file-system';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

const onException = (cb) => {
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
	return onException(() => FileSystem.deleteAsync(`${contactsDirectory}/${fileName}`, { idempotent: true }));
};

// So filename is a valid string
export function makeValidStringForFileName(str) {
	const validString = str.replace(/\s/g, '')
	return validString.replace(/[^A-Za-z0-9\s-]/g, '');
};

export const addContact = async contactLocation => {
	const fileName = makeValidStringForFileName(contactLocation.name);
	const contJson = JSON.stringify(contactLocation);
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

		if (data[i].phoneNumbers !== undefined) {
			newContactOS.phone = data[i].phoneNumbers[0].number;

		} 
		else {
			newContactOS.phone = '';
		}
		if (data[i].imageAvailable == true) {
			newContactOS.imageUri = data[i].image.uri;
		}
		else {
			newContactOS.imageUri = 'https://www.clipartwiki.com/clipimg/detail/149-1490051_computer-icons-user-profile-male-my-profile-icon.png';
		}
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