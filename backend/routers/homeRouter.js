
const express = require('express');
const router = express.Router();
let hero = { title: 'WELCOME', subtitle: 'XStore Clone', imgUrl: '/hero.jpg' };

router.get('/hero', (req, res) => res.json(hero));
router.put('/hero', (req, res) => {
  hero = req.body;
  res.json(hero);
});

module.exports = router;
