const additionalFormatting = (value, field) => {
  if (
    (field.startsWith("start") || field.startsWith("end")) &&
    (value === "Year" || value === "Month" || value === "Day")
  )
    return null;
  else if (field === "order") return new Date(value);
  else return value;
};

const formatFormData = (fields, form) => {
  return fields.reduce((input, field) => {
    const fieldValue =
      form[field]?.type === "checkbox" || form[field]?.type ==="radio"
        ? additionalFormatting(form[field]?.checked, field)
        : additionalFormatting(form[field]?.value, field);

    return fieldValue || form[field]?.type === "checkbox"
      ? {
          [field]: fieldValue,
          ...input,
        }
      : input;
  }, {});
};

export default formatFormData