const table = document.getElementById('myTable');
const tbody = table.querySelector('tbody');
const colorPicker = document.getElementById('colorPicker');
let selectedCell = null;
let selectedRow = null;

let counter = 1;
for (let i = 0; i < 6; i++) {
  const row = document.createElement('tr');
  for (let j = 0; j < 6; j++) {
    const cell = document.createElement('td');
    cell.textContent = counter;
    cell.id = counter;
    cell.setAttribute('row-id', i);
    row.appendChild(cell);
    counter++;
  }
  tbody.appendChild(row);
}

const cells = document.querySelectorAll('td');

colorPicker.addEventListener('input', () => {
  const selectedColor = colorPicker.value;
  if (selectedCell) {
    selectedCell.style.backgroundColor = selectedColor;
    selectedCell.setAttribute('data-color', selectedColor);
  }
  if (selectedRow) {
    const mod = selectedRow % 2;
    cells.forEach((cell) => {
      if (cell.getAttribute('row-id') % 2 == mod) {
        cell.style.backgroundColor = selectedColor;
        cell.setAttribute('data-color', selectedColor);
      }
    });
  }
});

cells.forEach((cell) => {
  cell.setAttribute('data-default-color', cell.style.backgroundColor);

  cell.addEventListener('click', () => {
    selectedRow = null;
    selectedCell = cell;
    colorPicker.click();
  });

  cell.addEventListener('dblclick', () => {
    selectedRow = cell.getAttribute('row-id');
    selectedCell = null;
    colorPicker.click();
  });

  cell.addEventListener('mouseover', () => {
    cell.style.backgroundColor = getRandomColor();
    cell.setAttribute('data-color', cell.style.backgroundColor)
  });

  cell.addEventListener('mouseout', () => {
    const selectedColor = cell.getAttribute('data-color');
    if (selectedColor) {
      cell.style.backgroundColor = selectedColor;
    } else {
      cell.style.backgroundColor = cell.getAttribute('data-default-color');
    }
  });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
