//const Campagne = require('../model/campagne');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/fcpe-fr';

/**
 * This is Data Access Layer for contacts
 */
class ModuleData {

    /**
     * Default constructor
     */
    constructor (){
        console.log("ModuleData");

        this.campagnes = [];
    }

    /**
     * Gets campagnes list
     * @return {Array}
     */
    find(callback) {
        let results = [];
        pg.connect(connectionString,(err,client,done)=>{
            if(err) {
                done();
                callback ({success: false, data: err});
            }
            const query = client.query('SELECT * FROM classe');
            query.on('row',(result) => {
                results.push(result);
            })        
            query.on('end', () => { 
                pg.end();
                callback(results);
            });
        });
    }
}

module.exports = ModuleData;