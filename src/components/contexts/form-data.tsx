import { createContext } from "react";

export const createFormContext = () => {
  // Default context
  type Qual = {
    key: string;
    value: string;
  };

  let formData: Qual[] = [
    {
      key: "Daily Salary Range",
      value: "Php 550 - Php 800",
    },
    {
      key: "Years of Experience",
      value: "at least 7 years",
    },
    {
      key: "Agency Rate (per day)",
      value: "Php 40 - Php 60",
    },
  ];

  // Returns value of that field
  const getField = (field: string) => {
    return formData.filter((f: Qual) => f.key === field)[0]?.value;
  };

  // Updater for form data
  const setField = (field: string, value: string) => {
    let i = 0;

    // Find field
    for (i = 0; i < formData.length; i++) {
      if (formData[i].key === field) break;
    }

    // Modify found field
    if (i < formData.length) formData[i].value = value;
    else formData.push({ key: field, value: value });

    // Force update
    formData = [...formData];
  };

  // Rename field
  const renameField = (field: string, newname: string) => {
    let i;

    for (i = 0; i < formData.length; i++) {
      if (formData[i].key === field) break;
    }

    // Push new field and new value
    if (i < formData.length) formData[i].key = newname;
    else formData.push({ key: newname, value: "" });

    // Force update
    formData = [...formData];
  };

  // Remove existing field
  const removeField = (field: string) => {
    formData = formData.filter((f: Qual) => f.key !== field);
  };

  // Gets serialized data, to send to server when done
  const getAll = (): Qual[] => {
    return formData;
  };

  // Create new context + its data
  return {
    getField,
    setField,
    getAll,
    renameField,
    removeField,
  };
};

export const FormContext = createContext(createFormContext());
