// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Reviews slider
class ReviewsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.review-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.init();
    }

    init() {
        this.showSlide(0);
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-slide every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                slide.style.animation = 'slideInUp 0.5s ease-out';
            }
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
}

// Initialize reviews slider
const reviewsSlider = new ReviewsSlider();

// Modal functionality
class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.closeBtn = document.querySelector('.close-btn');
        this.ctaButton = document.querySelector('.cta-button');
        this.init();
    }

    init() {
        this.ctaButton.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize modal
const modal = new Modal();

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const terms = formData.get('terms');
    
    if (!terms) {
        alert('Пожалуйста, согласитесь с условиями работы сайта');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправляется...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Спасибо, ${name}! Мы свяжемся с вами по email ${email}`);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        modal.close();
        this.reset();
    }, 2000);
});

// Category hover effects
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const character = document.querySelector('.character');
    const blossoms = document.querySelectorAll('.blossom');
    
    if (hero && character) {
        const rate = scrolled * -0.5;
        character.style.transform = `translateY(${rate}px)`;
    }
    
    blossoms.forEach((blossom, index) => {
        const rate = scrolled * -0.3 + (index * 50);
        blossom.style.transform = `translateY(${rate}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-item, .review-card, .nav-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add floating animation to cherry blossoms
function createFloatingBlossom() {
    const blossom = document.createElement('div');
    blossom.className = 'blossom floating-blossom';
    blossom.style.left = Math.random() * 100 + '%';
    blossom.style.animationDuration = (Math.random() * 3 + 5) + 's';
    blossom.style.animationDelay = Math.random() * 2 + 's';
    
    document.querySelector('.cherry-blossoms').appendChild(blossom);
    
    setTimeout(() => {
        blossom.remove();
    }, 8000);
}

// Create floating blossoms periodically
setInterval(createFloatingBlossom, 2000);

// Add CSS for floating blossoms
const style = document.createElement('style');
style.textContent = `
    .floating-blossom {
        position: absolute;
        width: 15px;
        height: 15px;
        background: #ffb3d9;
        border-radius: 50% 0 50% 0;
        animation: fall 8s linear infinite;
        top: -20px;
    }
`;
document.head.appendChild(style);

// Smooth reveal animation for elements
function revealElements() {
    const elements = document.querySelectorAll('.category-item, .review-card');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    revealElements();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects to navigation items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Add typing effect to welcome text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to welcome text
window.addEventListener('load', () => {
    const welcomeText = document.querySelector('.welcome-text h1');
    const originalText = welcomeText.textContent;
    typeWriter(welcomeText, originalText, 80);
});

// Add particle effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#ffb3d9';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.animation = 'floatUp 4s linear forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createParticle, 3000);

// Products data
const products = [
    // Косплей товары
    {
        id: 1,
        title: "Косплей костюм Наруто",
        category: "cosplay",
        price: 4500,
        image: "",
        description: "Полный костюм Наруто Узумаки с оранжевым жилетом, синими штанами и повязкой на лбу.",
        badge: "Популярно"
    },
    {
        id: 2,
        title: "Косплей костюм Сакуры",
        category: "cosplay",
        price: 3800,
        image: "",
        description: "Косплей костюм Сакуры Харуно из Наруто. Включает платье, парик и аксессуары.",
        badge: "Популярно"
    },
    {
        id: 3,
        title: "Косплей костюм Аниме Девочки",
        category: "cosplay",
        price: 4200,
        image: "",
        description: "Красивый костюм аниме персонажа с париком и аксессуарами.",
        badge: "Новинка"
    },
    
    // Мягкие игрушки
    {
        id: 4,
        title: "Плюшевый покемон Пикачу",
        category: "toys",
        price: 1200,
        image: "",
        description: "Мягкая игрушка Пикачу высотой 25 см. Изготовлена из качественного плюша.",
        badge: "Новинка"
    },
    {
        id: 5,
        title: "Плюшевый Тоторо",
        category: "toys",
        price: 1800,
        image: "",
        description: "Большой плюшевый Тоторо из 'Моего соседа Тоторо'. Высота 35 см.",
        badge: "Новинка"
    },
    {
        id: 6,
        title: "Плюшевый медведь",
        category: "toys",
        price: 950,
        image: "",
        description: "Мягкий плюшевый медведь с бантиком. Высота 30 см.",
        badge: "Скидка"
    },
    
    // Дакимакуры
    {
        id: 7,
        title: "Дакимакура Аска Лэнгли",
        category: "dakimakura",
        price: 3200,
        image: "",
        description: "Подушка-дакимакура с изображением Аски из Евангелиона. Размер 150x50 см.",
        badge: "Хит"
    },
    {
        id: 8,
        title: "Дакимакура Рем",
        category: "dakimakura",
        price: 3500,
        image: "",
        description: "Подушка-дакимакура с изображением Рем из Re:Zero. Размер 150x50 см.",
        badge: "Хит"
    },
    {
        id: 9,
        title: "Дакимакура Аниме Девочка",
        category: "dakimakura",
        price: 2800,
        image: "",
        description: "Подушка-дакимакура с изображением аниме персонажа. Размер 150x50 см.",
        badge: "Популярно"
    },
    
    // Комиксы
    {
        id: 10,
        title: "Манга Атака Титанов",
        category: "comics",
        price: 800,
        image: "",
        description: "Первый том манги 'Атака Титанов' на русском языке. Качественная печать.",
        badge: "Скидка"
    },
    {
        id: 11,
        title: "Манга Токийский Гуль",
        category: "comics",
        price: 900,
        image: "",
        description: "Первый том манги 'Токийский Гуль' на русском языке. Темная фантастика.",
        badge: "Скидка"
    },
    {
        id: 12,
        title: "Манга Наруто",
        category: "comics",
        price: 750,
        image: "",
        description: "Первый том манги 'Наруто' на русском языке. Приключения ниндзя.",
        badge: "Популярно"
    },
    
    // Стикеры
    {
        id: 13,
        title: "Набор стикеров Аниме",
        category: "stickers",
        price: 300,
        image: "",
        description: "Набор стикеров с аниме персонажами. 20 штук в наборе.",
        badge: "Новинка"
    },
    {
        id: 14,
        title: "Стикеры Покемоны",
        category: "stickers",
        price: 250,
        image: "",
        description: "Стикеры с покемонами для украшения телефона и ноутбука.",
        badge: "Популярно"
    },
    {
        id: 15,
        title: "Стикеры Кавай",
        category: "stickers",
        price: 200,
        image: "",
        description: "Милые стикеры в стиле кавай для девочек.",
        badge: "Скидка"
    },
    
    // Азиатские вкусности
    {
        id: 16,
        title: "Рамен быстрого приготовления",
        category: "food",
        price: 150,
        image: "",
        description: "Японский рамен быстрого приготовления со вкусом говядины.",
        badge: "Популярно"
    },
    {
        id: 17,
        title: "Японские конфеты",
        category: "food",
        price: 400,
        image: "",
        description: "Набор японских конфет с разными вкусами. 15 штук.",
        badge: "Новинка"
    },
    {
        id: 18,
        title: "Корейские закуски",
        category: "food",
        price: 350,
        image: "",
        description: "Набор корейских закусок и чипсов. 10 видов.",
        badge: "Хит"
    },
    
    // Цветные линзы
    {
        id: 19,
        title: "Цветные линзы Голубые",
        category: "lenses",
        price: 1200,
        image: "",
        description: "Цветные контактные линзы голубого цвета. Однодневные.",
        badge: "Популярно"
    },
    {
        id: 20,
        title: "Цветные линзы Зеленые",
        category: "lenses",
        price: 1200,
        image: "",
        description: "Цветные контактные линзы зеленого цвета. Однодневные.",
        badge: "Новинка"
    },
    {
        id: 21,
        title: "Цветные линзы Фиолетовые",
        category: "lenses",
        price: 1200,
        image: "",
        description: "Цветные контактные линзы фиолетового цвета. Однодневные.",
        badge: "Хит"
    }
];

// Cart functionality
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        this.loadCart();
        this.updateCartDisplay();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartAnimation(product);
        this.showCartIconAnimation();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
                this.showCartIconAnimation(); // Show animation on quantity change
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('kita_cart', JSON.stringify(this.items));
    }

    loadCart() {
        const savedCart = localStorage.getItem('kita_cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartTotal = document.getElementById('cartTotal');
        
        if (cartCount) {
            const itemCount = this.getItemCount();
            cartCount.textContent = itemCount;
            
            // Show/hide cart count based on items
            if (itemCount > 0) {
                cartCount.style.display = 'flex';
                cartCount.style.visibility = 'visible';
            } else {
                cartCount.style.display = 'none';
            }
        }
        
        if (cartTotal) {
            cartTotal.textContent = this.getTotal().toLocaleString();
        }
        
        // Update cart button visibility
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            const itemCount = this.getItemCount();
            if (itemCount > 0) {
                cartButton.style.position = 'relative';
            }
        }
    }

    showAddToCartAnimation(product) {
        const button = document.querySelector(`[data-product-id="${product.id}"]`);
        if (button) {
            button.classList.add('added');
            button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
            
            setTimeout(() => {
                button.classList.remove('added');
                button.innerHTML = '<i class="fas fa-shopping-cart"></i> В корзину';
            }, 2000);
        }
    }

    showCartIconAnimation() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            // Force animation restart
            cartCount.style.animation = 'none';
            cartCount.offsetHeight; // Trigger reflow
            cartCount.style.animation = 'bounce 0.6s ease';
            
            // Show cart count if it was hidden
            cartCount.style.display = 'flex';
        }
        
        // Show floating cart icon
        this.createFloatingCartIcon();
    }

    createFloatingCartIcon() {
        // Remove existing floating icon
        const existingIcon = document.querySelector('.floating-cart-icon');
        if (existingIcon) {
            existingIcon.remove();
        }

        // Create floating cart icon
        const floatingIcon = document.createElement('div');
        floatingIcon.className = 'floating-cart-icon';
        floatingIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
        
        // Position it at the clicked button
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const lastClickedButton = Array.from(addToCartButtons).find(btn => btn.classList.contains('added'));
        
        if (lastClickedButton) {
            const rect = lastClickedButton.getBoundingClientRect();
            floatingIcon.style.position = 'fixed';
            floatingIcon.style.left = (rect.left + rect.width / 2) + 'px';
            floatingIcon.style.top = (rect.top + rect.height / 2) + 'px';
            floatingIcon.style.zIndex = '10000';
            floatingIcon.style.fontSize = '1.5rem';
            floatingIcon.style.color = '#e91e63';
            floatingIcon.style.pointerEvents = 'none';
            floatingIcon.style.transform = 'translate(-50%, -50%)';
            floatingIcon.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            document.body.appendChild(floatingIcon);
            
            // Animate to cart
            setTimeout(() => {
                const cartButton = document.getElementById('cartButton');
                const cartRect = cartButton.getBoundingClientRect();
                
                floatingIcon.style.left = (cartRect.left + cartRect.width / 2) + 'px';
                floatingIcon.style.top = (cartRect.top + cartRect.height / 2) + 'px';
                floatingIcon.style.transform = 'translate(-50%, -50%) scale(0.5)';
                floatingIcon.style.opacity = '0';
            }, 100);
            
            // Remove after animation
            setTimeout(() => {
                if (floatingIcon.parentElement) {
                    floatingIcon.remove();
                }
            }, 900);
        }
    }

    renderCart() {
        const cartContent = document.getElementById('cartContent');
        const cartFooter = document.getElementById('cartFooter');
        
        if (this.items.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Ваша корзина пуста</p>
                </div>
            `;
            cartFooter.style.display = 'none';
        } else {
            cartContent.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price} ₽</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-item" onclick="cart.removeItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            cartFooter.style.display = 'flex';
        }
    }
}

// Initialize cart
const cart = new Cart();

// Products catalog functionality
class ProductsCatalog {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupFilters();
        this.setupCategoryFilters();
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const filteredProducts = this.currentFilter === 'all' 
            ? products 
            : products.filter(product => product.category === this.currentFilter);

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <div class="product-badge">${product.badge}</div>
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <div class="product-title">${product.title}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-footer">
                        <div class="product-price">${product.price.toLocaleString()} ₽</div>
                        <button class="add-to-cart" data-product-id="${product.id}" onclick="cart.addItem(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <i class="fas fa-shopping-cart"></i> В корзину
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const categoryNames = {
            'cosplay': 'Косплей',
            'toys': 'Игрушки',
            'dakimakura': 'Дакимакуры',
            'comics': 'Комиксы',
            'stickers': 'Стикеры',
            'food': 'Азиатские вкусности',
            'lenses': 'Цветные линзы'
        };
        return categoryNames[category] || category;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Update current filter
                this.currentFilter = button.dataset.filter;
                
                // Re-render products with animation
                this.renderProducts();
                
                // Scroll to products section
                document.querySelector('.products-catalog').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    setupCategoryFilters() {
        const categoryItems = document.querySelectorAll('.category-item');
        
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                
                // Update filter buttons
                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                const targetButton = document.querySelector(`[data-filter="${category}"]`);
                if (targetButton) {
                    targetButton.classList.add('active');
                    this.currentFilter = category;
                    this.renderProducts();
                } else {
                    // If no specific filter button, show all
                    document.querySelector('[data-filter="all"]').classList.add('active');
                    this.currentFilter = 'all';
                    this.renderProducts();
                }
                
                // Scroll to products section
                document.querySelector('.products-catalog').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
}

// Initialize products catalog
const productsCatalog = new ProductsCatalog();

// Cart modal functionality
class CartModal {
    constructor() {
        this.modal = document.getElementById('cartModal');
        this.cartButton = document.getElementById('cartButton');
        this.closeBtn = this.modal.querySelector('.close-btn');
        this.init();
    }

    init() {
        this.cartButton.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        cart.renderCart();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize cart modal
const cartModal = new CartModal();

// Navigation functions
function showComingSoon(section) {
    showNotification(`Раздел "${section}" скоро будет доступен!`, 'info');
}

// Search functionality
let searchTimeout;
let isSearchOpen = false;

function toggleSearch() {
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    
    if (isSearchOpen) {
        closeSearch();
    } else {
        openSearch();
    }
}

function openSearch() {
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    
    searchDropdown.classList.add('active');
    searchInput.focus();
    isSearchOpen = true;
    
    // Show suggestions initially
    showSearchSuggestions();
    
    // Close search when clicking outside
    setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
    }, 100);
}

function closeSearch() {
    const searchDropdown = document.getElementById('searchDropdown');
    const searchInput = document.getElementById('searchInput');
    
    searchDropdown.classList.remove('active');
    searchInput.value = '';
    clearSearchResults();
    isSearchOpen = false;
    
    document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer.contains(event.target)) {
        closeSearch();
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    searchInput.value = '';
    searchClear.classList.remove('visible');
    clearSearchResults();
    showSearchSuggestions();
}

function showSearchSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchResults = document.getElementById('searchResults');
    
    searchSuggestions.style.display = 'block';
    searchResults.innerHTML = '';
}

function clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
}

// Search functionality
function performSearch(query) {
    if (!query || query.length < 1) {
        showSearchSuggestions();
        return;
    }
    
    const searchResults = document.getElementById('searchResults');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Show loading
    searchResults.innerHTML = `
        <div class="search-loading">
            <i class="fas fa-spinner"></i>
            <p>Поиск...</p>
        </div>
    `;
    searchSuggestions.style.display = 'none';
    
    // Clear previous timeout
    clearTimeout(searchTimeout);
    
    // Perform search with delay
    searchTimeout = setTimeout(() => {
        try {
            const results = searchProducts(query);
            displaySearchResults(results, query);
        } catch (error) {
            console.error('Search error:', error);
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Ошибка поиска. Попробуйте еще раз.</p>
                </div>
            `;
        }
    }, 300);
}

function searchProducts(query) {
    if (!query || query.length < 1) {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    console.log('Searching for:', searchTerm);
    
    const results = products.filter(product => {
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        const category = getCategoryName(product.category).toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        if (matches) {
            console.log('Found match:', product.title);
        }
        
        return matches;
    });
    
    console.log('Search results:', results.length);
    return results;
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <p>По запросу "${query}" ничего не найдено</p>
                <p style="font-size: 0.9rem; color: #999; margin-top: 0.5rem;">
                    Попробуйте изменить поисковый запрос
                </p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" onclick="selectSearchResult(${product.id})">
                <div class="search-result-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="search-result-info">
                    <div class="search-result-title">${highlightSearchTerm(product.title, query)}</div>
                    <div class="search-result-category">${getCategoryName(product.category)}</div>
                    <div class="search-result-price">${product.price.toLocaleString()} ₽</div>
                </div>
            </div>
        `).join('');
    }
}

function highlightSearchTerm(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark style="background: #ffeb3b; padding: 0.1rem 0.2rem; border-radius: 3px;">$1</mark>');
}

function selectSearchResult(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Filter products to show only this one
        productsCatalog.currentFilter = 'all';
        productsCatalog.renderProducts();
        
        // Highlight the product
        setTimeout(() => {
            const productCard = document.querySelector(`[data-product-id="${productId}"]`);
            if (productCard) {
                productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                productCard.style.animation = 'pulse 1s ease-in-out';
                setTimeout(() => {
                    productCard.style.animation = '';
                }, 1000);
            }
        }, 100);
        
        closeSearch();
        showNotification(`Найден товар: ${product.title}`, 'success');
    }
}

function searchByCategory(category) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = getCategoryName(category);
    performSearch(searchInput.value);
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all elements to be ready
    setTimeout(() => {
        initializeSearch();
    }, 100);
});

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    if (searchInput) {
        console.log('Search initialized');
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            console.log('Search query:', query);
            
            if (query.length > 0) {
                if (searchClear) searchClear.classList.add('visible');
                performSearch(query);
            } else {
                if (searchClear) searchClear.classList.remove('visible');
                showSearchSuggestions();
            }
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSearch();
            }
        });
    } else {
        console.error('Search input not found');
    }
}

function showLanguageSelect() {
    showNotification('Выбор языка будет доступен в следующих версиях!', 'info');
}

function showLogin() {
    showNotification('Функция входа будет доступна в следующих версиях!', 'info');
}

function showSettings() {
    showNotification('Настройки будут доступны в следующих версиях!', 'info');
}

function showHelp() {
    showNotification('Справка будет доступна в следующих версиях!', 'info');
}

function showFavorites() {
    showNotification('Избранное будет доступно в следующих версиях!', 'info');
}

function toggleMobileMenu() {
    showNotification('Мобильное меню будет доступно в следующих версиях!', 'info');
}

// Telegram function
function openTelegram() {
    const telegramUrl = 'https://t.me/Dima101229';
    window.open(telegramUrl, '_blank');
    showNotification('Переход в Telegram...', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid #e91e63;
    }
    
    .notification-info {
        border-left-color: #2196f3;
    }
    
    .notification-success {
        border-left-color: #4caf50;
    }
    
    .notification-warning {
        border-left-color: #ff9800;
    }
    
    .notification-error {
        border-left-color: #f44336;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
    }
    
    .notification-content i:first-child {
        font-size: 1.2rem;
        color: #e91e63;
    }
    
    .notification-info .notification-content i:first-child {
        color: #2196f3;
    }
    
    .notification-success .notification-content i:first-child {
        color: #4caf50;
    }
    
    .notification-warning .notification-content i:first-child {
        color: #ff9800;
    }
    
    .notification-error .notification-content i:first-child {
        color: #f44336;
    }
    
    .notification-content span {
        flex: 1;
        color: #333;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 0.3rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: #f0f0f0;
        color: #333;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

console.log('🎌 Anime-Go Website loaded successfully! Welcome to our anime store! 🎌');
