const products = [
    {
        id: 1,
        name: "Ashwagandha Powder",
        category: "powder",
        price: 299,
        originalPrice: 399,
        image: "🌿",
        badge: "Bestseller",
        description: "Pure Ashwagandha root powder for stress relief, improved energy, and overall vitality. Sourced from organic farms.",
        features: [
            "100% Pure & Natural",
            "Stress & Anxiety Relief",
            "Boosts Energy & Stamina",
            "Improves Sleep Quality",
            "No Added Preservatives"
        ]
    },
    {
        id: 2,
        name: "Tulsi Immunity Syrup",
        category: "syrup",
        price: 199,
        originalPrice: 249,
        image: "🍯",
        badge: "New",
        description: "Traditional Tulsi-based syrup to boost immunity and fight common cold, cough, and respiratory issues naturally.",
        features: [
            "Boosts Natural Immunity",
            "Relieves Cold & Cough",
            "Rich in Antioxidants",
            "Safe for Daily Use",
            "Pleasant Taste"
        ]
    },
    {
        id: 3,
        name: "Triphala Churna",
        category: "powder",
        price: 249,
        originalPrice: 299,
        image: "🌱",
        badge: "",
        description: "Classic Ayurvedic formulation of three fruits for digestive health, detoxification, and gentle cleansing.",
        features: [
            "Aids Digestion",
            "Natural Detoxifier",
            "Supports Regularity",
            "Rich in Vitamin C",
            "Traditional Recipe"
        ]
    },
    {
        id: 4,
        name: "Amla Juice Syrup",
        category: "syrup",
        price: 179,
        originalPrice: 229,
        image: "🫙",
        badge: "",
        description: "Pure Amla juice concentrate rich in Vitamin C for hair health, skin glow, and immune support.",
        features: [
            "High Vitamin C Content",
            "Promotes Hair Growth",
            "Improves Skin Health",
            "Boosts Immunity",
            "100% Natural Amla"
        ]
    },
    {
        id: 5,
        name: "Brahmi Powder",
        category: "powder",
        price: 279,
        originalPrice: 349,
        image: "🌿",
        badge: "Popular",
        description: "Premium Brahmi powder for enhanced memory, concentration, and cognitive function. Ideal for students and professionals.",
        features: [
            "Enhances Memory",
            "Improves Concentration",
            "Reduces Mental Fatigue",
            "Calms the Mind",
            "Safe for Long-term Use"
        ]
    },
    {
        id: 6,
        name: "Cough Relief Syrup",
        category: "syrup",
        price: 159,
        originalPrice: 199,
        image: "🍯",
        badge: "",
        description: "Herbal cough syrup with Honey, Tulsi, and Mulethi for quick relief from cough, sore throat, and congestion.",
        features: [
            "Quick Cough Relief",
            "Soothes Sore Throat",
            "Clears Congestion",
            "Honey-Based Formula",
            "Safe for All Ages"
        ]
    },
    {
        id: 7,
        name: "Shatavari Powder",
        category: "powder",
        price: 349,
        originalPrice: 449,
        image: "🌱",
        badge: "Women's Health",
        description: "Pure Shatavari root powder for women's health, hormonal balance, and reproductive wellness.",
        features: [
            "Supports Women's Health",
            "Hormonal Balance",
            "Increases Vitality",
            "Lactation Support",
            "100% Organic"
        ]
    },
    {
        id: 8,
        name: "Digestive Care Syrup",
        category: "syrup",
        price: 189,
        originalPrice: 239,
        image: "🫙",
        badge: "",
        description: "Ayurvedic digestive syrup with Ajwain, Jeera, and Hing for relief from gas, bloating, and indigestion.",
        features: [
            "Relieves Gas & Bloating",
            "Improves Digestion",
            "Reduces Acidity",
            "Appetizer",
            "Pleasant Flavor"
        ]
    },
    {
        id: 9,
        name: "Moringa Powder",
        category: "powder",
        price: 269,
        originalPrice: 329,
        image: "🌿",
        badge: "Superfood",
        description: "Nutrient-rich Moringa leaf powder packed with vitamins, minerals, and antioxidants for overall wellness.",
        features: [
            "Rich in Nutrients",
            "High in Antioxidants",
            "Supports Energy Levels",
            "Anti-inflammatory",
            "Complete Nutrition"
        ]
    },
    {
        id: 10,
        name: "Liver Care Syrup",
        category: "syrup",
        price: 229,
        originalPrice: 299,
        image: "🍯",
        badge: "",
        description: "Herbal liver tonic with Bhumyamalaki, Kutki, and Kalmegh for liver detox and optimal liver function.",
        features: [
            "Liver Detoxification",
            "Protects Liver Cells",
            "Improves Liver Function",
            "Aids Digestion",
            "Herbal Formula"
        ]
    }
];

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
});

// ===== PRODUCT RENDERING =====
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    
    if (productsToRender.length === 0) {
        grid.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 1.2rem; color: var(--text-light);">No products found.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image" onclick="openProductModal(${product.id})">
                ${product.image}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        ₹${product.price}
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})" title="Add to Cart">
                        🛒
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== PRODUCT FILTERING =====
function filterProducts(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter products
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// ===== PRODUCT SEARCH =====
function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!query) {
        renderProducts(products);
        return;
    }
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    
    renderProducts(filtered);
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes('All')) {
            btn.classList.add('active');
        }
    });
}

// Add search on Enter key
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// ===== PRODUCT MODAL =====
let modalQuantity = 1;

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    modalQuantity = 1;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-image">${product.image}</div>
        <div class="modal-details">
            <p class="modal-category">${product.category}</p>
            <h2 class="modal-title">${product.name}</h2>
            <p class="modal-description">${product.description}</p>
            <div class="modal-price">
                ₹${product.price}
                ${product.originalPrice > product.price ? 
                    `<span class="original-price" style="font-size: 1rem; margin-left: 10px;">₹${product.originalPrice}</span>` : ''}
            </div>
            <div class="modal-features">
                <h4>Benefits:</h4>
                <ul>
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-qty">
                <label>Quantity:</label>
                <div class="modal-qty-controls">
                    <button class="modal-qty-btn" onclick="updateModalQty(-1)">−</button>
                    <span class="modal-qty-value" id="modalQtyValue">1</span>
                    <button class="modal-qty-btn" onclick="updateModalQty(1)">+</button>
                </div>
            </div>
            <button class="btn btn-primary btn-block" onclick="addToCartFromModal(${product.id})">
                Add to Cart — ₹<span id="modalTotalPrice">${product.price}</span>
            </button>
        </div>
    `;
    
    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateModalQty(change) {
    modalQuantity = Math.max(1, modalQuantity + change);
    document.getElementById('modalQtyValue').textContent = modalQuantity;
    
    // Update total price
    const priceText = document.querySelector('.modal-price').textContent;
    const price = parseInt(priceText.replace(/[^\d]/g, ''));
    document.getElementById('modalTotalPrice').textContent = price * modalQuantity;
}

function addToCartFromModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    for (let i = 0; i < modalQuantity; i++) {
        addToCartSilent(productId);
    }
    
    showToast(`${modalQuantity}x ${product.name} added to cart!`);
    closeModal();
}

function closeModal() {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.getElementById('productModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        closeModal();
    }
});

// ===== CART FUNCTIONALITY =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    addToCartSilent(productId);
    showToast(`${product.name} added to cart!`);
}

function addToCartSilent(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
    
    // Update cart items display
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">₹${item.price}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `₹${total}`;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
    document.body.style.overflow = document.getElementById('cartSidebar').classList.contains('open') ? 'hidden' : '';
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showToast(`Proceeding to checkout with ${itemCount} item(s) — Total: ₹${total}`);
    
    // In a real implementation, you would redirect to checkout page
    // window.location.href = '/checkout';
}

// ===== CONTACT FORM =====
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // In a real implementation, you would send this to a server
    console.log('Form submitted:', Object.fromEntries(formData));
    
    showToast('Thank you for your message! We\'ll get back to you soon.');
    form.reset();
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Close modal on Escape
    if (e.key === 'Escape') {
        closeModal();
        if (document.getElementById('cartSidebar').classList.contains('open')) {
            toggleCart();
        }
    }
});
