// Fetch the items from JSON file
function loadItems() {
  return fetch('items.json') //
    .then(response => response.json())
    .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.lists');
  container.innerHTML = items.map(item => createHtmlString(item)).join('');
}

// Create HTML list item from the given data item
function createHtmlString(item) {
  return `
  <li class="item">
    <img src=${item.img} alt=${item.type}>
    <span>${item.gender}, ${item.size}</span>
  </li>
  `;
}

// Handle button click
function onButtonClick(event, items) {
  const dataSet = event.target.dataset;
  console.log(dataSet);
  const key = dataSet.key;
  const value = dataSet.value;

  if (key == null || value == null) {
    return;
  }

  //updateItems(items, key, value);
  displayItems(items.filter(item => item[key] === value));
}

function updateItems(items, key, value) {
  items.forEach(item => {
    if (item[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.selectors');

  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));

  /* inefficient
  const blueItems = items.filter(item => item.color === 'blue');
  const blueBtn = document.querySelector('.selectors .blue');

  const yellowItems = items.filter(item => item.color === 'yellow');
  const yellowBtn = document.querySelector('.selectors .yellow');

  const pinkItems = items.filter(item => item.color === 'pink');
  const pinkBtn = document.querySelector('.selectors .pink');

  blueBtn.addEventListener('click', () => displayItems(blueItems));
  yellowBtn.addEventListener('click', () => displayItems(yellowItems));
  pinkBtn.addEventListener('click', () => displayItems(pinkItems));
  */
}

// main
loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
