const express = require('express');
const router = express.Router();
const env = require('../conf/env');
const User = require('../model/user');
const pg = require('pg');
const connectionString = env.DATABASE_URL;
let success = false

router.post('/', function(req, res) {
    let email = req.query['email']
	let password = req.query['password']
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            done();
            res.status(500)
            res.send({"errmsg": err })
        }
        const query = client.query(`SELECT u.email,u.mot_de_passe FROM utilisateur u WHERE u.email='${email}' AND u.mot_de_passe='${password}'`);
        console.log(query)
        // Pour chaque ligne retournée 
        query.on('row', (result) => {
            success = true
        });
        // Lorsque la query est terminée on ferme la connexion et on renvoi les résultats     
        query.on('end', () => {
            pg.end();
            if (success){
                res.status(200);
                res.json({"msg":"Authentification Success"})
            }else{
                res.status(403);
                res.json({"msg":"Authentification Failed"})
            }
        });
    });
});

module.exports = router;