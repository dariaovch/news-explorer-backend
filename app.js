const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000 } = process.env;

const app = express();

// Ошибки валидации запросов
const { errors } = require('celebrate');

// Адрес базы данных
const { mongodbUrl } = require('./utils/config');

// Логирование
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Лимит количества запросов с одного IP
const limiter = require('./middlewares/rate-limiter');

// Роуты, объединенные в файле index.js
const routes = require('./routes/index');

// Централизованный обработчик ошибок
const errorsHandler = require('./middlewares/error-handler');

// Объект опций содержит свойства для совместимости mongoose и MongoDB
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(bodyParser.json());

app.use(limiter);

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`The app is listening to port ${PORT}`);
});
