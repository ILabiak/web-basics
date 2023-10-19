const User = require('../models').User;
const UserInfo = require('../models').UserInfo;
const bcrypt = require('bcrypt');

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
    return User.findAll()
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
          })
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
            res.status(200).send({ message: 'User was successfully deleted!' }),
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
            UserInfo.findOne({where: {user_id: user.id}}).then((userInfo) => {
              if (!userInfo) {
                return res.status(401).send({ message: 'Couldn\'t find information about user' });
              }
              res.status(200).send({
                message: 'Login successful',
                pib: userInfo.pib,
                variant: userInfo.variant,
                phone_number: userInfo.phone_number,
                faculty: userInfo.faculty,
                address: userInfo.address,
                admin: userInfo.admin,
              });
            })

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

};
