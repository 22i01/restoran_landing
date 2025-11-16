// Глобальная переменная для хранения данных меню
let contentData = {};

// Ключ для localStorage
const STORAGE_KEY = 'restaurantContent';

// Функция загрузки текущего меню
async function loadContent() {
    try {
        console.log('Пытаюсь загрузить данные...');
        
        // Пробуем загрузить из localStorage
        const savedContent = localStorage.getItem(STORAGE_KEY);
        
        if (savedContent) {
            contentData = JSON.parse(savedContent);
            console.log('Данные загружены из localStorage:', contentData);
            populateForm();
            alert('✅ Данные загружены из браузера!');
            return;
        }
        
        // Если в localStorage нет, пробуем загрузить из JSON файла
        const paths = [
            '../data/content.json',
            './../data/content.json',
            '/data/content.json',
            'data/content.json'
        ];
        
        let response;
        for (let path of paths) {
            try {
                console.log('Пробую путь:', path);
                response = await fetch(path);
                if (response.ok) break;
            } catch (e) {
                console.log('Путь не сработал:', path);
            }
        }
        
        if (response && response.ok) {
            contentData = await response.json();
            console.log('Данные загружены из JSON файла:', contentData);
            
            // Сохраняем в localStorage для будущего использования
            saveToStorage();
            
            populateForm();
            alert('✅ Данные загружены из файла и сохранены в браузере!');
        } else {
            throw new Error('Файл не найден ни по одному из путей');
        }
        
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
        alert('⚠️ Данные не найдены. Создана новая структура.');
    }
}

// Функция сохранения в localStorage
function saveToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contentData, null, 2));
        console.log('Данные сохранены в localStorage');
        return true;
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
        return false;
    }
}

// Функция автоматического сохранения при изменениях
function autoSave() {
    if (saveToStorage()) {
        showSaveIndicator();
    }
}

// Показываем индикатор сохранения
function showSaveIndicator() {
    const indicator = document.getElementById('saveIndicator') || createSaveIndicator();
    indicator.style.display = 'block';
    indicator.textContent = '✓ Сохранено';
    indicator.style.background = '#28a745';
    
    setTimeout(() => {
        indicator.style.display = 'none';
    }, 2000);
}

// Создаем индикатор сохранения
function createSaveIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'saveIndicator';
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        z-index: 10000;
        display: none;
        font-weight: bold;
    `;
    document.body.appendChild(indicator);
    return indicator;
}

// Заполняем форму данными из contentData
function populateForm() {
    // Меню шеф-повара
    document.getElementById('chefMenuTitle').value = contentData.chefMenu?.title || '';
    document.getElementById('chefMenuSubtitle').value = contentData.chefMenu?.subtitle || '';
    
    // Рендерим меню
    renderChefMenuItems();
}

// === ФУНКЦИИ ДЛЯ МЕНЮ ШЕФ-ПОВАРА ===

function renderChefMenuItems() {
    const container = document.getElementById('chefMenuItems');
    container.innerHTML = '';
    
    if (!contentData.chefMenu?.items) {
        contentData.chefMenu = { items: [] };
    }
    
    contentData.chefMenu.items.forEach((item, index) => {
        const itemHTML = `
            <div class="menu-item">
                <h4>🍽️ Блюдо ${index + 1}</h4>
                <input type="text" value="${item.name}" 
                       oninput="updateChefMenuItem(${index}, 'name', this.value); autoSave();" 
                       placeholder="Название блюда">
                <input type="text" value="${item.price}" 
                       oninput="updateChefMenuItem(${index}, 'price', this.value); autoSave();" 
                       placeholder="Цена">
                <textarea oninput="updateChefMenuItem(${index}, 'description', this.value); autoSave();" 
                          placeholder="Описание блюда"
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
    autoSave();
}

function updateChefMenuItem(index, field, value) {
    contentData.chefMenu.items[index][field] = value;
}

function removeChefMenuItem(index) {
    if (confirm('❌ Удалить это блюдо из меню?')) {
        contentData.chefMenu.items.splice(index, 1);
        renderChefMenuItems();
        autoSave();
    }
}

function moveChefMenuItem(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < contentData.chefMenu.items.length) {
        const temp = contentData.chefMenu.items[index];
        contentData.chefMenu.items[index] = contentData.chefMenu.items[newIndex];
        contentData.chefMenu.items[newIndex] = temp;
        renderChefMenuItems();
        autoSave();
    }
}

// Функция сброса данных (очистка localStorage)
function resetData() {
    if (confirm('❌ Вы уверены, что хотите сбросить все данные? Это удалит все изменения и восстановит исходные настройки.')) {
        localStorage.removeItem(STORAGE_KEY);
        alert('Данные сброшены. Страница будет перезагружена.');
        location.reload();
    }
}

// Функция экспорта данных (на случай если нужно сохранить backup)
function exportData() {
    const dataStr = JSON.stringify(contentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'restaurant-backup.json';
    link.click();
    
    alert('📁 Backup данных сохранен!');
}

// Загружаем контент при загрузке страницы
document.addEventListener('DOMContentLoaded', loadContent);