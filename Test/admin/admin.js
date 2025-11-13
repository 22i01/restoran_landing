// Глобальная переменная для хранения данных меню
let contentData = {};

// Функция загрузки текущего меню
async function loadContent() {
    try {
        // Пытаемся загрузить существующий файл с меню
        const response = await fetch('../data/content.json');
        contentData = await response.json();
        // Заполняем форму данными
        populateForm();
        alert('✅ Текущее меню загружено!');
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        // Если файла нет - создаем пустую структуру
        contentData = {
            chefMenu: {
                title: "Вкусно от шеф-повара",
                subtitle: "наше меню", 
                items: []
            }
        };
        alert('⚠️ Файл меню не найден. Создана новая структура.');
    }
}

// Заполняем форму данными из contentData
function populateForm() {
    // Заполняем заголовки
    document.getElementById('chefMenuTitle').value = contentData.chefMenu?.title || '';
    document.getElementById('chefMenuSubtitle').value = contentData.chefMenu?.subtitle || '';
    
    // Отображаем список блюд
    renderChefMenuItems();
}

// Отображаем все блюда в интерфейсе
function renderChefMenuItems() {
    const container = document.getElementById('chefMenuItems');
    container.innerHTML = '';
    
    // Проверяем есть ли блюда в меню
    if (!contentData.chefMenu?.items) {
        contentData.chefMenu = { items: [] };
    }
    
    // Для каждого блюда создаем блок редактирования
    contentData.chefMenu.items.forEach((item, index) => {
        const itemHTML = `
            <div class="menu-item">
                <h4>🍽️ Блюдо ${index + 1}</h4>
                <input type="text" value="${item.name}" 
                       onchange="updateChefMenuItem(${index}, 'name', this.value)" 
                       placeholder="Название блюда (например: Грушевый САЛАТ)">
                <input type="text" value="${item.price}" 
                       onchange="updateChefMenuItem(${index}, 'price', this.value)" 
                       placeholder="Цена (например: 11 $)">
                <textarea onchange="updateChefMenuItem(${index}, 'description', this.value)" 
                          placeholder="Описание блюда (ингредиенты через / )"
                          rows="3">${item.description}</textarea>
                
                <div style="margin-top: 10px;">
                    <button class="btn-danger" onclick="removeChefMenuItem(${index})">🗑️ Удалить</button>
                    <button class="btn-secondary" onclick="moveChefMenuItem(${index}, -1)" 
                            ${index === 0 ? 'disabled' : ''}>⬆️ Вверх</button>
                    <button class="btn-secondary" onclick="moveChefMenuItem(${index}, 1)" 
                            ${index === contentData.chefMenu.items.length - 1 ? 'disabled' : ''}>⬇️ Вниз</button>
                </div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}

// Добавляем новое блюдо
function addChefMenuItem() {
    if (!contentData.chefMenu) {
        contentData.chefMenu = { items: [] };
    }
    
    contentData.chefMenu.items.push({
        name: 'Новое блюдо',
        price: '0 $',
        description: 'Описание блюда'
    });
    
    renderChefMenuItems();
}

// Обновляем данные блюда
function updateChefMenuItem(index, field, value) {
    contentData.chefMenu.items[index][field] = value;
}

// Удаляем блюдо
function removeChefMenuItem(index) {
    if (confirm('❌ Удалить это блюдо из меню?')) {
        contentData.chefMenu.items.splice(index, 1);
        renderChefMenuItems();
    }
}

// Меняем порядок блюд
function moveChefMenuItem(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < contentData.chefMenu.items.length) {
        // Меняем местами два элемента
        const temp = contentData.chefMenu.items[index];
        contentData.chefMenu.items[index] = contentData.chefMenu.items[newIndex];
        contentData.chefMenu.items[newIndex] = temp;
        renderChefMenuItems();
    }
}

// Сохраняем изменения в файл
function saveContent() {
    // Собираем данные из формы
    contentData.chefMenu = {
        title: document.getElementById('chefMenuTitle').value,
        subtitle: document.getElementById('chefMenuSubtitle').value,
        items: contentData.chefMenu?.items || []
    };

    // Создаем файл для скачивания
    const dataStr = JSON.stringify(contentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'content.json';
    link.click();
    
    alert('📥 Файл content.json готов для скачивания!\n\nЗамените им файл в папке data/ на вашем сайте.');
}

// Загружаем контент при загрузке страницы
document.addEventListener('DOMContentLoaded', loadContent);