
class MultipleCounters {
    constructor() {
        this.counters = [
            { id: 'counter1', target: 840, duration: 2800 },
            { id: 'counter2', target: 900, duration: 2500 },
            { id: 'counter3', target: 450, duration: 2200 }
        ];
        this.animated = false;
        this.observer = null;
        
        this.init();
    }
    
    init() {
        const counterSection = document.querySelector('.counter-section');
        if (!counterSection) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.startAllAnimations();
                    this.animated = true;
                    this.observer.disconnect();
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '50px'
        });
        
        this.observer.observe(counterSection);
    }
    
    startAllAnimations() {
        this.counters.forEach((counter, index) => {
            setTimeout(() => {
                this.animateCounter(counter.id, counter.target, counter.duration);
            }, index * 200);
        });
    }
    
    animateCounter(elementId, target, duration) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 4);
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

function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.mobile-menu-close');
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    if (!burgerMenu || !mobileMenu) return;
    
    const openMenu = () => {
        mobileMenu.classList.add('active');
        body.classList.add('menu-open');
    };
    
    const closeMenuHandler = () => {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
    };
    
    burgerMenu.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuHandler);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenuHandler);
    });
    
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenuHandler();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenuHandler();
        }
    });
}

function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return unsafe;
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showStoryModal(title, content, image) {
    const isMobile = window.innerWidth <= 768;
    
    Swal.fire({
        title: escapeHtml(title),
        html: `
            <div class="modal-content-wrapper">
                ${image ? `<img src="${image}" alt="${escapeHtml(title)}" class="modal-image" loading="lazy">` : ''}
                <div class="modal-text-content">
                    ${escapeHtml(content)}
                </div>
                <div class="modal-contact-info">
                    <h4 class="modal-contact-title">📞 Хотите узнать больше?</h4>
                    <p class="modal-contact-text">Посетите нас лично или свяжитесь по телефону: <strong>+33 1 23 45 67 89</strong></p>
                </div>
            </div>
        `,
        width: isMobile ? '95%' : 700,
        padding: isMobile ? '15px' : '5px',
        background: '#fff',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Закрыть',
        confirmButtonColor: '#000',
        customClass: {
            popup: 'custom-popup',
            title: 'swal-title-custom'
        },
        didOpen: () => {
            const modal = document.querySelector('.swal2-popup');
            if (modal) modal.scrollTop = 0;
        }
    });
}

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

function renderEventsToMainBlock() {
    const container = document.querySelector('.main-event-date');
    if (!container) return;
    
    try {
        container.innerHTML = eventsData.map(event => `
            <div class="event-item">
                <h1>${escapeHtml(event.day)}</h1>
                <h3>${escapeHtml(event.month)}</h3>
                <p>${escapeHtml(event.description)}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering events:', error);
    }
}

function openEventsModal() {
    const isMobile = window.innerWidth <= 768;
    
    // Создаем элементы через DOM вместо HTML строки
    const modalContent = document.createElement('div');
    modalContent.className = 'events-modal-content';
    
    // Создаем вступительный текст
    const introText = document.createElement('p');
    introText.className = 'events-modal-intro';
    introText.textContent = 'Присоединяйтесь к нашим уникальным событиям и откройте для себя мир здорового питания';
    modalContent.appendChild(introText);
    
    // Создаем контейнер для списка событий
    const eventsList = document.createElement('div');
    eventsList.className = 'events-list';
    
    // Добавляем каждое событие
    eventsData.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-modal-item';
        
        // Заголовок события
        const eventHeader = document.createElement('div');
        eventHeader.className = 'event-modal-header';
        
        // Круг с датой
        const dateCircle = document.createElement('div');
        dateCircle.className = 'event-date-circle';
        
        const dateDay = document.createElement('div');
        dateDay.className = 'event-date-day';
        dateDay.textContent = event.day;
        
        const dateMonth = document.createElement('div');
        dateMonth.className = 'event-date-month';
        dateMonth.textContent = event.month;
        
        dateCircle.appendChild(dateDay);
        dateCircle.appendChild(dateMonth);
        
        // Информация о событии
        const titleSection = document.createElement('div');
        titleSection.className = 'event-title-section';
        
        const eventTitle = document.createElement('h3');
        eventTitle.className = 'event-modal-title';
        eventTitle.textContent = event.title;
        
        const eventTime = document.createElement('p');
        eventTime.className = 'event-modal-time';
        eventTime.textContent = `🕐 ${event.time}`;
        
        titleSection.appendChild(eventTitle);
        titleSection.appendChild(eventTime);
        
        eventHeader.appendChild(dateCircle);
        eventHeader.appendChild(titleSection);
        
        // Описание события
        const eventDescription = document.createElement('div');
        eventDescription.className = 'event-modal-description';
        
        const descriptionText = document.createElement('p');
        descriptionText.textContent = event.fullDescription;
        eventDescription.appendChild(descriptionText);
        
        // Детали события
        const eventDetails = document.createElement('div');
        eventDetails.className = 'event-details-grid';
        
        const locationDetail = document.createElement('div');
        locationDetail.className = 'event-detail-item';
        
        const locationLabel = document.createElement('strong');
        locationLabel.textContent = '📍 Место:';
        const locationValue = document.createElement('span');
        locationValue.textContent = event.location;
        
        locationDetail.appendChild(locationLabel);
        locationDetail.appendChild(locationValue);
        
        const formatDetail = document.createElement('div');
        formatDetail.className = 'event-detail-item';
        
        const formatLabel = document.createElement('strong');
        formatLabel.textContent = '👥 Формат:';
        const formatValue = document.createElement('span');
        formatValue.textContent = event.price === "Вход свободный" ? "Открытое мероприятие" : "Мастер-класс";
        
        formatDetail.appendChild(formatLabel);
        formatDetail.appendChild(formatValue);
        
        eventDetails.appendChild(locationDetail);
        eventDetails.appendChild(formatDetail);
        
        // Цена
        const eventPrice = document.createElement('div');
        eventPrice.className = 'event-modal-price';
        eventPrice.textContent = event.price;
        
        // Собираем все вместе
        eventItem.appendChild(eventHeader);
        eventItem.appendChild(eventDescription);
        eventItem.appendChild(eventDetails);
        eventItem.appendChild(eventPrice);
        
        eventsList.appendChild(eventItem);
    });
    
    modalContent.appendChild(eventsList);
    
    Swal.fire({
        title: 'Предстоящие события',
        html: modalContent,
        width: isMobile ? '95%' : 800,
        padding: isMobile ? '15px' : '5px',
        background: '#fff',
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Закрыть',
        confirmButtonColor: '#000',
        customClass: {
            popup: 'custom-popup'
        },
        didOpen: () => {
            const modal = document.querySelector('.swal2-popup');
            if (modal) modal.scrollTop = 0;
        }
    });
}

function initModals() {
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');
            const image = this.getAttribute('data-image');
            
            if (!title || !content) {
                console.warn('Missing modal data:', { title, content, image });
                return;
            }
            
            showStoryModal(title, content, image);
        });
    });
}

function initEvents() {
    renderEventsToMainBlock();
    
    const readMoreBtn = document.querySelector('.read-more-events');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openEventsModal();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        new MultipleCounters();
        initMobileMenu();
        initModals();
        initEvents();
        
        console.log('All modules initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Получаем все изображения в секции .main-story
    const images = document.querySelectorAll('.main-story img');

    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Если элемент в зоне видимости
            if (entry.isIntersecting) {
                // Добавляем класс для анимации
                entry.target.classList.add('animated');
                // Можно отключить наблюдение после появления, чтобы анимация не повторялась
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Сработает, когда 10% элемента видно
    });


    images.forEach(img => {
        observer.observe(img);
    });
});

// Более современный подход с Intersection Observer
function initScrollAnimation() {
    const gallery = document.getElementById('gallery');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Останавливаем наблюдение после анимации
            }
        });
    }, {
        threshold: 0.3, // Срабатывает когда 30% элемента видно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
    });

    observer.observe(gallery);
}

// Запускаем когда DOM загружен
document.addEventListener('DOMContentLoaded', initScrollAnimation);