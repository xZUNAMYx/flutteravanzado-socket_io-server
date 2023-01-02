const { io } = require('../index'); //Agregar tambien el js?

const Levels = require('../models/levels');

const Level = require('../models/level');

const levels = new Levels();

levels.addLevel( new Level('C1') );
levels.addLevel( new Level('KIDS1') );
levels.addLevel( new Level('KIDS2') );
levels.addLevel( new Level('JUNIOR') );

console.log(levels);

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-levels', levels.getLevels() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' } );
    });

    client.on('emitir-mensaje', (payload) => {
        console.log(payload)
        // io.emit('nuevo-mensaje',  payload); //emite a todos
        client.broadcast.emit('nuevo-mensaje',  payload); //emite a todos menos al que lo emitio
    })

    client.on('vote-level', (payload) => {
        console.log(payload.id);
        levels.voteLevel(payload.id);
        io.emit('active-levels', levels.getLevels());
    })

    //escuchar add-level
    client.on('add-level', (payload) => {
        console.log(payload.name);
        const newLevel = new Level(payload.name);
        console.log(newLevel);
        levels.addLevel(newLevel);
        io.emit('active-levels', levels.getLevels());
    })

    //escuchar delete level
    client.on('delete-level', (payload) => {
        console.log(payload.id);
        levels.deleteLevel(payload.id);
        io.emit('active-levels', levels.getLevels());
    })

});