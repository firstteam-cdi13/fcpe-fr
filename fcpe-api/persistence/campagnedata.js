const Campagne = require('../model/campagne');
const Question = require('../model/question');
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
                callback(500,null,{"errmsg":err});
            }
            const query = client.query('SELECT c.id,c.nom FROM campagne c');
            // Pour chaque ligne retournée 
            query.on('row', (result) => {
                var campagne = new Campagne(result.id,result.nom,null,null,null,null,null,null);
                results.push(campagne);
            })
            // Lorsque la query est terminée on ferme la connexion et on renvoi les résultats     
            query.on('end', () => {
                pg.end();
                callback(200,results,null);
            });
        });
    }

    restituerListeCampagneFiltree(nom, statut, callback) {
        let results = [];
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback(500,null,{"errmsg":err});
            }

            let statutString = this.getStatutString(statut);

            // Pour pouvoir utiliser un littéral ${nom} la queryString est entre accents grave (altgr + 7)
            let queryString =
            `SELECT c.id,c.nom,p.niveau,p.indice,p.serie,c.date_conseil,c.date_debut,c.date_fin FROM campagne c 
            LEFT OUTER JOIN classe p ON p.id=c.id_classe
            WHERE c.nom LIKE '%${nom}%' AND c.validite=1 ` + statutString
                
            const query = client.query(queryString)

            query.on('row', (result) => {            
                let campagne = new Campagne(result.id,result.nom,result.niveau,result.indice,result.serie,result.date_conseil,result.date_debut,result.date_fin);
                results.push(campagne);
            })

            query.on('end', () => {
                pg.end();
                callback(200,results,null);
            });
        });
    }

    restituerCampagne(cid, callback) {
        let results = [];
        let questions = [];
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback(500,null,{"errmsg":err});
            }

            let queryString =
            `SELECT c.id,c.nom,p.niveau,p.indice,p.serie,c.date_conseil,c.date_debut,c.date_fin,q.intitule_principal,q.intitule_secondaire,
            q.type,q.est_actif,q.est_obligatoire,q.est_global,cq.ordre AS ordre_question,qp.ordre AS ordre_proposition,pr.libelle
            FROM campagne c 
            LEFT OUTER JOIN classe p ON p.id=c.id_classe
            LEFT OUTER JOIN campagnequestion cq on cq.id = c.id
            LEFT OUTER JOIN question q on q.id = cq.id_question
            LEFT OUTER JOIN questionproposition qp on qp.id = q.id
            LEFT OUTER JOIN proposition pr on pr.id = qp.id_proposition

            WHERE c.id=${cid}`
                
            const query = client.query(queryString)

            query.on('row', (result) => {                   
                let campagne = new Campagne(result.id,result.nom,result.niveau,result.indice,result.serie,result.date_conseil,result.date_debut,result.date_fin);                
                let question = new Question(result.ordre_question,result.intitule_principal,result.intitule_secondaire,result.type,
                result.est_actif,result.est_obligatoire,result.est_global,result.ordre_proposition,result.libelle)
                results = campagne;
                console.log(question)
                questions.push(question);
            })

            query.on('end', () => {
                results.questions = questions
                pg.end();
                callback(200,results,null);
            });
        });
    }

    supprimerCampagne(id, callback) {

        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback(500,null,{"errmsg":err});
            }
            const query = client.query(`UPDATE campagne SET validite=0 WHERE id=${id}`);
   
            query.on('end', () => {
                pg.end();
                callback(200,null,{"msg":"Suppression OK"});
            });
        });
    }

    getStatutString(statut){
        let now = new Date().toDateString();
        switch(statut){
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