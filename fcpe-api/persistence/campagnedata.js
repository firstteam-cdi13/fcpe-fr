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
                let campagne = new Campagne(result.id,result.nom,null,null,null,null,null,null);
                campagne.id = result.id;
                campagne.nom = result.nom;
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
                var campagne = new Campagne();
                campagne.id = result.id;
                campagne.nom = result.nom;
                campagne.niveau = result.niveau;
                campagne.indice = result.indice;
                campagne.serie = result.serie;
                campagne.nomConseil = result.conseil;
                campagne.dateConseil = result.date_conseil;
                campagne.dateDebut = result.date_debut;
                campagne.dateFin = result.date_fin;
                results.push(campagne);
            })

            query.on('end', () => {
                pg.end();
                callback(200,results,null);
            });
        });
    }

    restituerCampagne(cid, callback) {
        let questions = [];
        let first = true;
        let campagne = {}
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                callback(500,null,{"errmsg":err});
            }

            let queryString =
            `SELECT c.id,q.id AS qid,c.nom,p.niveau,p.indice,p.serie,c.date_conseil,c.date_debut,c.date_fin,q.intitule_principal,q.intitule_secondaire,
            q.type,q.est_actif,q.est_obligatoire,q.est_global,cq.ordre AS ordre_question,qp.ordre AS ordre_proposition,pr.libelle, qp.id AS qpid, pr.id AS prid
            FROM campagne c
            LEFT OUTER JOIN classe p ON p.id=c.id_classe
            LEFT OUTER JOIN campagnequestion cq on cq.id = c.id 
            LEFT OUTER JOIN question q on q.id = cq.id_question
            LEFT OUTER JOIN questionproposition qp on qp.id = q.id 
            LEFT OUTER JOIN proposition pr on pr.id = qp.id_proposition
            WHERE c.id=${cid}`
                
            const query = client.query(queryString)
            let curQuestion = {}

            query.on('row', (result) => {
                if(first){
                    campagne = new Campagne(); 
                    campagne.id = result.id
                    campagne.nom = result.nom       
                    campagne.niveau = result.niveau
                    campagne.indice = result.indice
                    campagne.serie = result.serie
                    campagne.dateConseil = result.date_conseil
                    campagne.dateDebut = result.date_debut
                    campagne.dateFin = result.date_fin            
                    first = false
                }
                // Si on traite la premiere ligne de retour ou que l'id question change dans les propositions
                // on crée un nouvelle question
                if(first || curQuestion.id !== result.qpid){                                    
                    curQuestion = new Question()
                    curQuestion.id = result.qid
                    curQuestion.ordre = result.ordre_question
                    curQuestion.intitule_principal = result.intitule_principal
                    curQuestion.intitule_secondaire = result.intitule_secondaire
                    curQuestion.type = result.type
                    curQuestion.est_actif = result.est_actif
                    curQuestion.est_obligatoire = result.est_obligatoire
                    curQuestion.est_global = result.est_global  
                    curQuestion.propositions = []                  
                    questions.push(curQuestion)
                    console.log(curQuestion)
                }
                curQuestion.propositions.push({"ordre":result.ordre_proposition,"libelle":result.libelle})  
            })

            query.on('end', () => {
                campagne.questions = questions
                pg.end();
                callback(200,campagne,null);
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