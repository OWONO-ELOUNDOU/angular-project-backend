const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const rue = req.body.rue;
    const ville = req.body.ville;
    const pays = req.body.pays;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword,
            phone: phone,
            rue: rue,
            ville: ville,
            pays: pays
        }

        const result = await User.save(userDetails);

        res.status(201).json({ message: 'User Registered!' })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}