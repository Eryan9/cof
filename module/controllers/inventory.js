export class Inventory {

    /**
    * Callbacks on increase/decrease item actions
    * @param actor
    * @param item
    * @param increment
    * @param isDecrease
    */
    static modifyQuantity(actor, item, increment, isDecrease) {
        const stackable = item.data.data.properties.stackable;
        if(stackable){
            let itemData = duplicate(item.data);
            const qty = itemData.data.qty;
            if(isDecrease) itemData.data.qty = qty - increment;
            else  itemData.data.qty = qty + increment;
            if(itemData.data.qty < 0) itemData.data.qty = 0;
            if(itemData.data.stacksize && itemData.data.qty > itemData.data.stacksize) itemData.data.qty = itemData.data.stacksize;
            if(itemData.data.price){
                const qty = (itemData.data.qty) ? itemData.data.qty : 1;
                itemData.data.value = qty * itemData.data.price;
            }
            return item.update(itemData);
        }
    }

    /**
     * Callbacks on equip/unequip actions
     * @param actor
     * @param item
     * @param syncEffect 
     */
    static toggleEquip(actor, item, syncEffect=true) {
        const equipable = item.data.data.properties.equipable;
        if(equipable){
            let itemData = duplicate(item.data);
            itemData.data.worn = !itemData.data.worn;

            if (game.settings.get("cof", "useIncompetentPJ") && itemData.data.worn) {
                // Prend en compte les règles de PJ Incompétent : utilisation d'équipement non maîtrisé par le PJ
                if (itemData.data.subtype === "armor" || itemData.data.subtype === "shield") {
                    const armorCategory = item.getMartialCategory();
                    if (!actor.isCompetentWithArmor(armorCategory)) {
                        ui.notifications?.warn(actor.name + " est incompétent dans le port de l'armure " + item.name);
                    }    
                }
                if (itemData.data.subtype === "melee" || itemData.data.subtype === "ranged") {
                    const weaponCategory = item.getMartialCategory();
                    if (!actor.isCompetentWithWeapon(weaponCategory)) {
                        ui.notifications?.warn(actor.name + " est incompétent dans le port de l'arme " + item.name);
                    }    
                }
            }
            return item.update(itemData).then((item)=>{
                if (syncEffect) actor.syncItemActiveEffects(item);
            });
        }
    }

    /**
     * Callbacks on consume actions
     * @param actor
     * @param item 
     */
    static consume(actor, item) {
        const consumable = item.data.data.properties.consumable;
        if(consumable){
            let itemData = duplicate(item.data);
            itemData.data.qty = (itemData.data.qty > 0) ? itemData.data.qty - 1 : 0;
            return item.update(itemData).then(i=> item.applyEffects(actor));
            // return actor.updateOwnedItem(itemData);
        }
    }
}