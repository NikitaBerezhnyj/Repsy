# Repsy

**Repsy** — простий і зручний мобільний застосунок для трекінгу тренувань.  
Допомагає створювати тренувальні програми, відмічати виконані підходи, записувати вагу або час, пропускати вправи та фіксувати свій стан після тренування.

## 🚀 Особливості

- Створення та редагування тренувальних програм із вправами
- Виконання тренувань: по одній вправі на екрані
- Відмітка виконаних підходів, введення ваги або часу
- Можливість пропускати вправи
- Дочасне завершення тренування з фіксацією стану
- Локальне зберігання даних (SQLite) — працює офлайн
- Мінімалістичний текстовий інтерфейс без зайвих візуальних деталей
- Push-повідомлення-нагадування про тренування (планується в майбутніх оновленнях)

## 🛠 Технології

- React Native + Expo
- TypeScript
- SQLite (`expo-sqlite`)
- Expo Notifications (для push-нагадувань)
- Контекст або Zustand для управління станом

## 📦 Структура проєкту

- `src/components` — UI-компоненти (списки, кнопки, чеклісти)
- `src/screens` — основні екрани (Програми, Тренування, Історія, Статистика)
- `src/database` — моделі та логіка роботи з SQLite
- `src/hooks` — кастомні хуки для бізнес-логіки
- `src/utils` — утиліти, константи, теми
- `App.tsx` — кореневий компонент

## ⚙️ Запуск проєкту

1. Клонуйте репозиторій

```bash
git clone https://github.com/NikitaBerezhnyj/Repsy.git
cd Repsy
```

2. Встановіть залежності

```bash
npm install
```

3. Запустіть Expo

```bash
npm start
```

4. Відкрийте застосунок у симуляторі або на реальному пристрої через Expo Go

## 🎯 Поточний статус MVP

- Менеджмент тренувальних програм та вправ
- Виконання тренувань з можливістю пропускати вправи і дочасно завершувати сесію
- Локальне зберігання даних
- Прості push-нагадування (базова підтримка)

## 📝 Майбутні плани

- Розширена статистика та прогрес тренувань
- Календар тренувань з деталізацією
- Розширене налаштування push-нагадувань
- Експорт / імпорт даних, синхронізація
- Темна тема та покращена кастомізація UI
