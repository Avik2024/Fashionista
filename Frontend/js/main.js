// Product Data
const trendingProducts = [
    {
        id: 1,
        name: "Summer Floral Dress",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
        rating: 4.5,
        reviews: 128,
        sale: false
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 89.99,
        salePrice: 69.99,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3",
        rating: 4.8,
        reviews: 96,
        sale: true
    },
    {
        id: 3,
        name: "Casual Sneakers",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        rating: 4.6,
        reviews: 112,
        sale: false
    },
    {
        id: 4,
        name: "Designer Handbag",
        price: 129.99,
        salePrice: 99.99,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        rating: 4.9,
        reviews: 75,
        sale: true
    }
];

// Shopping cart
let cart = [];
let wishlist = [];

// DOM Elements
const productGrid = document.querySelector('.grid-cols-4');
const cartCount = document.querySelector('.cart-count');
const newsletterForm = document.querySelector('form');

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
        <div class="product-card bg-white rounded-lg overflow-hidden shadow-lg">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                ${product.sale ? `<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">Sale</span>` : ''}
                <button onclick="toggleWishlist(${product.id})" class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition">
                    <i class="far fa-heart"></i>
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

// Render trending products
function renderTrendingProducts() {
    if (productGrid) {
        productGrid.innerHTML = trendingProducts.map(product => createProductCard(product)).join('');
    }
}

// Cart functions
function addToCart(productId) {
    const product = trendingProducts.find(p => p.id === productId);
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
    renderTrendingProducts();
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
    notification.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg transform translate-y-full opacity-0 transition-all duration-300 z-50';
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
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification('Thanks for subscribing!');
    e.target.reset();
});

// Mobile menu
const mobileMenuButton = document.querySelector('.md\\:hidden');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'fixed inset-0 bg-gray-800 bg-opacity-50 z-50 hidden';
mobileMenu.innerHTML = `
    <div class="fixed right-0 top-0 w-64 h-full bg-white shadow-lg transform translate-x-full transition-transform duration-300">
        <div class="p-4">
            <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <nav class="mt-8">
                <a href="women.html" class="block py-2 text-gray-600 hover:text-purple-600">Women</a>
                <a href="men.html" class="block py-2 text-gray-600 hover:text-purple-600">Men</a>
                <a href="kids.html" class="block py-2 text-gray-600 hover:text-purple-600">Kids</a>
                <a href="beauty.html" class="block py-2 text-gray-600 hover:text-purple-600">Beauty</a>
            </nav>
        </div>
    </div>
`;

document.body.appendChild(mobileMenu);

mobileMenuButton?.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.querySelector('.transform').classList.remove('translate-x-full');
});

mobileMenu.querySelector('button')?.addEventListener('click', () => {
    mobileMenu.querySelector('.transform').classList.add('translate-x-full');
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTrendingProducts();
    updateCartCount();
});
