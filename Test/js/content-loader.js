// Класс для загрузки и отображения контента меню
class ContentLoader {
    constructor() {
        this.content = {}; // Здесь будем хранить загруженные данные
    }

    // Основная функция загрузки
    async loadContent() {
        try {
            // Загружаем данные из JSON файла
            const response = await fetch('data/content.json');
            this.content = await response.json();
            // Обновляем контент на странице
            this.renderContent();
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
        }
    }

    // Обновляем весь контент на странице
    renderContent() {
        this.renderChefMenu();
    }

    // Обновляем раздел меню шеф-повара
    renderChefMenu() {
        const chefMenu = this.content.chefMenu;
        if (!chefMenu) return;

        // Находим элементы на странице по классам
        const subtitleEl = document.querySelector('.shef-block h3');
        const titleEl = document.querySelector('.shef-block h1');
        const menuContainer = document.querySelector('.shef-block-menu');
        
        // Обновляем заголовки если элементы найдены
        if (subtitleEl) subtitleEl.textContent = chefMenu.subtitle;
        if (titleEl) titleEl.textContent = chefMenu.title;
        
        // Обновляем список блюд
        this.renderChefMenuItems(menuContainer, chefMenu.items);
    }

    // Рендерим список блюд
    renderChefMenuItems(container, items) {
        if (!items || !Array.isArray(items) || !container) return;

        // Создаем HTML для каждого блюда
        container.innerHTML = items.map(item => `
            <div class="shef-menu-item">
                <h3>${item.name} / ${item.price}</h3>
                <p>${item.description}</p>
            </div>
        `).join(''); // join('') объединяет массив в одну строку
    }
}

// Автоматически запускаем загрузку когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ContentLoader();
    loader.loadContent();
});