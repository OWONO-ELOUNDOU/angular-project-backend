const db = require('../util/database');

module.exports = class User {
    constructor(name, surname, email, password, phone, rue, ville, pays) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.rue = rue;
        this.ville = ville;
        this.pays = pays;
    }

    static find(email) {
        return db.execute(
            `SELECT * FROM user WHERE email = ?`, [email]
        );
    }

    static save(user) {
        let qr = `INSERT INTO user (name, surname, email, password, phone, rue, ville, pays)
                VALUES (${user.name}, ${user.surname}, ${user.email}, ${user.password}, ${user.phone}, ${user.rue}, ${user.ville}, ${user.pays})`;
        return db.query(qr, (err, result) => {
                if(err){
                console.log(err);
                }
                console.log(result, 'result');
                res.send({
                    message: 'data inserted',
                });
            }
            //[user.name, user.surname, user.email, user.password, user.phone, user.rue, user.ville, user.pays]
        );
    }
};
