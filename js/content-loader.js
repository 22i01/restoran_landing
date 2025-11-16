// Класс для загрузки и отображения контента меню
class ContentLoader {
    constructor() {
        this.content = {};
        this.storageKey = 'restaurantContent';
    }

    async loadContent() {
        try {
            // Сначала пробуем загрузить из localStorage
            const savedContent = localStorage.getItem(this.storageKey);
            
            if (savedContent) {
                this.content = JSON.parse(savedContent);
                console.log('Данные загружены из localStorage:', this.content);
            } else {
                // Если в localStorage нет, загружаем из JSON файла
                const response = await fetch('data/content.json');
                this.content = await response.json();
                console.log('Данные загружены из JSON файла:', this.content);
                
                // Сохраняем в localStorage для будущего использования
                this.saveToStorage();
            }
            
            this.renderContent();
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
        }
    }

    // Сохранение в localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.content));
            console.log('Данные сохранены в localStorage');
            return true;
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
            return false;
        }
    }

    renderContent() {
        this.renderChefMenu();
        this.renderEvents();
    }

    renderChefMenu() {
        const chefMenu = this.content.chefMenu;
        if (!chefMenu) return;

        const subtitleEl = document.querySelector('.shef-block h3');
        const titleEl = document.querySelector('.shef-block h1');
        const menuContainer = document.querySelector('.shef-block-menu');
        
        if (subtitleEl) subtitleEl.textContent = chefMenu.subtitle;
        if (titleEl) titleEl.textContent = chefMenu.title;
        
        this.renderChefMenuItems(menuContainer, chefMenu.items);
    }

    renderChefMenuItems(container, items) {
        if (!items || !Array.isArray(items) || !container) return;

        container.innerHTML = items.map(item => `
            <div class="shef-menu-item">
                <h3>${item.name} / ${item.price}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }

    renderEvents() {
        const events = this.content.events;
        console.log('События для рендера:', events);
        
        if (!events || !Array.isArray(events)) {
            console.warn('События не найдены в JSON или это не массив');
            return;
        }

        // Сохраняем события в свойство класса
        this.eventsData = events;
        
        // Также сохраняем в глобальную переменную для модального окна
        window.eventsData = events;

        // Обновляем блок событий на главной странице
        this.renderEventsMain(events);
    }

    renderEventsMain(events) {
        const container = document.querySelector('.main-event-date');
        if (!container) {
            console.warn('Блок .main-event-date не найден');
            return;
        }

        // Показываем только первые 3 события
        const eventsToShow = events.slice(0, 3);
        console.log('Отображаем события:', eventsToShow);

        container.innerHTML = eventsToShow.map(event => `
            <div class="event-item">
                <h1>${event.day}</h1>
                <h3>${event.month}</h3>
                <p>${event.description}</p>
            </div>
        `).join('');
    }

    // Метод для получения событий извне
    getEvents() {
        return this.eventsData || [];
    }

    // Метод для принудительного обновления данных
    refreshData() {
        this.loadContent();
    }
}

// Создаем глобальный экземпляр для доступа из других скриптов
let contentLoader;

// Автоматически запускаем загрузку когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    contentLoader = new ContentLoader();
    contentLoader.loadContent();
    
    // Добавляем кнопку обновления данных (для разработки)
    addRefreshButton();
});

// Функция для добавления кнопки обновления (только в development)
function addRefreshButton() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const refreshBtn = document.createElement('button');
        refreshBtn.textContent = '🔄 Обновить данные';
        refreshBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            padding: 10px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;
        refreshBtn.onclick = () => {
            contentLoader.refreshData();
            location.reload();
        };
        document.body.appendChild(refreshBtn);
    }
}