/* =====================================================
   MINIMARKET DON PEPE — app.js
   ===================================================== */

/* ---------- USUARIOS ---------- */
const USERS = {
  admin:     { password: 'admin123',   role: 'admin',     name: 'Don Pepe (Admin)' },
  reponedor: { password: 'repo123',    role: 'reponedor', name: 'Carlos (Reponedor)' },
  cliente:   { password: 'cliente123', role: 'cliente',   name: 'María (Cliente)' },
};

/* ---------- PRODUCTOS PREDETERMINADOS ---------- */
const SEED_PRODUCTS = [
  { id: 1,  name: 'Pan baguette',        price: 1200, stock: 20, emoji: '🥖' },
  { id: 2,  name: 'Leche entera 1L',     price: 1100, stock: 30, emoji: '🥛' },
  { id: 3,  name: 'Huevos x12',          price: 3200, stock: 15, emoji: '🥚' },
  { id: 4,  name: 'Manzanas (kg)',        price: 1500, stock: 25, emoji: '🍎' },
  { id: 5,  name: 'Arroz 1kg',           price: 1300, stock: 40, emoji: '🍚' },
  { id: 6,  name: 'Coca-Cola 1.5L',      price: 1800, stock: 18, emoji: '🥤' },
  { id: 7,  name: 'Aceite vegetal 1L',   price: 2400, stock: 12, emoji: '🫙' },
  { id: 8,  name: 'Fideos 500g',         price:  950, stock: 35, emoji: '🍝' },
  { id: 9,  name: 'Detergente 1L',       price: 2100, stock: 20, emoji: '🧴' },
  { id: 10, name: 'Papel higiénico x4',  price: 2800, stock: 22, emoji: '🧻' },
  { id: 11, name: 'Queso laminado 200g', price: 3500, stock: 10, emoji: '🧀' },
  { id: 12, name: 'Yogurt natural',      price:  890, stock: 28, emoji: '🥛' },
];

/* ---------- CATEGORÍAS DE EMOJIS ---------- */
const EMOJI_CATEGORIES = [
  {
    label: '🥖 Panadería y Cereales',
    emojis: ['🥖','🍞','🥐','🧁','🎂','🥣','🌽','🌾','🥨','🍩'],
  },
  {
    label: '🥛 Lácteos',
    emojis: ['🥛','🧀','🧈','🍦','🍨','🍧'],
  },
  {
    label: '🍎 Frutas y Verduras',
    emojis: ['🍎','🍊','🍋','🍇','🍓','🥝','🍅','🥕','🧅','🥦','🥑','🍌','🍑','🍐','🫐','🥬','🫑','🌶️'],
  },
  {
    label: '🥩 Carnes y Proteínas',
    emojis: ['🥩','🍗','🥚','🐟','🍤','🥓','🌭','🍖'],
  },
  {
    label: '🥤 Bebidas',
    emojis: ['🥤','🧃','☕','🧋','🍺','🍷','🥂','🫖','🧊','🍶','🥃'],
  },
  {
    label: '🥫 Conservas y Enlatados',
    emojis: ['🥫','🫙','🍯','🧂','🍚','🍝','🫘'],
  },
  {
    label: '🍫 Snacks y Dulces',
    emojis: ['🍫','🍬','🍭','🥜','🍿','🍪','🧇','🧆','🍡'],
  },
  {
    label: '🧴 Limpieza e Higiene',
    emojis: ['🧴','🧼','🪥','🧹','🧺','🧻','🫧','🪒','🪣','🪠'],
  },
  {
    label: '🛒 General',
    emojis: ['🛒','📦','🏷️','🛍️','💊','🩹','📱','🔋','🧲','🪤'],
  },
];

/* ---------- ESTADO DEL EMOJI PICKER ---------- */
let currentEmoji = '🛒';

/* =====================================================
   ALMACENAMIENTO (localStorage)
   ===================================================== */
function loadProducts() {
  const raw = localStorage.getItem('mm_products');
  let products = raw ? JSON.parse(raw) : [];
  // Si no hay productos (primera vez o todos eliminados), cargar semilla
  if (!products || products.length === 0) {
    products = JSON.parse(JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem('mm_products', JSON.stringify(products));
  }
  return products;
}

function saveProducts(products) {
  localStorage.setItem('mm_products', JSON.stringify(products));
}

function loadPurchases() {
  const raw = localStorage.getItem('mm_purchases');
  return raw ? JSON.parse(raw) : [];
}

function savePurchases(p) {
  localStorage.setItem('mm_purchases', JSON.stringify(p));
}

function getSession() {
  const raw = localStorage.getItem('mm_session');
  return raw ? JSON.parse(raw) : null;
}

function setSession(username) {
  localStorage.setItem('mm_session', JSON.stringify({ username }));
}

function clearSession() {
  localStorage.removeItem('mm_session');
}

/* =====================================================
   UTILIDADES
   ===================================================== */
function fmt(n) {
  return '$' + n.toLocaleString('es-CL');
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

const root = document.getElementById('root');

/* =====================================================
   EMOJI PICKER LOGIC
   ===================================================== */
function buildEmojiPicker() {
  const categoriesHTML = EMOJI_CATEGORIES.map(cat => `
    <div class="emoji-cat-label">${cat.label}</div>
    <div class="emoji-grid">
      ${cat.emojis.map(e =>
        `<button type="button" class="emoji-opt" onclick="selectEmoji('${e}')">${e}</button>`
      ).join('')}
    </div>
  `).join('');

  return `
    <div class="field-group">
      <label>Emoji</label>
      <div class="emoji-picker-wrap" id="emojiPickerWrap">
        <button type="button" class="emoji-btn" id="emojiBtn" onclick="toggleEmojiPicker(event)">
          <span id="selectedEmojiDisplay">${currentEmoji}</span>
          <span class="arrow">▾</span>
        </button>
        <div class="emoji-panel" id="emojiPanel">
          ${categoriesHTML}
        </div>
      </div>
    </div>
  `;
}

function toggleEmojiPicker(e) {
  e.stopPropagation();
  const panel = document.getElementById('emojiPanel');
  if (panel) panel.classList.toggle('open');
}

function selectEmoji(emoji) {
  currentEmoji = emoji;
  const display = document.getElementById('selectedEmojiDisplay');
  if (display) display.textContent = emoji;
  const panel = document.getElementById('emojiPanel');
  if (panel) panel.classList.remove('open');
}

// Cerrar picker al hacer click fuera
document.addEventListener('click', (e) => {
  const panel = document.getElementById('emojiPanel');
  const wrap  = document.getElementById('emojiPickerWrap');
  if (panel && wrap && !wrap.contains(e.target)) {
    panel.classList.remove('open');
  }
});

/* =====================================================
   RENDER: LOGIN
   ===================================================== */
function renderLogin(errorMsg) {
  root.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <h1>🛒 Minimarket Don Pepe</h1>
        <p class="sub">Ingresa para continuar</p>
        ${errorMsg ? `<div class="error-msg">${errorMsg}</div>` : ''}
        <form id="loginForm">
          <label for="username">Usuario</label>
          <input id="username" name="username" autocomplete="username"
                 placeholder="admin / reponedor / cliente" />
          <label for="password">Contraseña</label>
          <input id="password" name="password" type="password"
                 autocomplete="current-password" placeholder="••••••••" />
          <button class="btn" type="submit">Entrar</button>
        </form>
        <div class="demo-users">
          <div><b>admin</b> / admin123 — agrega y elimina productos</div>
          <div><b>reponedor</b> / repo123 — solo agrega productos</div>
          <div><b>cliente</b> / cliente123 — compra productos</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value.trim().toLowerCase();
    const p = document.getElementById('password').value;
    const user = USERS[u];
    if (!user || user.password !== p) {
      renderLogin('Usuario o contraseña incorrectos.');
      return;
    }
    setSession(u);
    renderApp();
  });
}

/* =====================================================
   RENDER: APP (post-login)
   ===================================================== */
function renderApp() {
  const session = getSession();
  if (!session) { renderLogin(); return; }

  const username = session.username;
  const user = USERS[username];
  if (!user) { clearSession(); renderLogin(); return; }

  root.innerHTML = `
    <div class="awning"></div>
    <header>
      <div class="brand">🛒 Minimarket Don Pepe</div>
      <div class="user-pill">
        <span>${user.name}</span>
        <span class="role-badge">${user.role}</span>
        <button class="btn-outline" id="logoutBtn">Salir</button>
      </div>
    </header>
    <main id="main"></main>
  `;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearSession();
    renderLogin();
  });

  if (user.role === 'admin')      renderAdmin();
  else if (user.role === 'reponedor') renderReponedor();
  else                             renderCliente();
}

/* =====================================================
   RENDER: ADMIN
   ===================================================== */
function renderAdmin() {
  currentEmoji = '🛒';
  const products = loadProducts();
  const main = document.getElementById('main');

  main.innerHTML = `
    <div class="section-title">
      <h2>Agregar producto</h2>
      <span>Visible al instante para los clientes</span>
    </div>
    <div class="form-card">
      <form id="addForm" class="form-row">
        <div class="field-group">
          <label>Nombre</label>
          <input id="p_name" placeholder="Ej: Yogurt natural" required />
        </div>
        <div class="field-group">
          <label>Precio ($)</label>
          <input id="p_price" type="number" min="1" placeholder="1000" required />
        </div>
        <div class="field-group">
          <label>Stock</label>
          <input id="p_stock" type="number" min="0" placeholder="10" required />
        </div>
        ${buildEmojiPicker()}
        <button class="btn btn-orange" type="submit" style="align-self:end;white-space:nowrap;">
          ＋ Agregar
        </button>
      </form>
    </div>

    <div class="section-title">
      <h2>Catálogo</h2>
      <span>${products.length} producto(s) · puedes eliminarlos</span>
    </div>
    <div class="grid" id="grid"></div>
  `;

  renderProductGrid(products, { showDelete: true });

  document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addProduct(() => renderAdmin());
  });
}

/* =====================================================
   RENDER: REPONEDOR
   ===================================================== */
function renderReponedor() {
  currentEmoji = '🛒';
  const products = loadProducts();
  const main = document.getElementById('main');

  main.innerHTML = `
    <div class="section-title">
      <h2>Agregar producto</h2>
      <span>Los productos quedan disponibles para la venta</span>
    </div>
    <div class="form-card">
      <form id="addForm" class="form-row">
        <div class="field-group">
          <label>Nombre</label>
          <input id="p_name" placeholder="Ej: Detergente 1L" required />
        </div>
        <div class="field-group">
          <label>Precio ($)</label>
          <input id="p_price" type="number" min="1" placeholder="1000" required />
        </div>
        <div class="field-group">
          <label>Stock</label>
          <input id="p_stock" type="number" min="0" placeholder="10" required />
        </div>
        ${buildEmojiPicker()}
        <button class="btn btn-orange" type="submit" style="align-self:end;white-space:nowrap;">
          ＋ Agregar
        </button>
      </form>
    </div>

    <div class="section-title">
      <h2>Catálogo actual</h2>
      <span>${products.length} producto(s)</span>
    </div>
    <div class="grid" id="grid"></div>
  `;

  renderProductGrid(products, { showDelete: false });

  document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addProduct(() => renderReponedor());
  });
}

/* =====================================================
   RENDER: CLIENTE
   ===================================================== */
function renderCliente() {
  const products  = loadProducts();
  const purchases = loadPurchases().filter(p => p.username === getSession().username);
  const total     = purchases.reduce((acc, p) => acc + p.price, 0);
  const main      = document.getElementById('main');

  main.innerHTML = `
    <div class="section-title">
      <h2>Productos disponibles</h2>
      <span>Elige y compra al instante</span>
    </div>
    <div class="cart-summary">
      <div>Compras realizadas: <b>${purchases.length}</b></div>
      <div>Total gastado: <b>${fmt(total)}</b></div>
    </div>
    <div class="grid" id="grid"></div>

    <div class="section-title" style="margin-top:40px;">
      <h2>Mi historial de compras</h2>
    </div>
    <div class="form-card">
      ${purchases.length === 0
        ? `<div class="empty">Todavía no has comprado nada 🛍️</div>`
        : `<table>
             <thead><tr><th>Producto</th><th>Precio</th><th>Fecha</th></tr></thead>
             <tbody>
               ${purchases.slice().reverse().map(p => `
                 <tr>
                   <td>${p.emoji} ${p.name}</td>
                   <td>${fmt(p.price)}</td>
                   <td>${new Date(p.date).toLocaleString('es-CL')}</td>
                 </tr>
               `).join('')}
             </tbody>
           </table>`
      }
    </div>
  `;

  renderProductGrid(products, { showBuy: true });
}

/* =====================================================
   GRID DE PRODUCTOS (reutilizable)
   ===================================================== */
function renderProductGrid(products, opts = {}) {
  const grid = document.getElementById('grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `<div class="empty">No hay productos en el catálogo todavía.</div>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="tag">
      <span class="emoji">${p.emoji || '🛒'}</span>
      <h3>${p.name}</h3>
      <div class="price">${fmt(p.price)}</div>
      <div class="stock ${p.stock === 0 ? 'low' : ''}">
        ${p.stock === 0 ? 'Sin stock' : p.stock + ' en stock'}
      </div>
      <div class="tag-actions">
        ${opts.showBuy
          ? `<button class="btn btn-orange"
               ${p.stock === 0 ? 'disabled style="opacity:.5;cursor:not-allowed;"' : ''}
               onclick="buyProduct(${p.id})">Comprar</button>`
          : ''
        }
        ${opts.showDelete
          ? `<button class="btn btn-danger" onclick="deleteProduct(${p.id})">Eliminar</button>`
          : ''
        }
      </div>
    </div>
  `).join('');
}

/* =====================================================
   ACCIONES
   ===================================================== */
function addProduct(refreshFn) {
  const name  = document.getElementById('p_name').value.trim();
  const price = parseInt(document.getElementById('p_price').value, 10);
  const stock = parseInt(document.getElementById('p_stock').value, 10);
  const emoji = currentEmoji || '🛒';

  if (!name || isNaN(price) || isNaN(stock)) return;

  const products = loadProducts();
  const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push({ id: newId, name, price, stock, emoji });
  saveProducts(products);
  showToast(`"${name}" agregado al catálogo ✅`);
  refreshFn();
}

function deleteProduct(id) {
  let products = loadProducts();
  const removed = products.find(p => p.id === id);
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  showToast(`"${removed?.name}" eliminado 🗑️`);
  renderAdmin();
}

function buyProduct(id) {
  const products = loadProducts();
  const product  = products.find(p => p.id === id);
  if (!product || product.stock <= 0) return;

  product.stock -= 1;
  saveProducts(products);

  const purchases = loadPurchases();
  purchases.push({
    username: getSession().username,
    name:     product.name,
    price:    product.price,
    emoji:    product.emoji,
    date:     Date.now(),
  });
  savePurchases(purchases);

  showToast(`Compraste "${product.name}" 🛍️`);
  renderCliente();
}

/* =====================================================
   ARRANQUE
   ===================================================== */
(function init() {
  const session = getSession();
  if (session && USERS[session.username]) renderApp();
  else renderLogin();
})();
