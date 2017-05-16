const ModuleData = require('../persistence/module-data');

/**
 * This is a Business Access Layer for contacts
 */
class ModuleService {

    /**
     * Default contructor
     */
    constructor ( ){
        this.mData = new ModuleData();
    }

    /**
     * Get campmagnes
     * @return {Array}
     */
    find () {
        console.log("ModuleService find");
        return this.mData.find();
    }

    /**
     * Adds a contact
     * @param contact
     */
    addContact (contact){
        return this.mData.addContact(contact);
    }

    /**
     * Finds a contact by id
     * @param id
     * @return {*}
     */
    findContactById (id){
        return this.mData.findContactById(id);
    }

    /**
     * Deletes a contact
     * @param contact
     */
    deleteContact (contact){
        return this.mData.deleteContact(contact);
    }

    /**
     * Updates a contact
     * @param contact
     */
    updateContact (contact){
        return this.mData.updateContact(contact);
    }
}

module.exports = ModuleService;