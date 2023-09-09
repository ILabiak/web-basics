const pibRegex =
  /^[А-ЯҐЄІЇа-яґєії]{2,15}\s[А-ЯҐЄІЇа-яґєії]{2,15}(?:\s[А-ЯҐЄІЇа-яґєії]{2,15})$/;
const variantRegex = /[0-9]+/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

function submitForm() {
  event.preventDefault();

  const pibValue = document.getElementById('pib').value;
  const variantValue = document.getElementById('variant').value;
  const phoneValue = document.getElementById('phone').value;
  const facultyValue = document.getElementById('faculty').value;
  const addressValue = document.getElementById('address').value;

  let isValid = true;

  if (!validatePIB(pibValue)) {
    document.getElementById('pib').classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('pib').classList.remove('invalid');
  }

  if (!validateVariant(variantValue)) {
    document.getElementById('variant').classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('variant').classList.remove('invalid');
  }

  if (!validatePhone(phoneValue)) {
    document.getElementById('phone').classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('phone').classList.remove('invalid');
  }

  if (!validateFaculty(facultyValue)) {
    document.getElementById('faculty').classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('faculty').classList.remove('invalid');
  }

  if (!validateAdress(addressValue)) {
    document.getElementById('address').classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('address').classList.remove('invalid');
  }

  if (isValid) {
    document.getElementById('displayPib').textContent = pibValue;
    document.getElementById('displayVariant').textContent = variantValue;
    document.getElementById('displayPhone').textContent = phoneValue;
    document.getElementById('displayFaculty').textContent = facultyValue;
    document.getElementById('displayAddress').textContent = addressValue;
  }
}

function validatePIB(str) {
  return pibRegex.test(str);
}

function validateVariant(str) {
  return variantRegex.test(str) && parseInt(str) > 0 && parseInt(str) < 11;
}

function validatePhone(str) {
  return phoneRegex.test(str);
}

function validateFaculty(str) {
  return str.length > 3;
}

function validateAdress(str) {
  return str.length > 3;
}
