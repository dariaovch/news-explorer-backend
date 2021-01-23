const jwt = require('jsonwebtoken');
const { errorMessages } = require('../utils/constants');
const { jwtSecret } = require('../utils/config');

const newLocal = process.env;
const { NODE_ENV, JWT_SECRET } = newLocal;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // На случай, если токена в заголовке нет
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send(errorMessages.UNAUTHORIZED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtSecret);
  } catch (err) {
    return res
      .status(401)
      .send(errorMessages.UNAUTHORIZED_MESSAGE);
  }

  req.user = payload;

  next();
};
