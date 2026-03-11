# LinguaQuest 🌍

Образовательная платформа для изучения языков с геймификацией.

## Стек
- React 18 + React Router v6
- Tailwind CSS
- Vite
- localStorage для персистентности

## Быстрый старт

```bash
npm install
npm run dev
```

## Деплой на Vercel

### Вариант 1: Через Vercel CLI
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Вариант 2: Drag & Drop
1. `npm run build` — собирает папку `dist/`
2. Перейди на vercel.com → New Project → Add → drag & drop папки `dist/`

### Вариант 3: GitHub Integration
1. Залей проект на GitHub
2. vercel.com → Import Git Repository
3. Vercel автоматически определит Vite и задеплоит

## Структура проекта
```
src/
├── App.jsx              # Маршрутизация
├── main.jsx             # Точка входа
├── index.css            # Глобальные стили + Tailwind
├── contexts/
│   └── AppContext.jsx   # Глобальное состояние
├── data/
│   ├── lessons.js       # Данные уроков грамматики
│   └── videos.js        # Данные видеоуроков
├── components/
│   ├── Sidebar.jsx      # Левый сайдбар
│   ├── Header.jsx       # Шапка
│   └── Layout.jsx       # Обёртка страниц
└── pages/
    ├── AuthPage.jsx     # Регистрация/вход
    ├── HomePage.jsx     # Главная
    ├── TrainingPage.jsx # Тренировка
    ├── LessonsPage.jsx  # Видеоуроки
    ├── TasksPage.jsx    # Задания
    ├── ShopPage.jsx     # Магазин
    └── ProfilePage.jsx  # Профиль
```
