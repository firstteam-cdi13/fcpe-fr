const Campagne = require('../model/campagne');

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

        for(let i=0; i< 3;i++){
            let campagne = new Campagne(i,'Dark ' + i);
            this.campagnes.push(campagne);
        }

    }

    /**
     * Gets campagnes list
     * @return {Array}
     */
    find() {
        console.log("ModuleData find :",this.campagnes);
        return this.campagnes;
    }

}

module.exports = ModuleData;