//                  3.Сборка необходимого интсрументария
//собираем одним модулем для нашего ядра дополнительно необходимые модули и действия,
// в конкретном разрабатываемом приложении. Все они устанавливаются через NPM.
//В зависимости от задач - список может быть абсолютно разным!
module.exports = function (app) {
  //сначала мы подкючаем то, что нам необходимо, а далее будем запускать
  //конкретные методы из подключенных пакетов.
  //!!!!Если методы какого либо пакета не сипользуются, то пакет естесственно
  //не подключаем.
  //так как будут использованы методы express, то здесь тоже подключаем его
  const express = require("express");
  //Не обязательный пакет, для логирования. Представлен для примера.
  const morgan = require("morgan");

  const flash = require('connect-flash');
app.use(flash())
  // модуль для работы с куками (удаление, установка и чтение кук)
  //так как наше приложение будет завязано на взаимодействии с cookie, то данный
  //пакет просто необходим
  const cookieParser = require("cookie-parser");

  // модуль для работы с сессиями - аналогично, как с куками, также необходим
  const session = require("express-session");

  //модуль опциональный, без него работать программа будет, но могут возникнуть
  //проблемы при запуске на разных операционных системах ввиду разного построения 
  //путей в файловых системах, например в WINDOWS пути к папкам разделяются слэшем
  //с наклоном влево \ , а в unix системах вправо /
  //данный модуль позволяет унифицировать пути для прорграммы.
  const path = require("path");

  // модуль для хранения сессий в виде файлов на сервере (см. папку sessions)
  const FileStore = require("session-file-store")(session);

  // самописная функция очистки кук, тело которой находится в указанном файле 'auth'
  // Так как в этом файле идет только подключение модулей и запуск методов/функций, то само 
  //тело функции вынесено в отдельный файл.
  const { cookiesCleaner } = require("./auth");
  //так же чтобы не писать здесь код - тело подключения с параметрами к базе данных
  //выведено в отдельный файл
  const dbConnection = require("./db-connect");
  //
  // app.use(morgan("dev"));
//=============================---------------------------------->>>>>>>>>>>>>>>>
  // В этом блоке мы начинаем запускать необходимые методы из подключенных выше
  //модулей
  // парсер POST запросов. 
  //Вам НЕ НУЖНЫ эти методы для запросов GET или DELETE, но мы будем использовать 
  //POST и PUT запросы для работы с которыми эти методы необходимы
  //Запускаем возможность распознавания запросов сервером в строковом формате 
  //req.query - то что передается в адресной строке после ?
  app.use(express.urlencoded({ extended: true }));
  //req.body - в виде объекта json - то что отсылает форма
  app.use(express.json());

  // Запускаем cookieParser, из модуля который мы подключили выше.
  // Этим методом мы даем ядру доступ к кукам которые хранятся в браузере
  app.use(cookieParser());

  // Запускаем метод session с нужными нам настройками
  app.use(
    session({
      store: new FileStore(), // тип хранилища - FileStore, который создаёт нам папку с файлами
      key: "user_sid", // ключ - название куки
      secret: "Абракадабра", // слово используемое для шифрования, может быть любым
      resave: false, // настройка пересохранения куки, при каждом запросе
      saveUninitialized: false, // настройка создания сессии, даже без авторизации
      cookie: {
        expires: 1000 * 60 * 15, // время "протухания" куки (15 минут)
      },
    })
  );

  // Запускаем метод для возможности очистки cookie
  app.use(cookiesCleaner);

  // Включаем папку "по умолчанию" для файлов, которые будут доступны браузеру.
  //скрипты, css, картинки и все прочее, что может использоваться на фронте. 
  app.use(express.static(path.join(__dirname, "..", "public")));

  //Указывваем папку с указанием пути, где будут лежать шаблоны hbs
  app.set("views", path.join(__dirname, "..", "views"));
  //handlebars (hbs) встроен в express, поэтому мы отдельно его не подключали,
  //но нужно обозначить, что мы будем его использовать.
  app.set("view engine", "hbs");
};

//следующий этап - контроллеры (controllers)
