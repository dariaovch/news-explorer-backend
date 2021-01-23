const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

// Для роутов аутентификации
const { createUser, login } = require('../controllers/users');

// Роуты articles и users
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).pattern(new RegExp(/[^\s\\]/)),
  }),
}), createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
