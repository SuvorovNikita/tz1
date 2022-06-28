// Scroll to Top

function up() {
  let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  let t;
  if (top > 0) {
    window.scrollBy(0, (top + 100) / -10);
    t = setTimeout('up()', 20);
  } else {
    clearTimeout(t);
  }

  return false;
}

function buttonTopCheck() {
  const el = document.querySelector('[data-el="scroll-top"]');
  if (document.documentElement.scrollHeight !== document.documentElement.offsetHeight) {
    el.classList.add('button-top__hidden');
  } else {
    el.classList.remove('button-top__hidden');
  }
}

buttonTopCheck();
window.addEventListener('resize', function () {
  buttonTopCheck();
});

// Filters state

let currentFilter = {
  room: 1,
  price: [5000, 200000],
  area: [33, 123],
};

let currentOrder = {
  priceUp: 1,
};

// Get and render data from JSON

function updateData() {
  fetch('data-1.json')
    .then((response) => response.json())
    .then((data) => {
      renderData(data, true);
    });
}

function initData() {
  fetch('data-1.json')
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    });
}

function renderData(data, isUpdate) {
  const tplTableEl = document.querySelector('[data-el="tpl-table-el"]');
  const tplCardEl = document.querySelector('[data-el="tpl-card-el"]');

  if (isUpdate) {
    while (tplTableEl.parentElement.children.length > 1) {
      tplTableEl.parentElement.removeChild(tplTableEl.parentElement.lastChild);
    }
    while (tplCardEl.parentElement.children.length > 1) {
      tplCardEl.parentElement.removeChild(tplCardEl.parentElement.lastChild);
    }
  }

  for (let i = 0; i < data.data.length; i++) {
    const item = data.data[i];
    const newItemTable = tplTableEl?.content.cloneNode(true);
    const newItemCard = tplCardEl?.content.cloneNode(true);
    newItemTable.querySelector('[data-el="image"]').src = item.image;
    newItemTable.querySelector('[data-el="title"]').innerHTML = item.name;
    newItemTable.querySelector('[data-el="area"]').innerHTML = item.area;
    newItemTable.querySelector('[data-el="floor"]').innerHTML = item.floor;
    newItemTable.querySelector('[data-el="maxFloor"]').innerHTML = item.maxFloor;
    newItemTable.querySelector('[data-el="price"]').innerHTML = item.price;
    newItemCard.querySelector('[data-el="image"]').src = item.image;
    newItemCard.querySelector('[data-el="title"]').innerHTML = item.name;
    newItemCard.querySelector('[data-el="area"]').innerHTML = item.area;
    newItemCard.querySelector('[data-el="floor"]').innerHTML = item.floor;
    newItemCard.querySelector('[data-el="maxFloor"]').innerHTML = item.maxFloor;
    newItemCard.querySelector('[data-el="price"]').innerHTML = item.price;

    tplTableEl.parentElement.append(newItemTable);
    tplCardEl.parentElement.append(newItemCard);
  }
}

initData();

// Load more

let pages = 1;
const loadMore = document.querySelector('[data-el="get-more-items"]');
loadMore.addEventListener('click', function () {
  if (pages > 0) {
    initData();
  } else {
    loadMore.style.display = 'none';
  }
  pages--;
});

const changeFilterRoom = document.querySelector('[data-el="get-more-active"]');
changeFilterRoom.onclick = function click() {
  changeFilterRoom.classList.toggle('button-circle--active');
  changeFilterRoom.classList.remove('');
};
