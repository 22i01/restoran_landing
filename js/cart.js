// Класс для управления корзиной - упрощенная версия
class Cart {
    constructor() {
        this.items = [];
        this.storageKey = 'restaurantCart';
        this.isModalOpen = false;
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.createCartIcon();
        console.log('Корзина инициализирована');
    }

    // Загрузка и сохранение
    loadFromStorage() {
        try {
            const savedCart = localStorage.getItem(this.storageKey);
            if (savedCart) {
                this.items = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
            this.items = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error('Ошибка сохранения корзины:', error);
        }
    }

    // Создание иконки корзины
    createCartIcon() {
        // Удаляем старую иконку если есть
        const oldIcon = document.querySelector('.cart-icon');
        if (oldIcon) oldIcon.remove();

        const cartIcon = document.createElement('div');
        cartIcon.className = 'cart-icon';
        cartIcon.innerHTML = `
            <span class="cart-icon-count">${this.getTotalItems()}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.4 5.2 16.4H17M17 13V16.4M9 19C9 19.6 8.6 20 8 20C7.4 20 7 19.6 7 19C7 18.4 7.4 18 8 18C8.6 18 9 18.4 9 19ZM17 19C17 19.6 16.6 20 16 20C15.4 20 15 19.6 15 19C15 18.4 15.4 18 16 18C16.6 18 17 18.4 17 19Z" 
                      stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
        
        // Добавляем обработчик открытия корзины
        cartIcon.addEventListener('click', () => {
            this.openCartModal();
        });

        document.body.appendChild(cartIcon);
    }

    updateCartIcon() {
        const cartCount = document.querySelector('.cart-icon-count');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
    }

    // Добавление товара
    addItem(item) {
        const existingItem = this.items.find(cartItem => 
            cartItem.name === item.name
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1,
                id: Date.now().toString()
            });
        }

        this.saveToStorage();
        this.updateCartIcon();
        this.showNotification(`"${item.name}" добавлен в корзину!`);
    }

    // Удаление товара
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.updateCartIcon();
        if (this.isModalOpen) {
            this.updateCartModal();
        }
    }

    // Изменение количества
    updateQuantity(itemId, change) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) return;

        const newQuantity = item.quantity + change;
        
        if (newQuantity < 1) {
            this.removeItem(itemId);
        } else {
            item.quantity = newQuantity;
            this.saveToStorage();
            this.updateCartIcon();
            if (this.isModalOpen) {
                this.updateCartModal();
            }
        }
    }

    // Очистка корзины
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartIcon();
        if (this.isModalOpen) {
            this.updateCartModal();
        }
        this.showNotification('Корзина очищена!');
    }

    // Расчеты
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const price = this.extractPrice(item.price);
            return total + (price * item.quantity);
        }, 0);
    }

    extractPrice(priceString) {
        if (!priceString) return 0;
        const price = priceString.replace(/[^\d]/g, '');
        return parseInt(price) || 0;
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Уведомления
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2000);
    }

    // Модальное окно корзины
    openCartModal() {
        if (this.isModalOpen) return;
        
        this.isModalOpen = true;
        this.createCartModal();
    }

    createCartModal() {
        // Создаем оверлей
        const overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.id = 'cart-overlay';

        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.id = 'cart-modal';

        // Заполняем содержимое
        this.updateModalContent(modal);

        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        document.body.classList.add('cart-open');

        // Показываем с анимацией
        setTimeout(() => {
            overlay.classList.add('active');
            modal.classList.add('active');
        }, 10);

        // Назначаем обработчики
        this.setupModalEventListeners(modal, overlay);
    }

    updateModalContent(modal) {
        if (!modal) return;

        modal.innerHTML = `
            <div class="cart-modal-header">
                <h2>Ваш заказ</h2>
                <button class="cart-close-btn" id="cart-close-btn">×</button>
            </div>
            
            <div class="cart-modal-content">
                ${this.items.length === 0 ? 
                    '<div class="cart-empty">Корзина пуста</div>' : 
                    this.renderCartItems()
                }
            </div>
            
            <div class="cart-modal-footer">
                <div class="cart-total">
                    <span>Итого:</span>
                    <span>${this.getTotalPrice().toLocaleString()} руб.</span>
                </div>
                
                <button class="whatsapp-btn" id="whatsapp-btn" ${this.items.length === 0 ? 'disabled' : ''}>
                    📱 Заказать через WhatsApp
                </button>
                
                ${this.items.length > 0 ? 
                    '<button class="clear-cart-btn" id="clear-cart-btn">Очистить корзину</button>' : 
                    ''
                }
            </div>
        `;
    }

    renderCartItems() {
        return this.items.map(item => {
            const itemTotal = this.extractPrice(item.price) * item.quantity;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-description">${item.description}</p>
                        <p class="cart-item-price">${item.price} × ${item.quantity} = ${itemTotal.toLocaleString()} руб.</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease-btn">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-btn">+</button>
                        <button class="remove-btn" title="Удалить">×</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupModalEventListeners(modal, overlay) {
        // Закрытие модального окна
        const closeBtn = modal.querySelector('#cart-close-btn');
        closeBtn.addEventListener('click', () => {
            this.closeCartModal();
        });

        overlay.addEventListener('click', () => {
            this.closeCartModal();
        });

        // Очистка корзины - ОДИН обработчик
        const clearBtn = modal.querySelector('#clear-cart-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Вы уверены, что хотите очистить корзину?')) {
                    this.clearCart();
                }
            });
        }

        // Заказ через WhatsApp - ОДИН обработчик
        const whatsappBtn = modal.querySelector('#whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                this.sendToWhatsApp();
            });
        }

        // Управление количеством - ДЕЛЕГИРОВАНИЕ
        modal.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            const itemId = cartItem.dataset.id;

            if (e.target.classList.contains('increase-btn')) {
                this.updateQuantity(itemId, 1);
            } else if (e.target.classList.contains('decrease-btn')) {
                this.updateQuantity(itemId, -1);
            } else if (e.target.classList.contains('remove-btn')) {
                this.removeItem(itemId);
            }
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeCartModal();
            }
        });
    }

    updateCartModal() {
        const modal = document.getElementById('cart-modal');
        if (modal) {
            this.updateModalContent(modal);
        }
    }

    closeCartModal() {
        this.isModalOpen = false;
        
        const modal = document.getElementById('cart-modal');
        const overlay = document.getElementById('cart-overlay');

        if (modal) {
            modal.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        setTimeout(() => {
            if (modal && modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            document.body.classList.remove('cart-open');
        }, 300);
    }

    // WhatsApp
    sendToWhatsApp() {
        if (this.items.length === 0) return;

        const phoneNumber = '+33123456789';
        const message = this.generateWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        this.closeCartModal();
    }

    generateWhatsAppMessage() {
        let message = "Здравствуйте, хотел бы сделать заказ:\n\n";
        
        this.items.forEach((item, index) => {
            const itemTotal = this.extractPrice(item.price) * item.quantity;
            message += `${index + 1}. ${item.name} - ${item.quantity} × ${item.price} = ${itemTotal.toLocaleString()} руб.\n`;
        });
        
        message += `\nИтого: ${this.getTotalPrice().toLocaleString()} руб.`;
        message += `\n\nСпасибо!`;
        
        return message;
    }
}

// Глобальный экземпляр корзины
let cart;

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    cart = new Cart();
    window.cart = cart;
});