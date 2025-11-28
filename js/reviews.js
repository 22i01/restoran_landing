// Данные для отзывов
const reviews = [
    {
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        name: 'Люк Моро',
        date: '28 декабря 2023',
        text: 'Постоянный клиент уже 3 месяца. За это время улучшилось самочувствие и энергетический уровень. Персонал очень внимательный и профессиональный.',
        rating: 4
    },
    {
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'Анна Петрова',
        date: '15 января 2024',
        text: 'Невероятная атмосфера и превосходная кухня! Шеф-повар настоящий волшебник. Обязательно вернусь с друзьями.',
        rating: 5
    },
    {
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'Максим Иванов',
        date: '7 января 2024',
        text: 'Отмечали корпоративный ужин. Всё было организовано на высшем уровне. Отдельное спасибо за индивидуальный подход к нашему меню.',
        rating: 5
    },
    {
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'Екатерина Смирнова',
        date: '2 января 2024',
        text: 'Вкуснейшие десерты и уютная обстановка. Идеальное место для романтического ужина. Вино подобрали идеально к блюдам.',
        rating: 4
    },
    {
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'Дмитрий Козлов',
        date: '29 декабря 2023',
        text: 'Посетили ресторан по рекомендации. Не разочаровались! Отличное сочетание цены и качества. Особенно понравились морепродукты.',
        rating: 4
    },
    {
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'София Вольнова',
        date: '20 декабря 2023',
        text: 'Прекрасное обслуживание и изысканные блюда. Шеф-повар лично пообщался с нами, что было очень приятно. Рекомендую!',
        rating: 5
    },
    {
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'Александр Новиков',
        date: '12 декабря 2023',
        text: 'Хороший ресторан, но цены немного завышены. Еда качественная, порции большие. Обслуживание на уровне.',
        rating: 3
    },
    {
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        name: 'Виктория Орлова',
        date: '5 декабря 2023',
        text: 'Лучший ресторан в городе! Каждое посещение - это праздник. Особенно нравятся вегетарианские блюда - очень креативные и вкусные.',
        rating: 5
    }
];

// Инициализация галереи отзывов
document.addEventListener('DOMContentLoaded', function() {
    const reviewsTrack = document.querySelector('#reviewsTrack');
    const reviewsContainer = document.querySelector('#reviewsContainer');

    // Создаем элементы отзывов
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';

        // Создаем элементы
        const image = document.createElement('img');
        image.src = review.image;
        image.alt = review.name;
        image.className = 'review-image';

        const reviewContent = document.createElement('div');
        reviewContent.className = 'review-content';

        const reviewText = document.createElement('div');
        reviewText.className = 'review-text';
        reviewText.textContent = `"${review.text}"`;

        const reviewerInfo = document.createElement('div');
        reviewerInfo.className = 'reviewer-info';

        const avatar = document.createElement('img');
        avatar.src = review.avatar;
        avatar.alt = review.name;
        avatar.className = 'reviewer-avatar';

        const reviewerDetails = document.createElement('div');
        reviewerDetails.className = 'reviewer-details';

        const reviewerName = document.createElement('div');
        reviewerName.className = 'reviewer-name';
        reviewerName.textContent = review.name;

        const reviewDate = document.createElement('div');
        reviewDate.className = 'review-date';
        reviewDate.textContent = review.date;

        const rating = document.createElement('div');
        rating.className = 'rating';
        rating.textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        // Собираем структуру
        reviewerDetails.append(reviewerName, reviewDate);
        reviewerInfo.append(avatar, reviewerDetails, rating);
        reviewContent.append(reviewText, reviewerInfo);
        reviewCard.append(image, reviewContent);

        reviewsTrack.appendChild(reviewCard);
    });

    // Переменные для drag-прокрутки
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = 0;

    // События для мыши
    reviewsContainer.addEventListener('mousedown', dragStart);
    reviewsContainer.addEventListener('mousemove', drag);
    reviewsContainer.addEventListener('mouseup', dragEnd);
    reviewsContainer.addEventListener('mouseleave', dragEnd);

    // События для touch-устройств
    reviewsContainer.addEventListener('touchstart', dragStart);
    reviewsContainer.addEventListener('touchmove', drag);
    reviewsContainer.addEventListener('touchend', dragEnd);

    function dragStart(event) {
        if (event.type === 'touchstart') {
            startPosition = event.touches[0].clientX;
        } else {
            startPosition = event.clientX;
        }
        
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        reviewsContainer.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (!isDragging) return;
        
        event.preventDefault();
        
        let currentPosition = 0;
        if (event.type === 'touchmove') {
            currentPosition = event.touches[0].clientX;
        } else {
            currentPosition = event.clientX;
        }
        
        currentTranslate = previousTranslate + currentPosition - startPosition;
    }

    function dragEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        previousTranslate = currentTranslate;
        reviewsContainer.style.cursor = 'grab';
    }

    function animation() {
        setTrackPosition();
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    }

    function setTrackPosition() {
        // Ограничиваем прокрутку - нельзя прокручивать левее начальной позиции
        const minTranslate = 0;
        const maxTranslate = reviewsTrack.scrollWidth - reviewsContainer.clientWidth + 80;
        
        if (currentTranslate > minTranslate) {
            currentTranslate = minTranslate;
        } else if (currentTranslate < -maxTranslate) {
            currentTranslate = -maxTranslate;
        }
        
        reviewsTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Инициализация позиции
    setTrackPosition();

    
});