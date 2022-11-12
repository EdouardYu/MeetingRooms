const mongoose = require('mongoose');


let user = "Libheros";
let pwd = "Libheros";
let dbName = "meetingrooms";

mongoose.connect(
    `mongodb+srv://${user}:${pwd}@libheros.wyfk7sh.mongodb.net/${dbName}?retryWrites=true&w=majority`
).then(() => console.log(`La connexion à la base de données ${dbName} a bien été établie`)
).catch(error => console.log(`Impossible de se connecter à la base de données ${dbName} :\n${error}`));

//Pour créer les 6 salles de réunion sur la basse de données (à utiliser que si la collection n'existe pas):
/*
const rooms = require('./rooms');
const Room = require('../models/room');
rooms.map(room => {
  room = Room.create({
    name: room.name,
    description: room.description,
    capacity: room.capacity,
    equipements: room.equipements
  });
});
*/

