class MultipleCounters {
    constructor() {
        this.counters = [
            { id: 'counter1', target: 840, duration: 2800 },
            { id: 'counter2', target: 900, duration: 2500 },
            { id: 'counter3', target: 450, duration: 2200 }
        ];
        this.animated = false;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.startAllAnimations();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.counter-section'));
    }
    
    startAllAnimations() {
        this.counters.forEach(counter => {
            this.animateCounter(counter.id, counter.target, counter.duration);
        });
    }
    
    animateCounter(elementId, target, duration) {
        const element = document.getElementById(elementId);
        let start = 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function для плавности
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const current = Math.floor(easeOut * target);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    new MultipleCounters();
});


document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.mobile-menu-close');
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    // Open mobile menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            body.classList.add('menu-open');
        });
    }
    
    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для всех ссылок "прочитайте больше"
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем переход по ссылке
            
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');
            const image = this.getAttribute('data-image');
            
            Swal.fire({
                title: title,
                html: `
                    <div class="modal-content-wrapper">
                        ${image ? `<img src="${image}" alt="${title}" class="modal-image">` : ''}
                        <div class="modal-text-content">
                            ${content}
                        </div>
                        <div class="modal-contact-info">
                            <h4 class="modal-contact-title">📞 Хотите узнать больше?</h4>
                            <p class="modal-contact-text">Посетите нас лично или свяжитесь по телефону: <strong>+7 (999) 123-45-67</strong></p>
                        </div>
                    </div>
                `,
                width: 700,
                padding: '30px',
                background: '#fff',
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Закрыть',
                confirmButtonColor: '#000',
                customClass: {
                    popup: 'custom-popup',
                    title: 'swal-title-custom'
                }
            });
        });
    });
});



// Данные событий
const eventsData = [
    {
        day: "25",
        month: "апреля",
        title: "Мастер-класс: Полезные десерты",
        time: "18:00 - 20:00",
        location: "Основной зал ресторана",
        description: "Приглашаем всех любителей здорового питания на уникальный мастер-класс по приготовлению полезных десертов! Наш шеф-повар поделится секретами создания вкусных и полезных сладостей без сахара и искусственных добавок.",
        fullDescription: "Вы научитесь готовить: чизкейк из авокадо, шоколадные трюфели из фиников, ягодные муссы и многое другое. Все ингредиенты предоставляются. Количество мест ограничено! Идеально подходит для тех, кто следит за питанием, но не хочет отказываться от сладкого.",
        price: "1500 руб.",
        image: "./img/event1.jpg"
    },
    {
        day: "15",
        month: "май",
        title: "Вечер живой музыки и здоровой кухни",
        time: "19:00 - 23:00",
        location: "Терраса ресторана",
        description: "Особый вечер, объединяющий изысканную кухню и живую музыку! Дегустация сезонного меню от нашего шеф-повара.",
        fullDescription: "В программе: выступление джазового трио, сеты от приглашенного диджея. Мы представим новое весеннее меню, созданное из локальных продуктов. В меню: спаржа с трюфельным соусом, молодые овощи с хумусом, фермерские сыры и сезонные десерты. Напитки включены в стоимость. Романтическая атмосфера гарантирована.",
        price: "2500 руб.",
        image: "./img/event2.jpg"
    },
    {
        day: "19",
        month: "июнь",
        title: "Летний фестиваль фермерских продуктов",
        time: "12:00 - 18:00",
        location: "Летняя терраса и сад",
        description: "Крупнейшее летнее событие для ценителей качественных продуктов! Рынок фермерских продуктов и кулинарные баттлы.",
        fullDescription: "Вас ждет: рынок фермерских продуктов от проверенных поставщиков, кулинарные баттлы между шеф-поварами, детская кулинарная школа, лекции о здоровом питании и sustainable lifestyle. Особые гости: известные нутрициологи и блогеры о здоровом питании. Для детей: мастер-классы и развлекательная программа. Событие под открытым небом в нашем саду.",
        price: "Вход свободный",
        image: "./img/event3.jpg"
    }
];

// Функция для открытия модального окна событий
function openEventsModal() {
    const isMobile = window.innerWidth <= 768;
    
    Swal.fire({
        title: 'Предстоящие события',
        html: `
            <div class="events-modal-content">
                <p style="text-align: center; margin-bottom: 2rem; color: #666;">
                    Присоединяйтесь к нашим уникальным событиям и откройте для себя мир здорового питания
                </p>
                
                <div class="events-list">
                    ${eventsData.map(event => `
                        <div class="event-modal-item">
                            <div class="event-modal-header">
                                <div class="event-date-circle">
                                    <div class="event-date-day">${event.day}</div>
                                    <div class="event-date-month">${event.month}</div>
                                </div>
                                <div class="event-title-section">
                                    <h3 class="event-modal-title">${event.title}</h3>
                                    <p class="event-modal-time">🕐 ${event.time}</p>
                                </div>
                            </div>
                            
                            <div class="event-modal-description">
                                <p>${event.fullDescription}</p>
                            </div>
                            
                            <div class="event-details-grid">
                                <div class="event-detail-item">
                                    <strong>📍 Место:</strong>
                                    <span>${event.location}</span>
                                </div>
                                <div class="event-detail-item">
                                    <strong>👥 Формат:</strong>
                                    <span>${event.price === "Вход свободный" ? "Открытое мероприятие" : "Мастер-класс"}</span>
                                </div>
                            </div>
                            
                            <div class="event-modal-price">
                                ${event.price}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="events-modal-actions">
                    <button class="events-btn-primary" onclick="bookAllEvents()">
                        🎫 Забронировать участие
                    </button>
                    <button class="events-btn-secondary" onclick="subscribeToEvents()">
                        📧 Подписаться на анонсы
                    </button>
                </div>
            </div>
        `,
        width: isMobile ? '95%' : 800,
        padding: isMobile ? '15px' : '30px',
        background: '#fff',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            popup: 'custom-popup'
        }
    });
}

// Функция бронирования участия
function bookAllEvents() {
    Swal.fire({
        title: 'Бронирование участия',
        html: `
            <div style="text-align: left;">
                <p>Выберите события, в которых хотите участвовать:</p>
                
                <div style="margin: 1rem 0;">
                    ${eventsData.map((event, index) => `
                        <label style="display: block; margin: 0.5rem 0; cursor: pointer;">
                            <input type="checkbox" id="event-${index}" style="margin-right: 0.5rem;">
                            ${event.day} ${event.month} - ${event.title} (${event.price})
                        </label>
                    `).join('')}
                </div>
                
                <div style="margin-top: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Ваше имя:</label>
                    <input type="text" id="eventsUserName" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 1rem;" placeholder="Введите ваше имя">
                    
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Телефон:</label>
                    <input type="tel" id="eventsUserPhone" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;" placeholder="+7 (XXX) XXX-XX-XX">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Отправить заявку',
        cancelButtonText: 'Отмена',
        preConfirm: () => {
            const name = document.getElementById('eventsUserName').value;
            const phone = document.getElementById('eventsUserPhone').value;
            const selectedEvents = eventsData.filter((_, index) => 
                document.getElementById(`event-${index}`).checked
            );
            
            if (!name || !phone) {
                Swal.showValidationMessage('Пожалуйста, заполните все обязательные поля');
                return false;
            }
            
            if (selectedEvents.length === 0) {
                Swal.showValidationMessage('Пожалуйста, выберите хотя бы одно событие');
                return false;
            }
            
            return { name, phone, events: selectedEvents };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Заявка отправлена!',
                text: 'Мы свяжемся с вами в ближайшее время для подтверждения бронирования.',
                icon: 'success',
                confirmButtonText: 'Отлично'
            });
        }
    });
}

// Функция подписки на анонсы
function subscribeToEvents() {
    Swal.fire({
        title: 'Подписка на анонсы событий',
        html: `
            <div style="text-align: left;">
                <p>Получайте первыми информацию о новых событиях, специальных предложениях и эксклюзивных мероприятиях.</p>
                
                <div style="margin-top: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email:</label>
                    <input type="email" id="subscribeEmail" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 1rem;" placeholder="your@email.com">
                    
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Имя:</label>
                    <input type="text" id="subscribeName" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 4px;" placeholder="Ваше имя">
                </div>
                
                <label style="display: block; margin: 1rem 0; cursor: pointer;">
                    <input type="checkbox" id="subscribeAgree" style="margin-right: 0.5rem;">
                    Я согласен получать информационные рассылки
                </label>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Подписаться',
        cancelButtonText: 'Отмена',
        preConfirm: () => {
            const email = document.getElementById('subscribeEmail').value;
            const name = document.getElementById('subscribeName').value;
            const agree = document.getElementById('subscribeAgree').checked;
            
            if (!email || !name) {
                Swal.showValidationMessage('Пожалуйста, заполните все поля');
                return false;
            }
            
            if (!agree) {
                Swal.showValidationMessage('Необходимо согласие на рассылку');
                return false;
            }
            
            return { email, name };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Подписка оформлена!',
                text: 'Теперь вы будете первыми узнавать о наших событиях.',
                icon: 'success',
                confirmButtonText: 'Отлично'
            });
        }
    });
}

// Инициализация обработчика событий
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для кнопки "прочитайте больше" в событиях
    document.querySelector('.read-more-events')?.addEventListener('click', function(e) {
        e.preventDefault();
        openEventsModal();
    });
});