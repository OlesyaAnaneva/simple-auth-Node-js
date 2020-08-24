const express = require('express');

const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/index', (req, res) => {
  if (req.session.user) {
    res.render('index', { isAuth: true });
  } else {
    res.render('homepage', { error: true });
  }
});

module.exports = router;
