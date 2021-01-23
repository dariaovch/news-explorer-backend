const Article = require('../models/article');
const CastError = require('../errors/cast-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');
const { errorMessages, successMessages } = require('../utils/constants');

// Получить массив всех статей
module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((data) => res.send(data))
    .catch(next);
};

// Создать карточку
module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const { _id } = req.user;

  return Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: _id,
  })
    .then((article) => res.send(article))
    .catch(next);
};

// Удалить карточку
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errorMessages.NOT_FOUND_MESSAGE);
      }

      if (req.user._id === article.owner.toString()) {
        Article.findByIdAndRemove(article.id)
          .then((deletedArticle) => {
            if (!deletedArticle) {
              throw new NotFoundError(errorMessages.NOT_FOUND_MESSAGE);
            }
            res.status(200).send({ message: successMessages.DELETE_SUCCESS });
          });
      } else {
        throw new ForbiddenError(errorMessages.FORBIDDEN_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new CastError(errorMessages.CAST_ERR_MESSAGE);
      }
      next(err);
    });
};
