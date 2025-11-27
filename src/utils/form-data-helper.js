export function objectToFormData(
  obj,
  formData = new FormData(),
  parentKey = ""
) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File) {
        // Handle File objects
        formData.append(formKey, value, value.name);
      } else if (value instanceof FileList) {
        // Handle FileList objects - append without brackets for multer compatibility
        for (let i = 0; i < value.length; i++) {
          formData.append(formKey, value[i], value[i].name);
        }
      } else if (Array.isArray(value) && value.some(item => item instanceof File)) {
        // Handle arrays of File objects - append without brackets for multer compatibility
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append(formKey, file, file.name);
          }
        });
      } else if (
        value &&
        typeof value === "object" &&
        !(value instanceof Date)
      ) {
        // Recursively handle nested objects and arrays
        objectToFormData(value, formData, formKey);
      } else {
        // Handle primitive values (including Date objects)
        formData.append(formKey, value);
      }
    }
  }
  return formData;
}
