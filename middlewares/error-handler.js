const { errorMessages } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.SERVER_ERR_MESSAGE
        : message,
    });
};
