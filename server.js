const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');


const app = express();

const ports = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(ports, () => {
    console.log(`Listening on port ${ports}`);
});

/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);
*/



// database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'windows237',
    port: 3306
});

// check database connection
db.connect(err => {
    if (err) {
        console.log('dberr');
    } else {
        console.log('database connected...');
    }
});


// get all data
app.get('/prestation', (req, res) => {
    let qr = `SELECT * FROM prestation`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }

        if(result.length > 0){
            res.send({
                message: 'all-prestation-data',
                data:result
            })
        }
    })
});

// get single data
app.get('/prestation/:id', (req, res)=>{

    let gID = req.params.id;

    let qr = `SELECT * FROM prestation WHERE prestation_id = ${gID}`;

    db.query(qr, (err, result) => {
        if(err) {
            console.log(err);
        };

        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found',
            });
        }
    });

});

// create prestation data
app.post('/prestation', (req,res) => {
    let image = req.body.image;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;


    let qr = `INSERT INTO prestation(image, name, price, description)
                VALUES('${image}', '${name}', '${price}', '${description}')`;

    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});

//update prestation data
app.put('/prestation/:id', (req,res) => {
    console.log(req.body,'update data');

    let gID = req.params.id;

    let image = req.body.image;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;

    let qr = `UPDATE prestation set image = '${image}', name = '${name}', price = '${price}', description = '${description}' WHERE prestation_id = ${gID}`;

    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message:'data updated'
        });
    });
});

//delete single data
app.delete('/prestation/:id', (req, res) => {

    let qID = req.params.id;

    let qr = `DELETE FROM prestation where prestation_id = '${qID}'`;
    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'data deleted'
        });
    });

});




// create data
app.post('/user', (req,res) => {
    console.log(req.body,'create data');

    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = hash(req.body.password);
    let phone = req.body.phone;
    let rue = req.body.rue;
    let ville = req.body.ville;
    let pays = req.body.pays;

    let qr = `INSERT INTO user(name, surname, email, password, phone, rue, ville, pays)
                VALUES('${name}', '${surname}', '${email}', '${password}', '${phone}', '${rue}', '${ville}', '${pays}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result, password, 'result');
        console.log(password, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});

// get single data
app.get('/user/:id', (req, res)=>{

    let gID = req.params.id;

    let qr = `SELECT * FROM user WHERE user_id = ${gID}`;

    db.query(qr, (err, result) => {
        if(err) {
            console.log(err);
        };

        if(result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found',
            });
        }
    });

});

//update single data
app.put('/user/:id', (req,res) => {
    console.log(req.body,'update data');

    let gID = req.params.id;

    let name = req.body.name;
    let surname = req.body.surname;
    let email = req.body.email;
    let password = hash(req.body.password);
    let phone = req.body.phone;
    let rue = req.body.rue;
    let ville = req.body.ville;
    let pays = req.body.pays;

    let qr = `UPDATE user set name = '${name}', surname = '${surname}', email = '${email}', password = '${password}', phone = '${phone}', rue = '${rue}', ville = '${ville}', pays = '${pays}' WHERE user_id = ${gID}`;

    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message:'data updated'
        });
    });
});


//delete single data
app.delete('/user/:id', (req, res) => {

    let qID = req.params.id;

    let qr = `DELETE FROM user where user_id = '${qID}'`;
    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'data deleted'
        });
    });

});

// get all data
app.get('/link', (req, res) => {
    let qr = `SELECT * FROM link`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }

        if(result.length > 0){
            res.send({
                message: 'all-prestation-data',
                data:result
            })
        }
    })
});

//get link by type
app.get('/link/type', (req, res) => {

    let type = req.body.type;

    let qr = `SELECT * FROM link WHERE type = '${type}'`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }

        if(result.length > 0){
            res.send({
                message: 'all-prestation-data',
                data:result
            })
        } else {
            res.send({
                message: 'data not found',
            })
        }
    })
});

// create data
app.post('/link', (req,res) => {
    console.log(req.body,'create data');

    let name = req.body.name;
    let linkurl = req.body.linkUrl;
    let image = req.body.image;
    let type = req.body.type;

    let qr = `INSERT INTO link(society, address, image, type)
                VALUES('${name}', '${linkurl}', '${image}', '${type}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});

//update single data
app.put('/link/:id', (req,res) => {
    console.log(req.body,'update data');

    let gID = req.params.id;

    let name = req.body.name;
    let linkurl = req.body.linkUrl;
    let image = req.body.image;
    let type = req.body.type;

    let qr = `UPDATE link set name = '${name}', linkurl = '${linkurl}', image = '${image}', type = '${type}' WHERE link_id = ${gID}`;

    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message:'data updated'
        });
    });
});


//delete single data
app.delete('/link/:id', (req, res) => {

    let qID = req.params.id;

    let qr = `DELETE FROM link where link_id = '${qID}'`;
    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'data deleted'
        });
    });

});

// get all data
app.get('/document', (req, res) => {
    let qr = `SELECT * FROM document`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }

        if(result.length > 0){
            res.send({
                message: 'all-prestation-data',
                data:result
            })
        }
    })
});

// create data
app.post('/document', (req,res) => {
    console.log(req.body,'create data');

    let name = req.body.name;
    let image = req.body.image;
    let url = req.body.url;

    let qr = `INSERT INTO document(name, image, url)
                VALUES('${name}', '${image}', '${url}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});

//update single data
app.put('/document/:id', (req,res) => {
    console.log(req.body,'update data');

    let gID = req.params.id;

    let name = req.body.name;
    let image = req.body.image;
    let url = req.body.url;

    let qr = `UPDATE document set name = '${name}', image = '${image}', url = '${url}' WHERE document_id = ${gID}`;

    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message:'data updated'
        });
    });
});


//delete single data
app.delete('/document/:id', (req, res) => {

    let qID = req.params.id;

    let qr = `DELETE FROM document where document_id = '${qID}'`;
    db.query(qr, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({
            message: 'data deleted'
        });
    });

});

app.get('/service', (req,res) => {
    console.log(req.body,'create data');

    let qr = `SELECT * FROM service`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
            data: result
        });
    });
});

app.post('/service', (req,res) => {
    console.log(req.body,'create data');

    let name = req.body.name;
    let description = req.body.description;
    let date = req.body.date;
    let town = req.body.town;

    let qr = `INSERT INTO service(name, description, date, town)
                VALUES('${name}', '${description}', '${date}', '${town}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});

// get all procedure
app.get('/procedure', (req, res) => {
    let qr = `SELECT * FROM process`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }

        if(result.length > 0){
            res.send({
                message: 'all-process-data',
                data:result
            })
        }
    })
});

// create procedure
app.post('/procedure', (req, res) => {
    console.log(req.body,'create data');

    let name = req.body.name;
    let description = req.body.description;

    let qr = `INSERT INTO process(name, description)
                VALUES('${name}', '${description}')`;

    db.query(qr,(err, result)=>{
        if(err){
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
        });
    });
});

// encrypt de comparaoson functions
function decrypt(password, encryptedPassword) {
    decryptedPassword = bcrypt.compareSync(password, encryptedPassword);
}

function hash(string1) {
    encryptPassword = bcrypt.hashSync(string1, 12);
}

//login method
app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    qr = `SELECT * from user WHERE email = ${email}`;

    db.query(qr, (err, result) => {
        if(err) {
           new Notification("error")
        }
        if(result.length > 0) {
            data = result;

            if(data.email == email && decrypt(password, data.password) == true) {
                new Notification(data);
                window.location = "http://localhost:4200/activity";
            } else {
                new Notification("A user with this email could not be found");
            }
        }
    })
})