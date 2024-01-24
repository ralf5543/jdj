/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAllUsers);

router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyProfile);

module.exports = router;
