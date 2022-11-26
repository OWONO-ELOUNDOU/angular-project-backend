const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

const User = require('../models/user');

router.post(
    '/register',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.')
        .custom(async (email) => {
            const user = await User.find(email);
            if(user[0].length > 0) {
                return Promise.reject('Email address already exist')
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength('min: 7'),
        body('phone').trim().not().isEmpty(),
        body('rue').trim().not().isEmpty(),
        body('ville').trim().not().isEmpty(),
        body('pays').trim().not().isEmpty(),
    ], authController.register
);

module.exports = router;