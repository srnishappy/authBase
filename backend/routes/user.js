const express = require('express');
const router = express.Router();
const { update, remove, list } = require('../controllers/user');
const { auth } = require('../middleware/auth');
router.get('/user', auth, list);
router.patch('/user/:id', auth, update);
router.delete('/user/:id', auth, remove);
module.exports = router;
