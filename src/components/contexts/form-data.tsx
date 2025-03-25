import { createContext } from "react";

export const createFormContext = () => {

	// Default context
	type Qual = { [key: string]: string | undefined };
	const formData: any = {
		'price range': '8000-15000',
		'skills': 'cooking, cleaning',
	};

	// Returns value of that field
	const getField = (field: string) => {
		return formData[field];
	}

	// Updater for form data
	const setField = (field: string, value: string) => {
		formData[field] = value;
	}

	// Rename field
	const renameField = (field: string, newname: string) => {
		formData[newname] = formData[field]
		delete formData[field];
	}

	// Remove existing field
	const removeField = (field: string) => {
		delete formData[field]
	}

	// Gets serialized data, to send to server when done
	const getAll = (): Qual[] => {
		return Object.keys(formData)
			.map(key => ({ [key]: formData[key] }));
	}
	
	// Create new context + its data
	return {
		getField,
		setField,
		getAll,
		renameField,
		removeField,
	}
}

export const FormContext = createContext(createFormContext());