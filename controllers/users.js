const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

// Получить информацию о текущем пользователе
module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};
