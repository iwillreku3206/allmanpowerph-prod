import { createContext } from "react";

export const createFormContext = () => {

	// Default context
	const formData: any = {};

	// Returns value of that field
	const getField = (field: string) => {
		return formData[field];
	}

	// Updater for form data
	const setField = (field: string, value: string) => {
		console.log(field, value)
		formData[field] = value;
	}

	// Gets serialized data, to send to server when done
	const getJSON = () => {
		return JSON.stringify(formData);
	}
	
	// Create new context + its data
	return {
		getField,
		setField,
		getJSON,
	}
}

export const FormContext = createContext(createFormContext());