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
  { label: '🥖 Panadería y Cereales',    emojis: ['🥖','🍞','🥐','🧁','🎂','🥣','🌽','🌾','🥨','🍩'] },
  { label: '🥛 Lácteos',                 emojis: ['🥛','🧀','🧈','🍦','🍨','🍧'] },
  { label: '🍎 Frutas y Verduras',       emojis: ['🍎','🍊','🍋','🍇','🍓','🥝','🍅','🥕','🧅','🥦','🥑','🍌','🍑','🍐','🫐','🥬','🫑','🌶️'] },
  { label: '🥩 Carnes y Proteínas',      emojis: ['🥩','🍗','🥚','🐟','🍤','🥓','🌭','🍖'] },
  { label: '🥤 Bebidas',                 emojis: ['🥤','🧃','☕','🧋','🍺','🍷','🥂','🫖','🧊','🍶','🥃'] },
  { label: '🥫 Conservas y Enlatados',   emojis: ['🥫','🫙','🍯','🧂','🍚','🍝','🫘'] },
  { label: '🍫 Snacks y Dulces',         emojis: ['🍫','🍬','🍭','🥜','🍿','🍪','🧇','🧆','🍡'] },
  { label: '🧴 Limpieza e Higiene',      emojis: ['🧴','🧼','🪥','🧹','🧺','🧻','🫧','🪒','🪣','🪠'] },
  { label: '🛒 General',                 emojis: ['🛒','📦','🏷️','🛍️','💊','🩹','📱','🔋','🧲','🪤'] },
];

/* ---------- ESTADO DEL EMOJI PICKER ---------- */
let currentEmoji = '🛒';

/* ---------- ESTADO DEL CARRITO (en memoria) ---------- */
// Formato: { [productId]: quantity }
let cart = {};

/* =====================================================
   ALMACENAMIENTO (localStorage)
   ===================================================== */
function loadProducts() {
  const raw = localStorage.getItem('mm_products');
  let products = raw ? JSON.parse(raw) : [];
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
   EMOJI PICKER
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
    cart = {};
    clearSession();
    renderLogin();
  });

  if (user.role === 'admin')          renderAdmin();
  else if (user.role === 'reponedor') renderReponedor();
  else                                renderCliente();
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
      <span>Agrega al carrito y confirma tu compra</span>
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

  renderProductGrid(products, { showAddToCart: true });
  injectCartUI();
}

/* =====================================================
   CARRITO — UI
   ===================================================== */

/** Inyecta el botón flotante y el modal del carrito en el DOM */
function injectCartUI() {
  // Botón flotante
  const fab = document.createElement('button');
  fab.className = 'cart-fab';
  fab.id = 'cartFab';
  fab.innerHTML = `🛒 Ver carrito <span class="cart-badge" id="cartBadge">0</span>`;
  fab.onclick = openCart;
  document.body.appendChild(fab);

  // Modal overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'cartModal';
  overlay.innerHTML = `
    <div class="cart-modal">
      <div class="cart-modal-header">
        <h2>🛒 Tu carrito</h2>
        <button class="cart-close-btn" onclick="closeCart()">✕</button>
      </div>
      <div class="cart-modal-body" id="cartContent"></div>
      <div class="cart-modal-footer" id="cartFooter" style="display:none;">
        <div class="cart-total-row">
          <span>Total a pagar</span>
          <span id="cartTotalDisplay"></span>
        </div>
        <button class="btn-confirm" onclick="confirmPurchase()">
          ✓ Confirmar compra
        </button>
      </div>
    </div>
  `;
  // Cerrar al hacer clic en el fondo
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCart();
  });
  document.body.appendChild(overlay);

  updateCartBadge();
  renderCartContent();
}

/** Limpia los elementos del carrito del DOM (al salir de la vista cliente) */
function removeCartUI() {
  const fab     = document.getElementById('cartFab');
  const modal   = document.getElementById('cartModal');
  if (fab)   fab.remove();
  if (modal) modal.remove();
}

function openCart() {
  renderCartContent();
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.add('open');
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.remove('open');
}

/** Actualiza el número en el botón flotante */
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  badge.textContent = total;
}

/** Dibuja el contenido del modal */
function renderCartContent() {
  const content = document.getElementById('cartContent');
  const footer  = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotalDisplay');
  if (!content) return;

  const products  = loadProducts();
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find(p => p.id === parseInt(id));
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  if (cartItems.length === 0) {
    content.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:52px;margin-bottom:12px;">🛒</div>
        <p style="font-weight:600;font-size:16px;margin:0 0 6px;">Tu carrito está vacío</p>
        <p style="font-size:13px;color:#9a9a8a;margin:0;">
          Cierra esta ventana y agrega productos desde el catálogo
        </p>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  content.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)} c/u</div>
      </div>
      <div class="cart-qty-controls">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, +1)">＋</button>
      </div>
      <div class="cart-item-subtotal">${fmt(item.price * item.qty)}</div>
    </div>
  `).join('');

  if (footer) {
    footer.style.display = 'block';
    if (totalEl) totalEl.textContent = fmt(totalPrice);
  }
}

/* =====================================================
   CARRITO — ACCIONES
   ===================================================== */

/** Agrega un producto al carrito (desde el catálogo) */
function addToCart(id) {
  const products = loadProducts();
  const product  = products.find(p => p.id === id);
  if (!product || product.stock <= 0) return;

  const currentQty = cart[id] || 0;
  if (currentQty >= product.stock) {
    showToast('No hay más stock disponible');
    return;
  }

  cart[id] = currentQty + 1;
  updateCartBadge();
  showToast(`"${product.name}" agregado al carrito 🛒`);
}

/** Incrementa o decrementa cantidad en el modal */
function changeQty(id, delta) {
  const products = loadProducts();
  const product  = products.find(p => p.id === id);
  if (!product) return;

  const current = cart[id] || 0;
  const next    = current + delta;

  if (next <= 0) {
    delete cart[id];
  } else if (next > product.stock) {
    showToast('No hay más stock disponible');
    return;
  } else {
    cart[id] = next;
  }

  updateCartBadge();
  renderCartContent();
}

/** Procesa la compra completa */
function confirmPurchase() {
  const products  = loadProducts();
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find(p => p.id === parseInt(id));
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  if (cartItems.length === 0) return;

  // Descontar stock
  cartItems.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) product.stock = Math.max(0, product.stock - item.qty);
  });
  saveProducts(products);

  // Guardar compras (una entrada por unidad)
  const purchases = loadPurchases();
  const username  = getSession().username;
  cartItems.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      purchases.push({
        username,
        name:  item.name,
        price: item.price,
        emoji: item.emoji,
        date:  Date.now(),
      });
    }
  });
  savePurchases(purchases);

  // Vaciar carrito
  cart = {};

  // Mostrar pantalla de éxito
  showSuccessScreen();
}

/** Pantalla de confirmación dentro del modal */
function showSuccessScreen() {
  const content = document.getElementById('cartContent');
  const footer  = document.getElementById('cartFooter');

  if (content) {
    content.innerHTML = `
      <div class="cart-success">
        <div class="success-icon">✓</div>
        <h3>¡Compra realizada!</h3>
        <p>Tus productos han sido procesados exitosamente.<br>¡Gracias por comprar en Minimarket Don Pepe!</p>
      </div>
    `;
  }
  if (footer) footer.style.display = 'none';
  updateCartBadge();

  // Cerrar modal y refrescar vista después de 2.5 s
  setTimeout(() => {
    closeCart();
    removeCartUI();
    renderCliente();
  }, 2500);
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
        ${opts.showAddToCart
          ? `<button class="btn btn-orange"
               ${p.stock === 0 ? 'disabled style="opacity:.5;cursor:not-allowed;"' : ''}
               onclick="addToCart(${p.id})">＋ Al carrito</button>`
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
   ACCIONES ADMIN / REPONEDOR
   ===================================================== */
function addProduct(refreshFn) {
  const name  = document.getElementById('p_name').value.trim();
  const price = parseInt(document.getElementById('p_price').value, 10);
  const stock = parseInt(document.getElementById('p_stock').value, 10);
  const emoji = currentEmoji || '🛒';

  if (!name || isNaN(price) || isNaN(stock)) return;

  const products = loadProducts();
  const newId    = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push({ id: newId, name, price, stock, emoji });
  saveProducts(products);
  showToast(`"${name}" agregado al catálogo ✅`);
  refreshFn();
}

function deleteProduct(id) {
  let products  = loadProducts();
  const removed = products.find(p => p.id === id);
  products      = products.filter(p => p.id !== id);
  saveProducts(products);
  showToast(`"${removed?.name}" eliminado 🗑️`);
  renderAdmin();
}

/* =====================================================
   ARRANQUE
   ===================================================== */
(function init() {
  const session = getSession();
  if (session && USERS[session.username]) renderApp();
  else renderLogin();
})();
