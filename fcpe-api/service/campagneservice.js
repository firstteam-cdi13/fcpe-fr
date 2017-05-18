const CampagneData = require('../persistence/campagnedata');

/**
 * This is a Business Access Layer for contacts
 */
class CampagneService {

    /**
     * Default contructor
     */
    constructor ( ){
        this.mData = new CampagneData();
    }

    /**
     * Get campmagnes
     * @return {Array}
     */
    find (callback) {
        console.log("ModuleService find");
        this.mData.find(function(campagnes){
            callback(campagnes);
        })
        //return this.mData.find();
    }
}

module.exports = CampagneService;