const Room = require('../models/room');
const { success } = require('../helper');
  
module.exports = (app) => {
    app.put('/api/switchStateRoom', (req, res) => {
        const name = req.query.name;
        let message = '';
        Room.findOne({'name': name}).then(room => {
            if(!room){
                message = 'Erreur 404 : Cette salle n\'existe pas';
                return res.status(404).json({message});
            }
            Room.findOneAndUpdate({'name': name}, {reserved: req.body.reserved}, { new: true, runValidators: true }).then(reservedRoom => {
                message = `La ${reservedRoom.name} a bien été réservé`;
                res.json(success(message, reservedRoom));
            }).catch(() => {
                message = 'Erreur 500 : Vous ne pouvez pas réserver de salle pour l\'instant Veuillez réessayer plus tard';
                res.status(500).json({message});
            });
        }).catch(() => {
            message = 'Erreur 500 : Vous ne pouvez pas réserver de salle pour l\'instant Veuillez réessayer plus tard';
            res.status(500).json({message});
        });
    });
}