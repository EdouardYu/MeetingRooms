const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');

//Appel de la base de données :
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/meeting-rooms.ico')).use(bodyParser.json()).use(cors());

app.get('/', (req, res) => {
    res.json('Hello libheros!')
});

//Pour afficher les salles disponibles : 
require('./routes/findMeetingRooms')(app);
//Pour réserver une salle :
require('./routes/updateMeetingRooms')(app);

app.use(({res}) => {
    const message = 'Erreur 404 : Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL';
    res.status(404).json({message});
});

app.listen(port, () => console.log(`L'application Node est démarrée sur : http://localhost:${port}`));
