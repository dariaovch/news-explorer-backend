const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-error');
// const CastError = require('../errors/cast-error');
const { errorMessages, successMessages } = require('../utils/constants');
const { jwtSecret } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

// Получить информацию о текущем пользователе
module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.NOT_FOUND_MESSAGE);
      }
      res.send(user);
    })
    .catch(next);
};

// Создать пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then(() => res.send({ message: successMessages.SIGNUP_SUCCESS }))
      .catch((err) => {
        if (err.code === 11000 || err.name === 'MongoError') {
          next(new ConflictError(errorMessages.CONFLICT_MESSAGE));
        }
        next(err);
      }));
};

// Контроллер для логина
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtSecret,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};
