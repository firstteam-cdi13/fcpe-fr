const Campagne = require('../model/campagne');
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
            const query = client.query('SELECT c.id,c.nom FROM campagne c');
            // Pour chaque ligne retournée 
            query.on('row', (result) => {
                var campagne = new Campagne();
                campagne.id = result.id;
                campagne.nom = result.nom;

                results.push(campagne);
            })
            // Lorsque la query est terminée on ferme la connexion et on renvoi les résultats     
            query.on('end', () => {
                pg.end();
                callback(results);
            });
        });
    }

    restituerListeCampagneFiltree(nom, statut, callback) {

        let results = [];
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback({ success: false, data: err });
            }

            let statutString = this.getStatutString(statut);
            // Pour pouvoir utiliser un littéral ${nom} la queryString est entre accents grave (altgr + 7)
            let queryString =
                `SELECT c.id,c.nom,p.niveau,c.date_conseil,c.conseil,c.date_debut,c.date_fin FROM campagne c 
            LEFT OUTER JOIN classe p ON p.id=c.id_classe
            WHERE c.nom LIKE '%${nom}%' AND c.validite=1 ` + statutString

            const query = client.query(queryString)

            query.on('row', (result) => {
                console.log("add record ... ");
                var campagne = new Campagne();
                campagne.id = result.id;
                campagne.nom = result.nom;
                campagne.nomClasse = result.niveau;
                campagne.nomConseil = result.conseil;
                campagne.dateConseil = result.date_conseil;
                campagne.dateDebut = result.date_debut;
                campagne.dateFin = result.date_fin;

                results.push(campagne);
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

    getStatutString(statut) {
        let now = new Date().toDateString();
        switch (statut) {
            case undefined:
                return ``
                break;
            case '0': // En préparation
                return `AND c.date_debut > '${now}'`
                break;
            case '1': // En cours
                return `AND c.date_debut <= '${now}' AND c.date_fin >= '${now}'`
                break;
            case '2': // Terminée
                return `AND c.date_fin < '${now}'`
                break;
            default:
                return ``
        }
    }

}

module.exports = CampagneData;