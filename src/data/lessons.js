export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

export const grammarModules = {
  english: [
    {
      id: 'em1', title: 'Module 1: Основы', level: 'A1', color: '#1d4ed8',
      lessons: [
        { id: 'el1', title: 'Глагол to be', icon: '📘', xp: 15, questions: [
          { type: 'choice', q: '"She ___ a student."', opts: ['am','is','are','be'], ans: 1 },
          { type: 'choice', q: 'Как сказать "Я устал"?', opts: ['I are tired','I am tired','I is tired','I be tired'], ans: 1 },
          { type: 'arrange', q: 'Составьте предложение:', words: ['are','You','amazing'], ans: 'You are amazing' },
        ]},
        { id: 'el2', title: 'Артикли a/an/the', icon: '📗', xp: 15, questions: [
          { type: 'choice', q: '"___ apple a day keeps the doctor away."', opts: ['A','An','The','-'], ans: 1 },
          { type: 'choice', q: '"I saw ___ movie. ___ movie was great!"', opts: ['a / The','the / A','an / The','a / A'], ans: 0 },
        ]},
        { id: 'el3', title: 'Present Simple', icon: '📙', xp: 20, questions: [
          { type: 'choice', q: '"She ___ coffee every morning."', opts: ['drink','drinks','drinking','drank'], ans: 1 },
          { type: 'choice', q: '"He ___ like pizza." (отрицание)', opts: ["don't","doesn't","isn't","aren't"], ans: 1 },
          { type: 'arrange', q: 'Составьте вопрос:', words: ['you','Do','English','speak','?'], ans: 'Do you speak English ?' },
        ]},
      ],
      exam: { id: 'ex-em1', title: 'Контрольная: Основы', icon: '🏁', xp: 40, isExam: true, questions: [
        { type: 'choice', q: '"They ___ my best friends."', opts: ['am','is','are','be'], ans: 2 },
        { type: 'choice', q: '"___ elephant is big."', opts: ['A','An','The','-'], ans: 1 },
        { type: 'choice', q: '"He ___ to school every day."', opts: ['go','goes','went','going'], ans: 1 },
        { type: 'arrange', q: 'Составьте предложение:', words: ['likes','She','tea','green'], ans: 'She likes green tea' },
        { type: 'choice', q: '"I ___ tired right now."', opts: ['is','am','are','be'], ans: 1 },
      ]},
    },
    {
      id: 'em2', title: 'Module 2: Прошедшее время', level: 'A2', color: '#7c3aed',
      lessons: [
        { id: 'el4', title: 'Past Simple', icon: '🔵', xp: 20, questions: [
          { type: 'choice', q: '"Yesterday I ___ to the store."', opts: ['go','goes','went','gone'], ans: 2 },
          { type: 'choice', q: '"She ___ the book last week."', opts: ['read','reads','readed','reading'], ans: 0 },
        ]},
        { id: 'el5', title: 'Future Simple', icon: '🟣', xp: 20, questions: [
          { type: 'choice', q: '"Tomorrow I ___ my friend."', opts: ['see','sees','will see','saw'], ans: 2 },
          { type: 'arrange', q: 'Составьте предложение:', words: ['will','It','tomorrow','rain'], ans: 'It will rain tomorrow' },
        ]},
        { id: 'el6', title: 'Модальные глаголы', icon: '🔷', xp: 25, questions: [
          { type: 'choice', q: '"You ___ wear a seatbelt. It\'s the law."', opts: ['can','must','might','could'], ans: 1 },
          { type: 'choice', q: '"___ I help you?"', opts: ['Must','Should','May','Will'], ans: 2 },
        ]},
      ],
      exam: { id: 'ex-em2', title: 'Контрольная: Прошедшее', icon: '🏁', xp: 50, isExam: true, questions: [
        { type: 'choice', q: '"She ___ happy yesterday."', opts: ['is','was','were','be'], ans: 1 },
        { type: 'choice', q: '"They ___ to Paris last year."', opts: ['go','goes','went','gone'], ans: 2 },
        { type: 'choice', q: '"I ___ call you later."', opts: ['am','was','will','were'], ans: 2 },
        { type: 'arrange', q: 'Составьте предложение:', words: ['must','You','now','leave'], ans: 'You must leave now' },
      ]},
    },
    {
      id: 'em3', title: 'Module 3: Средний уровень', level: 'B1', color: '#059669',
      lessons: [
        { id: 'el7', title: 'Present Perfect', icon: '🟢', xp: 25, questions: [
          { type: 'choice', q: '"I ___ never ___ sushi before."', opts: ['have / eat','have / eaten','has / eaten','had / eat'], ans: 1 },
        ]},
        { id: 'el8', title: 'Условные предложения', icon: '🔶', xp: 30, questions: [
          { type: 'choice', q: '"If I ___ rich, I would travel the world."', opts: ['am','was','were','will be'], ans: 2 },
        ]},
      ],
      exam: { id: 'ex-em3', title: 'Контрольная: Средний уровень', icon: '🏁', xp: 60, isExam: true, questions: [
        { type: 'choice', q: '"Have you ever ___ to Japan?"', opts: ['be','was','been','being'], ans: 2 },
        { type: 'choice', q: '"If it rains, I ___ stay home."', opts: ['will','would','am','was'], ans: 0 },
        { type: 'arrange', q: 'Составьте предложение:', words: ["I've",'never','seen','this','movie'], ans: "I've never seen this movie" },
      ]},
    },
  ],
  japanese: [
    {
      id: 'jm1', title: 'Module 1: Хирагана', level: 'A1', color: '#be185d',
      lessons: [
        { id: 'jl1', title: 'Хирагана азбука', icon: '🇯🇵', xp: 15, questions: [
          { type: 'choice', q: 'Как читается "あ"?', opts: ['ka','a','i','u'], ans: 1 },
          { type: 'choice', q: 'Как пишется "ki" на хирагане?', opts: ['か','き','く','け'], ans: 1 },
          { type: 'choice', q: '"Спасибо" по-японски:', opts: ['こんにちは','ありがとう','さようなら','おはよう'], ans: 1 },
        ]},
        { id: 'jl2', title: 'Базовые фразы', icon: '👋', xp: 15, questions: [
          { type: 'choice', q: '"Доброе утро" по-японски:', opts: ['こんにちは','さようなら','おはようございます','ありがとう'], ans: 2 },
        ]},
      ],
      exam: { id: 'ex-jm1', title: 'Контрольная: Хирагана', icon: '🏁', xp: 40, isExam: true, questions: [
        { type: 'choice', q: 'Как читается "き"?', opts: ['ka','ki','ku','ke'], ans: 1 },
        { type: 'choice', q: '"Пожалуйста" по-японски:', opts: ['ありがとう','すみません','どういたしまして','はい'], ans: 2 },
        { type: 'choice', q: 'Как читается "お"?', opts: ['a','i','u','o'], ans: 3 },
      ]},
    },
  ],
  korean: [
    {
      id: 'km1', title: 'Module 1: Хангыль', level: 'A1', color: '#d97706',
      lessons: [
        { id: 'kl1', title: 'Алфавит хангыль', icon: '🇰🇷', xp: 15, questions: [
          { type: 'choice', q: 'Как читается "가"?', opts: ['na','ga','da','ma'], ans: 1 },
          { type: 'choice', q: '"Привет" по-корейски:', opts: ['감사합니다','안녕하세요','미안합니다','괜찮아요'], ans: 1 },
        ]},
        { id: 'kl2', title: 'Числа 1-10', icon: '🔢', xp: 15, questions: [
          { type: 'choice', q: 'Как будет "три" по-корейски?', opts: ['일','이','삼','사'], ans: 2 },
        ]},
      ],
      exam: { id: 'ex-km1', title: 'Контрольная: Хангыль', icon: '🏁', xp: 40, isExam: true, questions: [
        { type: 'choice', q: 'Как читается "나"?', opts: ['ga','na','da','ra'], ans: 1 },
        { type: 'choice', q: '"Спасибо" по-корейски:', opts: ['안녕하세요','감사합니다','미안합니다','아니요'], ans: 1 },
      ]},
    },
  ],
}

export const dailyGoalOptions = [
  { id: 'light',  label: '🌿 Расслабленно', minutes: 10, desc: '10 мин в день' },
  { id: 'medium', label: '⚡ Регулярно',     minutes: 20, desc: '20 мин в день' },
  { id: 'hard',   label: '🔥 Интенсивно',   minutes: 30, desc: '30 мин в день' },
  { id: 'pro',    label: '💎 Профессионал', minutes: 60, desc: '1 час в день' },
]
