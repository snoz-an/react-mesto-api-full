const router = require('express').Router();
const userRouts = require('./users');
const cardsRouts = require('./cards');

router.use('/users', userRouts);
router.use('/cards', cardsRouts);

module.exports = router;
