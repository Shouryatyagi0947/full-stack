// ===================== DATA =====================
const allProducts = [
  { id:1,  name:"Samsung Galaxy S24 Ultra 5G",      price:134999, old:159999, icon:"📱", stars:4.5, reviews:12847, badge:"Best Seller", prime:true  },
  { id:2,  name:"Apple MacBook Air M3 13-inch",     price:114900, old:134900, icon:"💻", stars:4.8, reviews:5432,  badge:"-15%",        prime:true  },
  { id:3,  name:"Sony WH-1000XM5 Headphones",       price:24990,  old:34990,  icon:"🎧", stars:4.6, reviews:8712,  badge:"-29%",        prime:true  },
  { id:4,  name:"Instant Pot Duo 7-in-1 Cooker",    price:6999,   old:9999,   icon:"🍳", stars:4.4, reviews:23110, badge:"Deal",        prime:false },
  { id:5,  name:"Kindle Paperwhite 16GB",            price:13999,  old:17999,  icon:"📖", stars:4.7, reviews:15678, badge:"-22%",        prime:true  },
  { id:6,  name:"Nike Air Max 270 Sneakers",         price:8995,   old:12995,  icon:"👟", stars:4.3, reviews:4320,  badge:"New",         prime:true  },
  { id:7,  name:"Canon EOS R50 Mirrorless Camera",   price:62990,  old:74990,  icon:"📷", stars:4.5, reviews:2134,  badge:"-16%",        prime:false },
  { id:8,  name:"Dyson V15 Cordless Vacuum",         price:52900,  old:64900,  icon:"🌀", stars:4.6, reviews:7823,  badge:"Best Seller", prime:true  },
  { id:9,  name:"LEGO Technic Bugatti Chiron",       price:15999,  old:19999,  icon:"🧱", stars:4.9, reviews:3410,  badge:"Top Rated",   prime:true  },
  { id:10, name:"Philips Air Fryer XXL",             price:8495,   old:13995,  icon:"🍟", stars:4.4, reviews:19234, badge:"-39%",        prime:true  },
  { id:11, name:"JBL Charge 5 Bluetooth Speaker",   price:13999,  old:17999,  icon:"🔊", stars:4.5, reviews:9012,  badge:"-22%",        prime:true  },
  { id:12, name:"Apple Watch Series 9 GPS",          price:41900,  old:49900,  icon:"⌚", stars:4.7, reviews:6543,  badge:"Best Seller", prime:true  },
  { id:13, name:"Boat Airdopes 141 Earbuds",         price:899,    old:2490,   icon:"🎵", stars:4.1, reviews:45000, badge:"-64%",        prime:false },
  { id:14, name:"Amazon Echo Dot 5th Gen",           price:4499,   old:5999,   icon:"🔵", stars:4.3, reviews:22000, badge:"-25%",        prime:true  },
  { id:15, name:"HP LaserJet MFP Printer",           price:13490,  old:17999,  icon:"🖨️", stars:4.2, reviews:3201,  badge:"-25%",        prime:false },
  { id:16, name:"PlayStation 5 Console",             price:49990,  old:54990,  icon:"🎮", stars:4.8, reviews:8900,  badge:"Hot",         prime:true  },
  { id:17, name:"Titan Octane Analog Watch",         price:2995,   old:4995,   icon:"🕐", stars:4.0, reviews:7600,  badge:"-40%",        prime:false },
  { id:18, name:"Prestige Electric Rice Cooker",     price:1299,   old:1999,   icon:"🍚", stars:4.2, reviews:31400, badge:"-35%",        prime:true  },
  { id:19, name:"Mi Smart Band 8 Pro",               price:3999,   old:5499,   icon:"📿", stars:4.3, reviews:12000, badge:"-27%",        prime:true  },
  { id:20, name:"Fossil Gen 6 Smartwatch",           price:18995,  old:24995,  icon:"⌛", stars:4.1, reviews:4500,  badge:"-24%",        prime:true  },
];

const searchIndex = [
  ...allProducts,
  { id:101, name:"iPhone 15 Pro Max",          price:159900, icon:"📱", stars:4.9 },
  { id:102, name:'Samsung 65" 4K Smart TV',    price:74999,  icon:"📺", stars:4.5 },
  { id:103, name:"Adidas Ultraboost 22",        price:12999,  icon:"👟", stars:4.4 },
];

// Cart state
let cart = {};

// ===================== HELPERS =====================
function makeStars(n) {
  const full = Math.floor(n), half = n % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

function formatPrice(p) {
  return '₹' + p.toLocaleString('en-IN');
}

function getDiscount(old, now) {
  return Math.round((old - now) / old * 100);
}

// ===================== PRODUCT RENDERING =====================
function renderCard(p, small) {
  if (small) {
    return `<div class="scroll-card" onclick="addToCart(${p.id})">
      <div class="mini-img">${p.icon}</div>
      <div class="mini-title">${p.name}</div>
      <div class="mini-price">${formatPrice(p.price)}</div>
    </div>`;
  }
  const disc = p.old ? getDiscount(p.old, p.price) : 0;
  const badgeColor = p.badge === 'Best Seller' ? 'best-seller' : (p.badge === 'New' ? 'new' : '');
  return `<div class="product-card" onclick="">
    ${p.badge ? `<div class="badge ${badgeColor}">${p.badge}</div>` : ''}
    <div class="product-img">${p.icon}</div>
    <div class="product-title">${p.name}</div>
    <div class="stars">${makeStars(p.stars)}</div>
    <div class="rating-count">${(p.reviews || 0).toLocaleString('en-IN')} ratings</div>
    ${p.old ? `<span class="old-price">${formatPrice(p.old)}</span><span class="discount">-${disc}%</span><br>` : ''}
    <span class="price">${formatPrice(p.price)}</span>
    ${p.prime ? `<div class="prime-badge"><span>prime</span> FREE Delivery</div>` : ''}
    <button class="add-to-cart-btn" id="btn-${p.id}" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
  </div>`;
}

function populate(id, products, small) {
  document.getElementById(id).innerHTML = products.map(p => renderCard(p, small)).join('');
}

// Populate product sections on load
populate('dealsRow',       allProducts.slice(0,  5));
populate('bestsellersRow', allProducts.slice(5,  10));
populate('electronicsRow', allProducts.slice(10, 15));
populate('recentRow',      allProducts.slice(15, 20), true);

// ===================== CART =====================
function addToCart(id) {
  const p = allProducts.find(x => x.id === id) || searchIndex.find(x => x.id === id);
  if (!p) return;
  cart[id] = cart[id] || { ...p, qty: 0 };
  cart[id].qty++;
  updateCartUI();
  showToast(`✅ "${p.name.substring(0, 28)}..." added to cart`);

  // Button feedback
  const btn = document.getElementById('btn-' + id);
  if (btn) {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 2000);
  }
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
}

function updateCartUI() {
  const items = Object.values(cart);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cartCount').textContent = count;

  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');

  if (items.length === 0) {
    container.innerHTML = `<div class="cart-empty">
      <span class="empty-icon">🛒</span>
      <strong>Your cart is empty</strong><br><br>Add items to get started
    </div>`;
    footer.style.display = 'none';
  } else {
    container.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="cart-item-img">${i.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${i.name}</div>
          <div class="cart-item-price">${formatPrice(i.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${i.id}, -1)">−</button>
            <span class="qty-display">${i.qty}</span>
            <button class="qty-btn" onclick="changeQty(${i.id}, 1)">+</button>
            <span class="cart-item-remove" onclick="removeFromCart(${i.id})">Delete</span>
          </div>
        </div>
      </div>
    `).join('');
    document.getElementById('cartTotal').textContent = formatPrice(total);
    footer.style.display = 'block';
  }
}

function toggleCart() {
  document.getElementById('cartPanel').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
  updateCartUI();
}

function checkout() {
  showToast('🎉 Order placed successfully! Thank you for shopping!');
  cart = {};
  updateCartUI();
  toggleCart();
}

// ===================== HERO SLIDER =====================
let currentSlide = 0;
const totalSlides = 4;
let autoSlide = setInterval(() => changeSlide(1), 4000);

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  goToSlide(currentSlide);
  resetAutoSlide();
}

function goToSlide(idx) {
  currentSlide = idx;
  document.getElementById('heroSlides').style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(() => changeSlide(1), 4000);
}

// ===================== SEARCH =====================
function handleSearch(val) {
  const box = document.getElementById('searchResults');
  if (!val.trim()) { box.classList.remove('open'); return; }

  const q = val.toLowerCase();
  const results = searchIndex.filter(p => p.name.toLowerCase().includes(q)).slice(0, 8);
  if (!results.length) { box.classList.remove('open'); return; }

  box.innerHTML = results.map(p => `
    <div class="search-result-item" onmousedown="addToCart(${p.id})">
      <span class="sr-icon">${p.icon}</span>
      <div class="sr-info">
        <div class="sr-name">${p.name}</div>
        <div class="sr-price">${formatPrice(p.price)}</div>
      </div>
    </div>
  `).join('');
  box.classList.add('open');
}

function hideSearch() {
  setTimeout(() => document.getElementById('searchResults').classList.remove('open'), 200);
}

function doSearch() {
  const val = document.getElementById('searchInput').value;
  if (val) { showToast('🔍 Searching for "' + val + '"...'); }
}

// ===================== TOAST =====================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ===================== UTILS =====================
function scrollToTop()  { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function scrollToDeals() { document.getElementById('dealsSection').scrollIntoView({ behavior: 'smooth' }); }

// Init
updateCartUI();