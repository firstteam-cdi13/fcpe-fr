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
    find () {
        return this.mData.find();
    }
}

module.exports = CampagneService;