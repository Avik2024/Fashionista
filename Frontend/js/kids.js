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
        name: "Kids Casual T-Shirt",
        price: 24.99,
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        category: "boys",
        tag: "new",
        sale: false
    },
    {
        id: 2,
        name: "Girls Summer Dress",
        price: 39.99,
        rating: 4.8,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb",
        category: "girls",
        tag: "trending",
        sale: true,
        salePrice: 29.99
    },
    {
        id: 3,
        name: "Kids Sneakers",
        price: 49.99,
        rating: 4.6,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
        category: "shoes",
        tag: "trending",
        sale: false
    },
    {
        id: 4,
        name: "Kids Backpack",
        price: 34.99,
        rating: 4.5,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1566454544259-f4b94c3d758c",
        category: "accessories",
        tag: "new",
        sale: true,
        salePrice: 24.99
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
        <div class="product-card" data-category="${product.category}" data-tag="${product.tag}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.sale ? `<span class="sale-badge">SALE</span>` : ''}
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
                    <i class="fa${wishlist.includes(product.id) ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ${product.sale 
                        ? `<span class="text-gray-400 line-through">$${product.price}</span> 
                           <span class="text-red-500">$${product.salePrice}</span>`
                        : `$${product.price}`
                    }
                </div>
                <div class="product-rating">
                    ${createStarRating(product.rating)}
                    <span class="text-gray-500 text-sm">(${product.reviews})</span>
                </div>
                <button onclick="addToCart(${product.id})" 
                    class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition mt-2">
                    Add to Cart
                </button>
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
