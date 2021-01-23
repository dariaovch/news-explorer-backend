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
const { errorMessages } = require('../utils/constants');

const urlValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new CastError(errorMessages.CAST_ERR_MESSAGE);
  }
  return value;
};

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(urlValidator),
    image: Joi.string().required().custom(urlValidator),
  }),
}), createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteArticle);

module.exports = router;
