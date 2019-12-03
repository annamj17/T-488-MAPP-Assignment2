import * as FileSystem from 'expo-file-system';
const imageDirectory = `${FileSystem.documentDirectory}contacts`;
import data from '../resources/data'

const onException = (cb, errorHandler) => {
	try {
		return cb();
	} catch (err) {
		if (errorHandler) {
			return errorHandler(err);
		}
		console.error(err);
	}
}

export const newContact = async () => {
	let fileUri = FileSystem.documentDirectory + "text.txt";
	return await FileSystem.writeAsStringAsync(fileUri, "Hello World", { encoding: FileSystem.EncodingType.UTF8 });
}

export const getAllContacts = async () => {
	//return await data;
	return contacts = [{
		"id": "1",
		"name": "Contact name", //this.state.name,
		"phone": "(687) 33465778",// this.state.description,
		"imageUri": "http://dummyimage.com/181x213.png/ff4444/ffffff",
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB/SURBVCjPpVFBDkBADJyKJ3mEk1d4goPPeYDgN2QtidFdFidZ0UnbZDszbbJCvEeCv4TUlVr3EKvCKmYYhau9AMIYh4oLFq8N6lYCIc6h5PzYbLyTVc8p+oaCQWu81mL8eEPzYNEnsWnP5SQA2fnsBkcSw+1AdJfqGN4hv39zB9EXSdykB4lxAAAAAElFTkSuQmCC"
	}]
}

export const cleanDirectory = async () => {
	await FileSystem.deleteAsync(imageDirectory);
}

export const copyFile = async (file, newLocation) => {
	return await onException(() => FileSystem.copyAsync({
		from: file,
		to: newLocation
	}));
}

export const addImage = async imageLocation => {
	const folderSplit = imageLocation.split('/');
	const fileName = folderSplit[folderSplit.length - 1];
	await onException(() => copyFile(imageLocation, `${imageDirectory}/${fileName}`));

	return {
		name: fileName,
		type: 'image',
		file: await loadImage(fileName)
	};
}

export const remove = async name => {
	return await onException(() => FileSystem.deleteAsync(`${imageDirectory}/${name}`, { idempotent: true }));
}

export const loadImage = async fileName => {
	return await onException(() => FileSystem.readAsStringAsync(`${imageDirectory}/${fileName}`, {
		encoding: FileSystem.EncodingType.Base64
	}));
}

const setupDirectory = async () => {
	const dir = await FileSystem.getInfoAsync(imageDirectory);
	if (!dir.exists) {
		await FileSystem.makeDirectoryAsync(imageDirectory);
	}
}

export const getAllImages = async () => {
	// Check if directory exists
	await setupDirectory();

	const result = await onException(() => FileSystem.readDirectoryAsync(imageDirectory));
	return Promise.all(result.map(async fileName => {
		return {
			name: fileName,
			type: 'image',
			file: await loadImage(fileName)
		};
	}));
}