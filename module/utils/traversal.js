export class Traversal {

    /*
     * ENTITIES
     */

    static getAllEntitiesOfType(type, collection) {
        const compendium = game.packs.get(collection).getContent();
        const ingame = game.items.filter(item => item.type === type);
        return ingame.concat(compendium);
    }

    static findCapacityEntityByKey (key) {
        return this.getAllEntitiesOfType().find(entity => entity.data.key === key);
    }

    static findPathEntityByKey (key) {
        return this.getAllEntitiesOfType().find(entity => entity.data.key === key);
    }

    static findProfileEntityByKey (key) {
        return this.getAllEntitiesOfType().find(entity => entity.data.key === key);
    }

    static findSpeciesEntityByKey (key) {
        return this.getAllEntitiesOfType().find(entity => entity.data.key === key);
    }

    /*
     * DATA
     */

    static getInGameEntitiesDataOfType (type) {
        return game.items.filter(item => item.type === type).map(entity => entity.data);
    }

    static getAllCapacitiesData () {
        const compendium = COF.capacities;
        const ingame = this.getInGameEntitiesDataOfType("capacity");
        return ingame.concat(compendium);
    }

    static getAllPathsData () {
        const compendium = COF.paths;
        const ingame = this.getInGameEntitiesDataOfType("path");
        return ingame.concat(compendium);
    }

    static getAllProfilesData () {
        const compendium = COF.profiles;
        const ingame = this.getInGameEntitiesDataOfType("profile");
        return ingame.concat(compendium);
    }

    static getAllSpeciesData () {
        const compendium = COF.species;
        const ingame = this.getInGameEntitiesDataOfType("species");
        return ingame.concat(compendium);
    }

    static findCapacityDataByKey (key) {
        return this.getAllCapacitiesData().find(entity => entity.data.key === key);
    }

    static findPathDataByKey (key) {
        return this.getAllPathsData().find(entity => entity.data.key === key);
    }

    static findProfileDataByKey (key) {
        return this.getAllProfilesData().find(entity => entity.data.key === key);
    }

    static findSpeciesDataByKey (key) {
        return this.getAllSpeciesData().find(entity => entity.data.key === key);
    }
}