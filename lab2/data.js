const validationRules = {
  pib: /^[А-ЯҐЄІЇа-яґєії]{2,15}\s[А-ЯҐЄІЇ].[А-ЯҐЄІЇ].$/,
  variant: /^[0-9]{1,2}$/,
  phone: /^[(][0-9]{3}[)]-[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
  faculty: /^[А-ЯҐЄІЇа-яґєії]{2,4}$/,
  address: /^м.\s[А-ЯҐЄІЇа-яґєії]{3,20}$/,
};

function submitForm() {
  event.preventDefault();

  const pibValue = document.getElementById('pib').value;
  const variantValue = document.getElementById('variant').value;
  const phoneValue = document.getElementById('phone').value;
  const facultyValue = document.getElementById('faculty').value;
  const addressValue = document.getElementById('address').value;

  let isValid = true;

  for (const field in validationRules) {
    const value = document.getElementById(field).value;
    const isValidField = validateField(field, value);

    if (!isValidField) {
      document.getElementById(field).classList.add('invalid');
      isValid = false;
    } else {
      document.getElementById(field).classList.remove('invalid');
    }
  }

  if (isValid) {
    document.getElementById('displayPib').textContent = pibValue;
    document.getElementById('displayVariant').textContent = variantValue;
    document.getElementById('displayPhone').textContent = phoneValue;
    document.getElementById('displayFaculty').textContent = facultyValue;
    document.getElementById('displayAddress').textContent = addressValue;
  }
}

function validateField(fieldName, value) {
  return validationRules[fieldName].test(value);
}
