const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    // save the user to the database
    Users.add(credentials)
      .then(user => {
        const token = makeJwt(user);
        res.status(201).json({ data: user, token });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
