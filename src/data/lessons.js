export const grammarModules = {
  english: [
    {
      id: 'en-m1', title: 'Module 1: Основы', level: 'A1',
      color: 'from-blue-600 to-cyan-500',
      lessons: [
        {
          id: 'en-l1', title: 'Глагол to be', icon: '📘', xp: 15,
          questions: [
            { type: 'choice', question: 'Выберите правильную форму: "She ___ a student."', options: ['am','is','are','be'], answer: 1 },
            { type: 'choice', question: 'Как сказать "Я устал"?', options: ['I are tired','I am tired','I is tired','I be tired'], answer: 1 },
            { type: 'arrange', question: 'Составьте предложение:', words: ['are','You','amazing'], answer: 'You are amazing' },
          ],
        },
        {
          id: 'en-l2', title: 'Артикли a / an / the', icon: '📗', xp: 15,
          questions: [
            { type: 'choice', question: '"___ apple a day keeps the doctor away."', options: ['A','An','The','-'], answer: 1 },
            { type: 'choice', question: '"I saw ___ movie. ___ movie was great!"', options: ['a / The','the / A','an / The','a / A'], answer: 0 },
          ],
        },
        {
          id: 'en-l3', title: 'Present Simple', icon: '📙', xp: 20,
          questions: [
            { type: 'choice', question: '"She ___ coffee every morning."', options: ['drink','drinks','drinking','drank'], answer: 1 },
            { type: 'choice', question: 'Отрицание: "He ___ like pizza."', options: ["don't","doesn't","isn't","aren't"], answer: 1 },
            { type: 'arrange', question: 'Составьте вопрос:', words: ['you','Do','English','speak','?'], answer: 'Do you speak English ?' },
          ],
        },
      ],
    },
    {
      id: 'en-m2', title: 'Module 2: Прошедшее время', level: 'A2',
      color: 'from-violet-600 to-purple-500',
      lessons: [
        {
          id: 'en-l4', title: 'Past Simple', icon: '🔵', xp: 20,
          questions: [
            { type: 'choice', question: '"Yesterday I ___ to the store."', options: ['go','goes','went','gone'], answer: 2 },
            { type: 'choice', question: '"She ___ the book last week."', options: ['read','reads','readed','reading'], answer: 0 },
          ],
        },
        {
          id: 'en-l5', title: 'Future Simple', icon: '🟣', xp: 20,
          questions: [
            { type: 'choice', question: '"Tomorrow I ___ my friend."', options: ['see','sees','will see','saw'], answer: 2 },
            { type: 'arrange', question: 'Составьте предложение:', words: ['will','It','tomorrow','rain'], answer: 'It will rain tomorrow' },
          ],
        },
        {
          id: 'en-l6', title: 'Модальные глаголы', icon: '🔷', xp: 25,
          questions: [
            { type: 'choice', question: '"You ___ wear a seatbelt. It\'s the law."', options: ['can','must','might','could'], answer: 1 },
            { type: 'choice', question: '"___ I help you?"', options: ['Must','Should','May','Will'], answer: 2 },
          ],
        },
      ],
    },
    {
      id: 'en-m3', title: 'Module 3: Средний уровень', level: 'B1',
      color: 'from-emerald-600 to-teal-500',
      lessons: [
        {
          id: 'en-l7', title: 'Present Perfect', icon: '🟢', xp: 25,
          questions: [
            { type: 'choice', question: '"I ___ never ___ sushi before."', options: ['have / eat','have / eaten','has / eaten','had / eat'], answer: 1 },
          ],
        },
        {
          id: 'en-l8', title: 'Условные предложения', icon: '🔶', xp: 30,
          questions: [
            { type: 'choice', question: '"If I ___ rich, I would travel the world."', options: ['am','was','were','will be'], answer: 2 },
          ],
        },
      ],
    },
  ],
  japanese: [
    {
      id: 'jp-m1', title: 'Module 1: Хирагана', level: 'A1',
      color: 'from-rose-600 to-pink-500',
      lessons: [
        {
          id: 'jp-l1', title: 'Введение в хирагану', icon: '🇯🇵', xp: 15,
          questions: [
            { type: 'choice', question: 'Как читается "あ"?', options: ['ka','a','i','u'], answer: 1 },
            { type: 'choice', question: 'Как пишется "ki" на хирагане?', options: ['か','き','く','け'], answer: 1 },
          ],
        },
        {
          id: 'jp-l2', title: 'Базовые фразы', icon: '👋', xp: 15,
          questions: [
            { type: 'choice', question: 'Как сказать "Спасибо" по-японски?', options: ['こんにちは','ありがとう','さようなら','おはよう'], answer: 1 },
          ],
        },
      ],
    },
    {
      id: 'jp-m2', title: 'Module 2: Катакана', level: 'A2',
      color: 'from-orange-600 to-red-500',
      lessons: [
        {
          id: 'jp-l3', title: 'Основы катаканы', icon: '🔤', xp: 20,
          questions: [
            { type: 'choice', question: 'Как читается "ア"?', options: ['i','u','a','e'], answer: 2 },
          ],
        },
      ],
    },
  ],
  korean: [
    {
      id: 'kr-m1', title: 'Module 1: Хангыль', level: 'A1',
      color: 'from-amber-600 to-orange-500',
      lessons: [
        {
          id: 'kr-l1', title: 'Алфавит хангыль', icon: '🇰🇷', xp: 15,
          questions: [
            { type: 'choice', question: 'Как читается "가"?', options: ['na','ga','da','ma'], answer: 1 },
            { type: 'choice', question: 'Как сказать "Привет" по-корейски?', options: ['감사합니다','안녕하세요','미안합니다','괜찮아요'], answer: 1 },
          ],
        },
        {
          id: 'kr-l2', title: 'Числа 1-10', icon: '🔢', xp: 15,
          questions: [
            { type: 'choice', question: 'Как будет "три" по-корейски?', options: ['일','이','삼','사'], answer: 2 },
          ],
        },
      ],
    },
  ],
}

export const dailyTasks = [
  { id: 't1', title: 'Заработай 50 XP', icon: '⚡', current: 23, target: 50, xp: 10, color: '#58a6ff' },
  { id: 't2', title: 'Пройди 3 урока', icon: '📚', current: 1, target: 3, xp: 15, color: '#3fb950' },
  { id: 't3', title: 'Серия ответов x10', icon: '🔥', current: 6, target: 10, xp: 20, color: '#f78166' },
  { id: 't4', title: 'Посмотри видеоурок', icon: '🎬', current: 0, target: 1, xp: 8, color: '#bc8cff' },
]
