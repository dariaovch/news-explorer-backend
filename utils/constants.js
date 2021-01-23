const errorMessages = {
  NOT_FOUND_MESSAGE: 'Запрашиваемый ресурс не найден',
  CAST_ERR_MESSAGE: 'Невалидный ID',
  BAD_REQUEST_MESSAGE: 'Неверный запрос',
  FORBIDDEN_MESSAGE: 'Нельзя удалять чужие ресурсы',
  CONFLICT_MESSAGE: 'Такой email уже зарегистрирован',
  UNAUTHORIZED_MESSAGE: 'Необходима авторизация',
  INVALID_MESSAGE: 'Неверный email или пароль',
  SERVER_ERR_MESSAGE: 'На сервере произошла ошибка',
};

const successMessages = {
  SIGNUP_SUCCESS: 'Вы успешно зарегистрировались',
  DELETE_SUCCESS: 'Статья удалена',
};

module.exports = {
  errorMessages,
  successMessages,
};
