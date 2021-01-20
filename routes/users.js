const router = require('express').Router();

const { getCurrentUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUserInfo);
