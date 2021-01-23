const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');

// Ошибки валидации запросов
const { errors } = require('celebrate');

// Адрес базы данных
const { mongodbUrl } = require('./utils/config');

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000, DB_URL = mongodbUrl } = process.env;

const app = express();

// Логирование
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Лимит количества запросов с одного IP
const limiter = require('./middlewares/rate-limiter');

// Роуты, объединенные в файле index.js
const routes = require('./routes/index');

// Централизованный обработчик ошибок
const errorsHandler = require('./middlewares/error-handler');

// Объект опций содержит свойства для совместимости mongoose и MongoDB
mongoose.connect(DB_URL, {
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

app.listen(PORT);
