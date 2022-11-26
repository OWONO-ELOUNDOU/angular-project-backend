const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hash = (string1) => {
    const encryptedPassword = bcrypt.hashSync(string1, 12);
}