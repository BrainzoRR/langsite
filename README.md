# LinguaQuest v2 🌍

## Быстрый старт
```bash
npm install
npm run dev        # http://localhost:5173
```

## Деплой на Vercel

### Вариант 1 — Vercel CLI (самый простой)
```bash
npm install
npm run build
npx vercel --prod
```

### Вариант 2 — Drag & Drop
1. `npm run build` — появится папка `dist/`
2. Зайди на [vercel.com](https://vercel.com) → New Project → Add
3. Перетащи папку `dist/` на страницу

### Вариант 3 — GitHub (автодеплой)
1. Залей проект на GitHub
2. vercel.com → Import Git Repository → выбери репо
3. Vercel сам определит Vite и задеплоит

## Структура
```
src/
├── App.jsx
├── main.jsx
├── index.css
├── contexts/
│   └── AppContext.jsx      # глобальное состояние + localStorage
├── data/
│   ├── lessons.js          # уроки, модули, контрольные
│   ├── videos.js           # видеоуроки
│   └── shop.js             # товары магазина
├── components/
│   ├── Layout.jsx
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── LessonModal.jsx     # модалка с тестом
└── pages/
    ├── AuthPage.jsx
    ├── HomePage.jsx
    ├── TrainingPage.jsx    # дорожка уроков + контрольные
    ├── LessonsPage.jsx     # видеоуроки
    ├── TasksPage.jsx       # задания + настройка интенсивности
    ├── ShopPage.jsx        # магазин с покупками
    └── ProfilePage.jsx     # профиль + уровни по языкам
```

## Что нового в v2
- ✅ Вся карточка урока кликабельна (не только иконка)
- ✅ Уровень отдельный для каждого языка
- ✅ Магазин с реальными покупками за монеты
- ✅ Настройка интенсивности (10/20/30/60 мин в день)
- ✅ Контрольные работы в конце каждого модуля
