/* =====================================================
   MINIMARKET DON PEPE — app.js v4
   ===================================================== */

/* ---------- USUARIOS ---------- */
const USERS = {
  admin:     { password: 'admin123',   role: 'admin',     name: 'Don Pepe (Admin)' },
  reponedor: { password: 'repo123',    role: 'reponedor', name: 'Carlos (Reponedor)' },
  cliente:   { password: 'cliente123', role: 'cliente',   name: 'María (Cliente)' },
};

/* ---------- CATEGORÍAS (basadas en la categorización Unimarc) ---------- */
const CATEGORIES = [
  { id: 'bebidas_alcohol',     name: 'Bebidas con Alcohol',      emoji: '🍺' },
  { id: 'bebidas_sin_alcohol', name: 'Bebidas sin Alcohol',      emoji: '🥤' },
  { id: 'carnes_pescados',     name: 'Carnes y Pescados',        emoji: '🥩' },
  { id: 'congelados',          name: 'Congelados',               emoji: '🧊' },
  { id: 'despensa',            name: 'Despensa',                 emoji: '🥫' },
  { id: 'dulces_chocolates',   name: 'Dulces y Chocolates',      emoji: '🍫' },
  { id: 'fiambres',            name: 'Fiambres y Embutidos',     emoji: '🌭' },
  { id: 'frutas_verduras',     name: 'Frutas y Verduras',        emoji: '🍎' },
  { id: 'galletas',            name: 'Galletas',                 emoji: '🍪' },
  { id: 'lacteos',             name: 'Lácteos, Quesos y Huevos', emoji: '🥛' },
  { id: 'panaderia',           name: 'Panadería y Pastelería',   emoji: '🥖' },
  { id: 'snacks',              name: 'Snacks',                   emoji: '🍿' },
  { id: 'higiene',             name: 'Higiene y Cuidado',        emoji: '🧴' },
  { id: 'limpieza',            name: 'Limpieza',                 emoji: '🧹' },
];

/* ---------- PRODUCTOS PREDETERMINADOS ---------- */
const SEED_PRODUCTS = [
  { id: 1,  name: 'Pan baguette',          price: 1200, stock: 20, emoji: '🥖', category: 'panaderia' },
  { id: 2,  name: 'Leche entera 1L',       price: 1100, stock: 30, emoji: '🥛', category: 'lacteos' },
  { id: 3,  name: 'Huevos x12',            price: 3200, stock: 15, emoji: '🥚', category: 'lacteos' },
  { id: 4,  name: 'Manzanas (kg)',          price: 1500, stock: 25, emoji: '🍎', category: 'frutas_verduras' },
  { id: 5,  name: 'Arroz 1kg',             price: 1300, stock: 40, emoji: '🍚', category: 'despensa' },
  { id: 6,  name: 'Coca-Cola 1.5L',        price: 1800, stock: 18, emoji: '🥤', category: 'bebidas_sin_alcohol' },
  { id: 7,  name: 'Aceite vegetal 1L',     price: 2400, stock: 12, emoji: '🫙', category: 'despensa' },
  { id: 8,  name: 'Fideos 500g',           price:  950, stock: 35, emoji: '🍝', category: 'despensa' },
  { id: 9,  name: 'Detergente 1L',         price: 2100, stock: 20, emoji: '🧴', category: 'limpieza' },
  { id: 10, name: 'Papel higiénico x4',    price: 2800, stock: 22, emoji: '🧻', category: 'higiene' },
  { id: 11, name: 'Queso laminado 200g',   price: 3500, stock: 10, emoji: '🧀', category: 'lacteos' },
  { id: 12, name: 'Yogurt natural',        price:  890, stock: 28, emoji: '🥛', category: 'lacteos' },
  { id: 13, name: 'Pechuga de pollo (kg)', price: 4200, stock:  8, emoji: '🍗', category: 'carnes_pescados' },
  { id: 14, name: 'Plátanos (kg)',         price:  990, stock: 30, emoji: '🍌', category: 'frutas_verduras' },
  { id: 15, name: 'Galletas María 200g',   price:  790, stock: 25, emoji: '🍪', category: 'galletas' },
  { id: 16, name: 'Chocolate barra',       price: 1200, stock: 20, emoji: '🍫', category: 'dulces_chocolates' },
  { id: 17, name: 'Cerveza lata',          price:  990, stock: 24, emoji: '🍺', category: 'bebidas_alcohol' },
  { id: 18, name: 'Jamón cocido 100g',     price: 1800, stock: 15, emoji: '🌭', category: 'fiambres' },
  { id: 19, name: 'Papas fritas 200g',     price: 1490, stock: 20, emoji: '🍟', category: 'snacks' },
  { id: 20, name: 'Helado 1L',             price: 3200, stock: 10, emoji: '🍦', category: 'congelados' },
];

/* ---------- CATEGORÍAS DE EMOJIS ---------- */
const EMOJI_CATEGORIES = [
  { label: '🥖 Panadería',          emojis: ['🥖','🍞','🥐','🧁','🎂','🥣','🌽','🥨','🍩'] },
  { label: '🥛 Lácteos',            emojis: ['🥛','🧀','🧈','🍦','🍨','🍧'] },
  { label: '🍎 Frutas y Verduras',  emojis: ['🍎','🍊','🍋','🍇','🍓','🥝','🍅','🥕','🧅','🥦','🥑','🍌','🍑','🍐','🫐','🥬','🫑','🌶️'] },
  { label: '🥩 Carnes',             emojis: ['🥩','🍗','🥚','🐟','🍤','🥓','🌭','🍖'] },
  { label: '🥤 Bebidas',            emojis: ['🥤','🧃','☕','🧋','🍺','🍷','🥂','🫖','🧊','🍶','🥃'] },
  { label: '🥫 Despensa',           emojis: ['🥫','🫙','🍯','🧂','🍚','🍝','🫘'] },
  { label: '🍫 Snacks y Dulces',    emojis: ['🍫','🍬','🍭','🥜','🍿','🍪','🧇','🍡','🍟'] },
  { label: '🧴 Limpieza e Higiene', emojis: ['🧴','🧼','🪥','🧹','🧺','🧻','🫧','🪒','🪣','🪠'] },
  { label: '🛒 General',            emojis: ['🛒','📦','🏷️','🛍️','💊','🩹','📱','🔋','🧲','🪤'] },
];

/* =====================================================
   ESTADO GLOBAL
   ===================================================== */
let currentEmoji    = '🛒';
let cart            = {};       // { [productId]: quantity }
let currentCategory = 'all';   // filtro activo

/* =====================================================
   ALMACENAMIENTO
   ===================================================== */
function loadProducts() {
  const raw = localStorage.getItem('mm_products');
  let p = raw ? JSON.parse(raw) : [];
  if (!p || p.length === 0) {
    p = JSON.parse(JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem('mm_products', JSON.stringify(p));
  }
  return p;
}
function saveProducts(p)  { localStorage.setItem('mm_products',  JSON.stringify(p)); }
function loadPurchases()  { return JSON.parse(localStorage.getItem('mm_purchases') || '[]'); }
function savePurchases(p) { localStorage.setItem('mm_purchases', JSON.stringify(p)); }
function getSession()     { return JSON.parse(localStorage.getItem('mm_session') || 'null'); }
function setSession(u)    { localStorage.setItem('mm_session', JSON.stringify({ username: u })); }
function clearSession()   { localStorage.removeItem('mm_session'); }

/* =====================================================
   UTILIDADES
   ===================================================== */
function fmt(n) { return '$' + n.toLocaleString('es-CL'); }

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

function getCatLabel(catId) {
  const c = CATEGORIES.find(c => c.id === catId);
  return c ? `${c.emoji} ${c.name}` : '';
}

const root = document.getElementById('root');

/* =====================================================
   EMOJI PICKER
   ===================================================== */
function buildEmojiPicker() {
  return `
    <div class="field-group">
      <label>Emoji</label>
      <div class="emoji-picker-wrap" id="emojiPickerWrap">
        <button type="button" class="emoji-btn" onclick="toggleEmojiPicker(event)">
          <span id="selectedEmojiDisplay">${currentEmoji}</span>
          <span class="arrow">▾</span>
        </button>
        <div class="emoji-panel" id="emojiPanel">
          ${EMOJI_CATEGORIES.map(cat => `
            <div class="emoji-cat-label">${cat.label}</div>
            <div class="emoji-grid">
              ${cat.emojis.map(e =>
                `<button type="button" class="emoji-opt" onclick="selectEmoji('${e}')">${e}</button>`
              ).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
function toggleEmojiPicker(e) {
  e.stopPropagation();
  document.getElementById('emojiPanel')?.classList.toggle('open');
}
function selectEmoji(emoji) {
  currentEmoji = emoji;
  const d = document.getElementById('selectedEmojiDisplay');
  if (d) d.textContent = emoji;
  document.getElementById('emojiPanel')?.classList.remove('open');
}
document.addEventListener('click', (e) => {
  const panel = document.getElementById('emojiPanel');
  const wrap  = document.getElementById('emojiPickerWrap');
  if (panel && wrap && !wrap.contains(e.target)) panel.classList.remove('open');
});

/* =====================================================
   SELECTOR DE CATEGORÍA (para formularios)
   ===================================================== */
function buildCategorySelect() {
  return `
    <div class="field-group">
      <label>Categoría</label>
      <select id="p_category" style="margin-bottom:0;">
        <option value="">Sin categoría</option>
        ${CATEGORIES.map(c =>
          `<option value="${c.id}">${c.emoji} ${c.name}</option>`
        ).join('')}
      </select>
    </div>
  `;
}

/* =====================================================
   TABS DE CATEGORÍAS (para cliente)
   ===================================================== */
function buildCategoryTabs(products) {
  const usedIds  = [...new Set(products.map(p => p.category).filter(Boolean))];
  const usedCats = CATEGORIES.filter(c => usedIds.includes(c.id));
  return `
    <div class="category-tabs">
      <button class="category-tab ${currentCategory === 'all' ? 'active' : ''}"
              onclick="setCategory('all')">🏪 Todos</button>
      ${usedCats.map(c => `
        <button class="category-tab ${currentCategory === c.id ? 'active' : ''}"
                onclick="setCategory('${c.id}')">
          ${c.emoji} ${c.name}
        </button>
      `).join('')}
    </div>
  `;
}

function setCategory(catId) {
  currentCategory = catId;
  renderCatalogSection();
}

function renderCatalogSection() {
  const el = document.getElementById('catalogSection');
  if (!el) return;
  const products = loadProducts();
  const filtered = currentCategory === 'all'
    ? products
    : products.filter(p => p.category === currentCategory);
  el.innerHTML = `
    ${buildCategoryTabs(products)}
    <div class="grid" id="grid"></div>
  `;
  renderProductGrid(filtered, { showAddToCart: true });
}

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
    if (!user || user.password !== p) { renderLogin('Usuario o contraseña incorrectos.'); return; }
    setSession(u);
    renderApp();
  });
}

/* =====================================================
   RENDER: APP SHELL
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
      <div class="header-right">
        ${user.role === 'cliente' ? `
          <button class="cart-header-btn" onclick="openCart()">
            <span>🛒</span>
            <span>Mi Carrito</span>
            <span class="cart-header-badge" id="cartBadge">0</span>
          </button>
        ` : ''}
        <div class="user-pill">
          <span>${user.name}</span>
          <span class="role-badge">${user.role}</span>
          <button class="btn-outline" id="logoutBtn">Salir</button>
        </div>
      </div>
    </header>
    <main id="main"></main>
  `;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    cart = {};
    currentCategory = 'all';
    removeCartUI();
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
  document.getElementById('main').innerHTML = `
    <div class="section-title">
      <h2>Agregar producto</h2>
      <span>Visible al instante para los clientes</span>
    </div>
    <div class="form-card">
      <form id="addForm">
        <div class="form-row">
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
        </div>
        <div class="form-row-bottom">
          ${buildCategorySelect()}
          ${buildEmojiPicker()}
          <button class="btn btn-orange" type="submit" style="align-self:end;white-space:nowrap;">
            ＋ Agregar
          </button>
        </div>
      </form>
    </div>
    <div class="section-title">
      <h2>Catálogo</h2>
      <span>${products.length} producto(s)</span>
    </div>
    <div class="grid" id="grid"></div>
  `;
  renderProductGrid(products, { showDelete: true });
  document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault(); addProduct(() => renderAdmin());
  });
}

/* =====================================================
   RENDER: REPONEDOR
   ===================================================== */
function renderReponedor() {
  currentEmoji = '🛒';
  const products = loadProducts();
  document.getElementById('main').innerHTML = `
    <div class="section-title">
      <h2>Agregar producto</h2>
      <span>Los productos quedan disponibles para la venta</span>
    </div>
    <div class="form-card">
      <form id="addForm">
        <div class="form-row">
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
        </div>
        <div class="form-row-bottom">
          ${buildCategorySelect()}
          ${buildEmojiPicker()}
          <button class="btn btn-orange" type="submit" style="align-self:end;white-space:nowrap;">
            ＋ Agregar
          </button>
        </div>
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
    e.preventDefault(); addProduct(() => renderReponedor());
  });
}

/* =====================================================
   RENDER: CLIENTE
   ===================================================== */
function renderCliente() {
  const purchases = loadPurchases().filter(p => p.username === getSession().username);
  const total     = purchases.reduce((acc, p) => acc + p.price, 0);

  document.getElementById('main').innerHTML = `
    <div class="section-title">
      <h2>Productos disponibles</h2>
      <span>Agrega al carrito y confirma tu compra desde el botón superior</span>
    </div>
    <div class="cart-summary">
      <div>Compras realizadas: <b>${purchases.length}</b></div>
      <div>Total gastado: <b>${fmt(total)}</b></div>
    </div>

    <div id="catalogSection"></div>

    <div class="section-title" style="margin-top:40px;">
      <h2>Mi historial de compras</h2>
    </div>
    <div class="form-card">
      ${purchases.length === 0
        ? `<div class="empty">Todavía no has comprado nada 🛍️</div>`
        : `<table>
             <thead>
               <tr>
                 <th>Producto</th>
                 <th>Categoría</th>
                 <th>Precio</th>
                 <th>Fecha</th>
               </tr>
             </thead>
             <tbody>
               ${purchases.slice().reverse().map(p => `
                 <tr>
                   <td>${p.emoji} ${p.name}</td>
                   <td style="font-size:12px;color:#7a7a6c;">${p.category ? getCatLabel(p.category) : '—'}</td>
                   <td>${fmt(p.price)}</td>
                   <td>${new Date(p.date).toLocaleString('es-CL')}</td>
                 </tr>
               `).join('')}
             </tbody>
           </table>`
      }
    </div>
  `;

  renderCatalogSection();
  injectCartUI();
}

/* =====================================================
   CARRITO — INYECCIÓN DEL DRAWER
   ===================================================== */
function injectCartUI() {
  // Overlay oscuro detrás del drawer
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cartOverlay';
  overlay.onclick = closeCart;
  document.body.appendChild(overlay);

  // Drawer lateral
  const drawer = document.createElement('div');
  drawer.className = 'cart-drawer';
  drawer.id = 'cartDrawer';
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h2>
        🛒 Mi Carrito
        <span class="cart-item-count" id="cartItemCount">0 items</span>
      </h2>
      <button class="cart-drawer-close" onclick="closeCart()" title="Cerrar">✕</button>
    </div>
    <div class="cart-drawer-body" id="cartDrawerBody"></div>
    <div class="cart-drawer-footer" id="cartDrawerFooter" style="display:none;">
      <div class="cart-total-section">
        <div class="cart-total-label">Total a pagar</div>
        <div class="cart-total-amount" id="cartTotalAmount">$0</div>
        <div class="cart-items-count-small" id="cartItemsCountSmall"></div>
      </div>
      <button class="btn-confirm" onclick="confirmPurchase()">
        ✓ Confirmar compra
      </button>
    </div>
  `;
  document.body.appendChild(drawer);

  updateCartBadge();
  renderCartBody();
}

function removeCartUI() {
  document.getElementById('cartOverlay')?.remove();
  document.getElementById('cartDrawer')?.remove();
}

function openCart() {
  renderCartBody();
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
}

/* =====================================================
   CARRITO — RENDERIZADO DEL CONTENIDO
   ===================================================== */
function updateCartBadge() {
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById('cartBadge');
  const count = document.getElementById('cartItemCount');
  if (badge) badge.textContent = total;
  if (count) count.textContent = `${total} item${total !== 1 ? 's' : ''}`;
}

function renderCartBody() {
  const body   = document.getElementById('cartDrawerBody');
  const footer = document.getElementById('cartDrawerFooter');
  if (!body) return;

  const products  = loadProducts();
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find(p => p.id === parseInt(id));
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  if (cartItems.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <p class="cart-empty-title">Tu carrito está vacío</p>
        <p class="cart-empty-sub">Cierra esta ventana y agrega<br>productos desde el catálogo</p>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  body.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-unit-price">${fmt(item.price)} c/u</div>
      </div>
      <div class="cart-qty-controls">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-number">${item.qty}</span>
        <button onclick="changeQty(${item.id}, +1)">＋</button>
      </div>
      <div class="cart-item-subtotal">${fmt(item.price * item.qty)}</div>
    </div>
  `).join('');

  if (footer) {
    footer.style.display = 'block';
    document.getElementById('cartTotalAmount').textContent    = fmt(totalPrice);
    document.getElementById('cartItemsCountSmall').textContent =
      `${totalItems} producto${totalItems !== 1 ? 's' : ''} en el carrito`;
  }
}

/* =====================================================
   CARRITO — ACCIONES
   ===================================================== */
function addToCart(id) {
  const products = loadProducts();
  const product  = products.find(p => p.id === id);
  if (!product || product.stock <= 0) return;

  const currentQty = cart[id] || 0;
  if (currentQty >= product.stock) { showToast('No hay más stock disponible'); return; }
  cart[id] = currentQty + 1;
  updateCartBadge();
  showToast(`"${product.name}" agregado al carrito 🛒`);
}

function changeQty(id, delta) {
  const products = loadProducts();
  const product  = products.find(p => p.id === id);
  if (!product) return;
  const next = (cart[id] || 0) + delta;
  if (next <= 0) {
    delete cart[id];
  } else if (next > product.stock) {
    showToast('No hay más stock disponible'); return;
  } else {
    cart[id] = next;
  }
  updateCartBadge();
  renderCartBody();
}

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
    const p = products.find(p => p.id === item.id);
    if (p) p.stock = Math.max(0, p.stock - item.qty);
  });
  saveProducts(products);

  // Guardar historial
  const purchases = loadPurchases();
  const username  = getSession().username;
  cartItems.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      purchases.push({
        username,
        name:     item.name,
        price:    item.price,
        emoji:    item.emoji,
        category: item.category || '',
        date:     Date.now(),
      });
    }
  });
  savePurchases(purchases);

  cart = {};
  showSuccessScreen();
}

function showSuccessScreen() {
  const body   = document.getElementById('cartDrawerBody');
  const footer = document.getElementById('cartDrawerFooter');
  if (body) {
    body.innerHTML = `
      <div class="cart-success">
        <div class="success-check-circle">✓</div>
        <h3>¡Compra realizada!</h3>
        <p>Tus productos han sido procesados exitosamente.<br>¡Gracias por comprar en<br>Minimarket Don Pepe!</p>
      </div>
    `;
  }
  if (footer) footer.style.display = 'none';
  updateCartBadge();

  setTimeout(() => {
    closeCart();
    removeCartUI();
    renderCliente();
  }, 2600);
}

/* =====================================================
   GRID DE PRODUCTOS
   ===================================================== */
function renderProductGrid(products, opts = {}) {
  const grid = document.getElementById('grid');
  if (!grid) return;
  if (products.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1;">No hay productos en esta categoría.</div>`;
    return;
  }
  grid.innerHTML = products.map(p => {
    const catLabel = p.category ? getCatLabel(p.category) : '';
    return `
      <div class="tag">
        ${catLabel ? `<span class="product-cat-badge">${catLabel}</span>` : ''}
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
    `;
  }).join('');
}

/* =====================================================
   ACCIONES ADMIN / REPONEDOR
   ===================================================== */
function addProduct(refreshFn) {
  const name     = document.getElementById('p_name').value.trim();
  const price    = parseInt(document.getElementById('p_price').value, 10);
  const stock    = parseInt(document.getElementById('p_stock').value, 10);
  const emoji    = currentEmoji || '🛒';
  const category = document.getElementById('p_category')?.value || '';
  if (!name || isNaN(price) || isNaN(stock)) return;

  const products = loadProducts();
  const newId    = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push({ id: newId, name, price, stock, emoji, category });
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
