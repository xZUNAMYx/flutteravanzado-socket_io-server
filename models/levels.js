
class Levels{

    constructor(){
        this.levels = [];
    }

    addLevel( level = new Level()){
        this.levels.push( level );
    }

    getLevels(){
        return this.levels;
    }

    deleteLevel( id = '' ){
        this.levels = this.levels.filter( level => level.id != id );
        return this.levels;     
    }

    voteLevel( id = '' ){
        this.levels = this.levels.map( level => {
            if (level.id === id){
                level.quantity++;
                return level;
            }else{
                return level;
            }
        });
    }

}

module.exports = Levels;