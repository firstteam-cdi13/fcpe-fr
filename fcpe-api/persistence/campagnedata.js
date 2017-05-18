//const Campagne = require('../model/campagne');
const env = require('../conf/env');
const pg = require('pg');
const connectionString = env.DATABASE_URL;

class CampagneData {

    constructor() {
        this.campagnes = [];
    }

    restituerListeNomCampagne(callback) {
        let results = [];
        // Connexion à la bd
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback({ success: false, data: err });
            }
            const query = client.query('SELECT c.nom FROM campagne c');
            // Pour chaque ligne retournée 
            query.on('row', (result) => {
                results.push(result);
            })
            // Lorsque la query est terminée on ferme la connexion et on renvoi les résultats     
            query.on('end', () => {
                pg.end();
                callback(results);
            });
        });
    }

    restituerListeCampagneFiltree(nom, statutString, callback) {

        let results = [];
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback({ success: false, data: err });
            }

            // Pour pouvoir utiliser un littéral ${nom} la queryString est entre accents grave (altgr + 7)
            let queryString =
            `SELECT c.nom,p.niveau,c.date_conseil,c.validite FROM campagne c 
            LEFT OUTER JOIN classe p ON p.id=c.id_classe
            WHERE c.nom LIKE '%${nom}%' AND c.validite=1 ` + statutString
                
            const query = client.query(queryString)

            query.on('row', (result) => {
                results.push(result);
            })

            query.on('end', () => {
                pg.end();
                callback(results);
            });
        });
    }

    supprimerCampagne(id, callback) {

        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback({ success: false, data: err });
            }
            const query = client.query(`UPDATE campagne SET validite=0 WHERE id=${id}`);
   
            query.on('end', () => {
                pg.end();
                callback("Suppression OK");
            });
        });
    }
}

module.exports = CampagneData;