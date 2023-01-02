const { v4: uuidV4 } = require('uuid');

class Level {
    constructor(name = 'no-name'){

        this.id = uuidV4(); //Identificador unico
        this.name = name;
        this.quantity = 0;
    }
}


module.exports = Level;