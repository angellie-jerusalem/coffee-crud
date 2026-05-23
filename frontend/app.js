const API = '../api/menu';
let allItems = [];
let currentFilter = 'All';
let isAvailable = true;
let isEditing = false;

function toggleAvailable() {
  isAvailable = !isAvailable;
  const btn = document.getElementById('toggleAvail');
  btn.classList.toggle('on', isAvailable);
}

function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = isError ? '#C0392B' : '#2C1A0E';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

async function loadItems() {
  try {
    const res = await fetch(`${API}/read.php`);
    const json = await res.json();
    allItems = json.data || [];
    renderCards();
    updateStats();
  } catch (e) {
    showToast('Cannot connect to API.', true);
  }
}

function updateStats() {
  document.getElementById('totalCount').textContent = allItems.length;
  document.getElementById('availCount').textContent = allItems.filter(i => i.available).length;
}

function filterBy(cat) {
  currentFilter = cat;
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.textContent === cat);
  });
  renderCards();
}

function renderCards() {
  const container = document.getElementById('menuCards');
  const items = currentFilter === 'All' ? allItems : allItems.filter(i => i.category === currentFilter);

  if (items.length === 0) {
    container.innerHTML = `<div class="empty"><div class="empty-icon"></div><p>No items found.</p></div>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="card">
      <div class="card-category">${item.category}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-desc">${item.description || 'No description.'}</div>
      <div class="card-footer">
        <div class="card-price"><span>₱</span>${parseFloat(item.price).toFixed(2)}</div>
        <span class="badge ${item.available ? 'badge-available' : 'badge-unavailable'}">
          ${item.available ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div class="card-actions">
        <button class="btn-edit" onclick='editItem(${JSON.stringify(item)})'>Edit</button>
        <button class="btn-del" onclick="deleteItem(${item.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function editItem(item) {
  isEditing = true;
  document.getElementById('itemId').value = item.id;
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemCategory').value = item.category;
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('itemDesc').value = item.description || '';
  isAvailable = item.available;
  document.getElementById('toggleAvail').classList.toggle('on', isAvailable);
  document.getElementById('formTitle').textContent = 'Edit Item';
  document.getElementById('submitBtn').textContent = 'Update Item';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  isEditing = false;
  document.getElementById('itemId').value = '';
  document.getElementById('itemName').value = '';
  document.getElementById('itemCategory').value = '';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemDesc').value = '';
  isAvailable = true;
  document.getElementById('toggleAvail').classList.add('on');
  document.getElementById('formTitle').textContent = 'Add New Item';
  document.getElementById('submitBtn').textContent = 'Add Item';
}

async function submitForm() {
  const name = document.getElementById('itemName').value.trim();
  const category = document.getElementById('itemCategory').value;
  const price = document.getElementById('itemPrice').value;
  const description = document.getElementById('itemDesc').value.trim();
  const id = document.getElementById('itemId').value;

  if (!name || !category || !price) {
    showToast('Name, category, and price are required.', true);
    return;
  }

  const payload = { name, category, price: parseFloat(price), description, available: isAvailable ? 1 : 0 };
  const url = isEditing ? `${API}/update.php` : `${API}/create.php`;
  if (isEditing) payload.id = parseInt(id);

  try {
    const res = await fetch(url, {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (json.success) {
      showToast(isEditing ? 'Item updated!' : 'Item added!');
      resetForm();
      loadItems();
    } else {
      showToast(json.message, true);
    }
  } catch (e) {
    showToast('API error.', true);
  }
}

async function deleteItem(id) {
  if (!confirm('Delete this item?')) return;
  try {
    const res = await fetch(`${API}/delete.php`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    if (json.success) {
      showToast('Item deleted.');
      loadItems();
    } else {
      showToast(json.message, true);
    }
  } catch (e) {
    showToast('API error.', true);
  }
}

loadItems();