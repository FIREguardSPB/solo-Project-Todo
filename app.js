//                    1. НАЧАЛО (ядро)
//Подключение экспресса - первым делом (устанавливается в систему через NPM)
const express = require("express");

//Для соблюдения REST API подключаем этот модуль, который отлавливает POST запросы
// (устанавливается в систему через NPM)
//и перезначает их на необходимый нам вид запроса (например, DELETE)
const methodOverride = require("method-override");

//запускаем следующим образом наше приложение, которое будет "ядром" всех процессов
const app = express();

//Указываем нашему "ядру", чтобы он запустил указанный метод с параметром _method
//этот метод будет постоянно "слушать" POST запросы от браузера и переназначать,
//если встретит в запросе указанный выше параметр, на тот вид запроса который указан в
// query парметрах в ссылке по которой будет инициирован запрос
app.use(methodOverride("_method"));
//выше указанный метод "отлавливает" только POST запросы,
//ссылки могут формировать только GET запрос и для того, чтобы можно было переназначать
//тип запроса - подключаем следующим образом еще один метод основанный на работе предыдущего
// данный метод пишется ручками.
app.use(methodOverrideGET("_method"));
//сам метод/функция
function methodOverrideGET(key) {
  key = key || "_method";
  return function methodOverrideGET(req, res, next) {
    if (req.originalMethod != req.method) {
      // already overridden => do not override again
      next();
      return;
    }

    req.originalMethod = req.method;
    if (req.query && key in req.query) {
      req.method = req.query[key].toUpperCase();
      delete req.query[key];
    }
    next();
  };
}
// Указываем из какой папки запустим наши middlware
const middleware = require("./middleware");

//запускаем middleware и они теперь будут постоянно взаимодействовать с ядром.
middleware(app);

//Присваиваем имена файлам с маршрутами. По этим переменным мы указываем
//в каком файле будут лежать инструкции/действия при обращении к определенному адресу
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
// const userRouter = require("./routes/users");
// const userRoute = require('./routes/user')
const todoRoute = require("./routes/todo");
// const uploadRouter = require('./routes/upload');
// подключение обработчика ошибок
// const useErrorHandlers = require("./middleware/error-handlers");

// Запускаем "слушать"/перехватывать указанные адреса и в случае перехвата
//выполнять действия описанные в файлах указанных выше
app.use("/", indexRouter);
app.use("/api/auth", authRouter);
// app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);
// // app.use("/user", userRouter);
// app.use('/upload', uploadRouter);
// useErrorHandlers(app);

//Указываем, что все выше указанные действия будут распространяться в тех
//файлах проекта в которых данный app будет импортирован путем require или import
module.exports = app;
