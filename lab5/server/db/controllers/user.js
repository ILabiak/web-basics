const User = require('../models').User;
const Session = require('../models').Session;
const UserInfo = require('../models').UserInfo;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Op } = require('sequelize');

const saltRounds = 10;

const hashPassword = (password) => {
  try {
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
  } catch (err) {
    return;
  }
};

module.exports = {
  list(req, res) {
    return UserInfo.findAll()
      .then((users) => res.status(200).send(users))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  add(req, res) {
    const passwordHash = hashPassword(req.body.password);
    if (passwordHash) {
      return User.create({
        email: req.body.email,
        password: passwordHash,
      })
        .then((user) => {
          if (!user) {
            return res.status(401).send({ message: 'Error while signing up' });
          }
          res.status(201).send({
            user: user.email || user.id,
            message: 'Signup successful',
          });
        })
        .catch((error) => {
          const errArr = [];
          error.errors.map((er) => {
            errArr.push(er.message);
          });
          res.status(400).send({ error: errArr.join(' ') });
        });
    } else {
      res.status(400).send(new Error('Could not hash password'));
    }
  },

  delete(req, res) {
    return User.findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() =>
            res.status(200).send({ message: 'User was successfully deleted!' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  login(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({ message: 'Invalid email or password' });
        }

        bcrypt.compare(password, user.passhash, (err, result) => {
          if (result === true) {
            // Passwords match, user is authenticated
            const sessionId = crypto.randomBytes(32).toString('hex');
            return Session.create({
              session_id: sessionId,
              user_id: user.id,
              expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
              .then((session) => {
                res.status(200).send({
                  message: 'Login successful',
                  session: session.session_id,
                  expires: session.expirationDate,
                });
              })
              .catch((error) => res.status(400).send(error));
          } else {
            // Passwords don't match, authentication failed
            return res
              .status(401)
              .send({ message: 'Invalid email or password' });
          }
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  getUserData(req, res) {
    const { session_id } = req.body;

    Session.findOne({
      where: {
        [Op.and]: [{ session_id }, { expirationDate: { [Op.gt]: new Date() } }],
      },
      include: UserInfo,
    }).then((data) => {
      if (!data) {
        return res
          .status(401)
          .send({ message: 'No user found with this session' });
      }
      // console.log(JSON.stringify(data, null, 2));
      res.status(200).send({
        user_id: data.user_id,
        user_data: data.UserInfo,
      });
    });
  },

  update(req, res) {
    const { session_id, user_data } = req.body;
    const userToChange = user_data?.user_id;

    Session.findOne({
      where: {
        [Op.and]: [{ session_id }, { expirationDate: { [Op.gt]: new Date() } }],
      },
      include: UserInfo,
    }).then((data) => {
      if (!data) {
        return res
          .status(401)
          .send({ message: 'No user found with this session' });
      }
      if (data.UserInfo.user_id !== userToChange && !data.UserInfo.admin) {
        // console.log({dataUser: data.UserInfo.user_id ,userToChange})
        return res
          .status(401)
          .send({ message: 'User does not have permission for that action' });
      }
      UserInfo.findOne({ where: { user_id: userToChange } }).then(
        (userInfo) => {
          if (!userInfo) {
            return res
              .status(401)
              .send({ message: 'Could not find user with that user_id' });
          }
          userInfo
            .update({
              pib: user_data.pib || userInfo.pib,
              variant: user_data.variant || userInfo.variant,
              phone_number: user_data.phone_number || userInfo.phone_number,
              faculty: user_data.faculty || userInfo.faculty,
              address: user_data.address || userInfo.address,
            })
            .then(() => res.status(200).send(userInfo))
            .catch((error) => res.status(400).send(error));
        }
      );
    });
  },
};
