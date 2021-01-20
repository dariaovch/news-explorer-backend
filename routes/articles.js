const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const auth = require('../middlewares/auth');
const validator = require('validator');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const CastError = require('../errors/cast-error');

const urlValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError('Переданы некорректные данные');
  }
  return value;
};

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
}), createArticle);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteArticle);
