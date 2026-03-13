// Комплексные экзамены на переход уровня
// Каждый экзамен: grammar + vocabulary + reading секции

export const levelExams = {
  english: [
    {
      id: 'exam-a1-a2',
      title: 'A1 → A2',
      subtitle: 'Экзамен на переход уровня',
      level: 'A1',
      targetLevel: 'A2',
      passPercent: 75,
      totalXP: 120,
      estimatedMin: 15,
      sections: [
        {
          id: 'grammar',
          title: 'Грамматика',
          icon: '📐',
          color: '#3b82f6',
          questions: [
            { type: 'choice', q: '"She ___ to school every day."', opts: ['go','goes','going','gone'], ans: 1 },
            { type: 'choice', q: '"___ you speak English?"', opts: ['Are','Do','Is','Have'], ans: 1 },
            { type: 'choice', q: '"There ___ 5 cats in the garden."', opts: ['is','am','are','be'], ans: 2 },
            { type: 'arrange', q: 'Составь предложение:', words: ['like','I','pizza','very','much'], ans: 'I like pizza very much' },
          ],
        },
        {
          id: 'vocabulary',
          title: 'Словарный запас',
          icon: '📝',
          color: '#8b5cf6',
          questions: [
            { type: 'choice', q: 'Что значит "beautiful"?', opts: ['Красивый','Быстрый','Сильный','Добрый'], ans: 0 },
            { type: 'choice', q: 'Как сказать "работа" по-английски?', opts: ['Home','Work','Book','Time'], ans: 1 },
            { type: 'choice', q: '"I am ___ — я устал"', opts: ['happy','angry','tired','hungry'], ans: 2 },
            { type: 'choice', q: 'Что значит "weather"?', opts: ['Погода','Вода','Время','Ветер'], ans: 0 },
          ],
        },
        {
          id: 'reading',
          title: 'Понимание текста',
          icon: '📖',
          color: '#059669',
          questions: [
            { type: 'choice', q: '"Tom wakes up at 7 AM. He eats breakfast and goes to work."\nСколько утренних действий у Тома?', opts: ['1','2','3','4'], ans: 2 },
            { type: 'choice', q: '"The weather is cold today. Maria wears a warm jacket."\nПочему Мария надела куртку?', opts: ['Жарко','Холодно','Дождь','Ветер'], ans: 1 },
            { type: 'arrange', q: 'Переведи порядок действий:', words: ['работу','Он','идёт','завтракает','и'], ans: 'Он завтракает и идёт работу' },
          ],
        },
      ],
    },
    {
      id: 'exam-a2-b1',
      title: 'A2 → B1',
      subtitle: 'Экзамен на переход уровня',
      level: 'A2',
      targetLevel: 'B1',
      passPercent: 75,
      totalXP: 180,
      estimatedMin: 20,
      sections: [
        {
          id: 'grammar',
          title: 'Грамматика',
          icon: '📐',
          color: '#3b82f6',
          questions: [
            { type: 'choice', q: '"I ___ in London for 3 years." (всё ещё там)', opts: ['lived','have lived','was living','live'], ans: 1 },
            { type: 'choice', q: '"If I ___ rich, I would travel."', opts: ['am','was','were','will be'], ans: 2 },
            { type: 'arrange', q: 'Составь предложение:', words: ['never','have','I','sushi','eaten'], ans: 'I have never eaten sushi' },
          ],
        },
        {
          id: 'vocabulary',
          title: 'Словарный запас',
          icon: '📝',
          color: '#8b5cf6',
          questions: [
            { type: 'choice', q: 'Что значит "ambitious"?', opts: ['Ленивый','Честолюбивый','Добрый','Грустный'], ans: 1 },
            { type: 'choice', q: '"Despite" означает:', opts: ['Потому что','Хотя / несмотря на','Если','Когда'], ans: 1 },
            { type: 'choice', q: 'Антоним "succeed":',  opts: ['achieve','win','fail','improve'], ans: 2 },
          ],
        },
        {
          id: 'reading',
          title: 'Понимание текста',
          icon: '📖',
          color: '#059669',
          questions: [
            { type: 'choice', q: '"Despite heavy rain, the match continued. Players were exhausted but determined."\nПочему матч продолжился?', opts: ['Дождь закончился','Несмотря на дождь','Игроки устали','Судья решил'], ans: 1 },
            { type: 'choice', q: '"She has been studying Japanese for two years and can now hold basic conversations."\nКакой уровень у неё?', opts: ['Ноль','A1','A2–B1','C1'], ans: 2 },
          ],
        },
      ],
    },
    {
      id: 'exam-b1-b2',
      title: 'B1 → B2',
      subtitle: 'Экзамен на переход уровня',
      level: 'B1',
      targetLevel: 'B2',
      passPercent: 80,
      totalXP: 250,
      estimatedMin: 25,
      sections: [
        {
          id: 'grammar',
          title: 'Грамматика',
          icon: '📐',
          color: '#3b82f6',
          questions: [
            { type: 'choice', q: '"The report ___ by Friday." (пассивный залог)', opts: ['must complete','must be completed','must completing','must have complete'], ans: 1 },
            { type: 'choice', q: '"___ he studied harder, he would have passed."', opts: ['If','Had','Should','Were'], ans: 1 },
          ],
        },
        {
          id: 'vocabulary',
          title: 'Словарный запас',
          icon: '📝',
          color: '#8b5cf6',
          questions: [
            { type: 'choice', q: '"Ubiquitous" значит:', opts: ['Редкий','Везде присутствующий','Опасный','Сложный'], ans: 1 },
            { type: 'choice', q: '"To procrastinate" означает:', opts: ['Планировать','Откладывать на потом','Торопиться','Работать усердно'], ans: 1 },
          ],
        },
        {
          id: 'reading',
          title: 'Понимание текста',
          icon: '📖',
          color: '#059669',
          questions: [
            { type: 'choice', q: '"The algorithm, while efficient, has been criticised for its lack of transparency."\nЧто критикуют?', opts: ['Скорость','Точность','Прозрачность','Стоимость'], ans: 2 },
          ],
        },
      ],
    },
  ],
  japanese: [
    {
      id: 'exam-ja-a1-a2',
      title: 'A1 → A2',
      subtitle: 'レベルアップ試験',
      level: 'A1',
      targetLevel: 'A2',
      passPercent: 70,
      totalXP: 100,
      estimatedMin: 12,
      sections: [
        {
          id: 'grammar',
          title: 'Грамматика',
          icon: '📐',
          color: '#be185d',
          questions: [
            { type: 'choice', q: '"わたし ___ がくせいです" (я — студент)', opts: ['は','が','を','に'], ans: 0 },
            { type: 'choice', q: '"ありがとう" значит:', opts: ['Привет','Пока','Спасибо','Извини'], ans: 2 },
          ],
        },
        {
          id: 'vocabulary',
          title: 'Словарный запас',
          icon: '📝',
          color: '#7c3aed',
          questions: [
            { type: 'choice', q: 'Как будет "вода" по-японски?', opts: ['やま (yama)','みず (mizu)','そら (sora)','き (ki)'], ans: 1 },
            { type: 'choice', q: '"ねこ" (neko) — это:', opts: ['Собака','Кошка','Птица','Рыба'], ans: 1 },
          ],
        },
        {
          id: 'reading',
          title: 'Хирагана',
          icon: '📖',
          color: '#059669',
          questions: [
            { type: 'choice', q: 'Как читается "きのう"?', opts: ['kyou','kinou','kino','ashita'], ans: 1 },
          ],
        },
      ],
    },
  ],
  korean: [
    {
      id: 'exam-ko-a1-a2',
      title: 'A1 → A2',
      subtitle: '레벨업 시험',
      level: 'A1',
      targetLevel: 'A2',
      passPercent: 70,
      totalXP: 100,
      estimatedMin: 12,
      sections: [
        {
          id: 'grammar',
          title: 'Грамматика',
          icon: '📐',
          color: '#d97706',
          questions: [
            { type: 'choice', q: '"저는 학생___" (Я — студент)', opts: ['이에요','은','를','가'], ans: 0 },
            { type: 'choice', q: '"감사합니다" значит:', opts: ['Привет','Пока','Спасибо','Извини'], ans: 2 },
          ],
        },
        {
          id: 'vocabulary',
          title: 'Словарный запас',
          icon: '📝',
          color: '#7c3aed',
          questions: [
            { type: 'choice', q: '"물 (mul)" — это:', opts: ['Еда','Вода','Дом','Книга'], ans: 1 },
            { type: 'choice', q: 'Как сказать "хорошо" по-корейски?', opts: ['나쁘다','좋다','크다','작다'], ans: 1 },
          ],
        },
        {
          id: 'reading',
          title: 'Хангыль',
          icon: '📖',
          color: '#059669',
          questions: [
            { type: 'choice', q: 'Как читается "학교"?', opts: ['haksaeng','hakgyo','hanguk','hangul'], ans: 1 },
          ],
        },
      ],
    },
  ],
}
