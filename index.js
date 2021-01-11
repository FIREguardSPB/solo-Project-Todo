// Протестировать лично как работает приложение (авторизация)
// Посмотреть в браузере как устанавливается кука (в Application)
// Посмотреть структуру проекта
// Обговорить роуты

// Нужные библиотеки и настройки:

// 1.
// express-session - работа с сессиями
// подключаем через import или reqire
// создаём middleware app.use(session({config})

// 2.
// cookie-parser - работа с куками 
// создаём middleware app.use(cookieParser())

// 3.
// настроить хранилище сессий через модуль session-file-store

// 4.
// настраиваем роуты (login, logout, registration)
// login -> создание сессии (req.session.*any_word*)
// logout -> удаление сессии (req.session.destroy()) + чистим куку

// 5.
// чтение куки - req.session.*any_word*