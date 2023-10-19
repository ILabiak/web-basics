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

console.log(hashPassword('qwerty123123'))


// somemail@gmail.com password123 $2b$10$WgTmn9X5LhY3iFucGGyQy.jEAIlrnnbi17iN45j5CAfVs989Qb7Ju
// gmail@gmail.com qwerty123123 $2b$10$Z2RmViwtqBR8A47ltX9GPONk9xVXd9.WNp13/uKUsJWI8FpBocGmG