import * as FileSystem from 'expo-file-system';
const contactsDirectory = `${FileSystem.documentDirectory}contacts`;

const onException = (cb, errorHandler) => {
	try {
		return cb();
	} catch (err) {
		if (errorHandler) {
			return errorHandler(err);
		}
		console.error(err);
	}
};

export const writeToFile = async (file, newLocation) => {
	onException(() => FileSystem.writeAsStringAsync(newLocation, file));
};

// So filname is a valid string
function makeValidStringForFileName(str) {
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

// A Promise that resolves to an array of strings, each containing the name of a file or directory contained in the directory at fileUri.
export const getAllContacts = async () => {
	await setupDirectory();

	const result = await onException(() => FileSystem.readDirectoryAsync(contactsDirectory));
	let newJsContact = {};
	return Promise.all(result.map(async (fileName) => {
		newJsContact = JSON.parse(await loadContact(fileName));
		return newJsContact;
	}));
};