const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFound, Conflict, Unauthorized, BadRequest,
} = require('../errors');

const { JWT_SECRET, NODE_ENV } = process.env;

/* const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(() => {
      res.status(400).send({ message: 'переданы некорректные данные' });
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
}; */

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  // check if user already exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Пользователь с таким e-mail существует');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          }))
          .then((user) => res.send(user)); //eslint-disable-line
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  // check if user already exists
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильный email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new Unauthorized('Неправильный email или пароль');
        });
    })
    .then(({ _id }) => {
      const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next); // добавили catch
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next); // добавили catch
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user.name === null || user.about === null) {
        throw new BadRequest('Незаполнено одно из полей');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new BadRequest('Проверьте ссылку');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
