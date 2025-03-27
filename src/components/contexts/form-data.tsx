import { createContext } from "react";

export const createFormContext = () => {

	// Default context
	type Qual = { 
		key: string, 
		value: string 
	}

	let formData: any = [
		{
			key: 'monthly salary range',
			value: 'Php 8000 - Php 15000'
		}, {
			key: 'skills',
			value: 'cooking, cleaning',
		}
	];

	// Returns value of that field
	const getField = (field: string) => {
		return formData.filter((f: Qual) => f.key === field)[0]?.value;
	}

	// Updater for form data
	const setField = (field: string, value: string) => {

		// Remove existing field
		const newFormData = formData.filter((f: Qual) => f.key !== field);
		
		// Push new value for field
		newFormData.push({
			key: field,
			value: value
		});

		// Update form data
		formData = newFormData
	}

	// Rename field
	const renameField = (field: string, newname: string) => {
		
		// Remove existing field
		const oldFieldValue = getField(field);
		const newFormData = formData.filter((f: Qual) => f.key !== field);

		// Push new field and new value
		newFormData.push({
			key: newname,
			value: oldFieldValue,
		})

		// Update form data
		formData = newFormData
	}

	// Remove existing field
	const removeField = (field: string) => {
		formData = formData.filter((f: Qual) => f.key !== field)
	}

	// Gets serialized data, to send to server when done
	const getAll = (): Qual[] => {
		return formData;
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