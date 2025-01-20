// Initialize Swiper for hero slider
const heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Product Data
const products = [
    {
        id: 1,
        name: "Hydrating Face Serum",
        price: 49.99,
        rating: 4.9,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
        category: "skincare",
        tag: "trending",
        sale: false
    },
    {
        id: 2,
        name: "Luxury Lipstick Set",
        price: 79.99,
        rating: 4.8,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
        category: "makeup",
        tag: "new",
        sale: true,
        salePrice: 59.99
    },
    {
        id: 3,
        name: "Professional Hair Care Kit",
        price: 129.99,
        rating: 4.7,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af",
        category: "haircare",
        tag: "trending",
        sale: false
    },
    {
        id: 4,
        name: "Signature Perfume",
        price: 199.99,
        rating: 4.6,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
        category: "fragrance",
        tag: "new",
        sale: true,
        salePrice: 159.99
    },
    {
        id: 5,
        name: "Anti-Aging Night Cream",
        price: 89.99,
        rating: 4.8,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232",
        category: "skincare",
        tag: "trending",
        sale: false
    },
    {
        id: 6,
        name: "Natural Eyeshadow Palette",
        price: 59.99,
        rating: 4.5,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
        category: "makeup",
        tag: "new",
        sale: true,
        salePrice: 44.99
    }
];

// Shopping cart and wishlist
let cart = [];
let wishlist = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCount = document.querySelector('.cart-count');

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Create product card
function createProductCard(product) {
    return `
        <div class="product-card bg-white rounded-lg overflow-hidden shadow-lg" data-category="${product.category}" data-tag="${product.tag}">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                ${product.sale ? `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">Sale</span>` : ''}
                <button onclick="toggleWishlist(${product.id})" class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition">
                    <i class="fa${wishlist.includes(product.id) ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="text-yellow-400 mr-2">
                        ${createStarRating(product.rating)}
                    </div>
                    <span class="text-gray-600 text-sm">(${product.reviews})</span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-lg font-bold ${product.sale ? 'text-red-500' : 'text-gray-900'}">
                        ${product.sale ? `
                            <span class="text-gray-500 line-through text-sm mr-2">$${product.price}</span>
                            $${product.salePrice}
                        ` : `$${product.price}`}
                    </div>
                    <button onclick="addToCart(${product.id})" class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render products
function renderProducts(filterTag = 'all') {
    let filteredProducts = products;
    if (filterTag !== 'all') {
        filteredProducts = products.filter(product => product.tag === filterTag);
    }
    
    productGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Filter products
filterButtons?.forEach(button => {
    button.addEventListener('click', () => {
        const filterTag = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderProducts(filterTag);
    });
});

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Added to cart!');
    }
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist!');
    }
    renderProducts(document.querySelector('.filter-btn.active').dataset.filter);
}

// Update cart count
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg transform translate-y-full opacity-0 transition-all duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-y-full', 'opacity-0');
    }, 100);

    // Animate out
    setTimeout(() => {
        notification.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Newsletter subscription
const newsletterForm = document.querySelector('form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification('Thanks for subscribing!');
    e.target.reset();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});
