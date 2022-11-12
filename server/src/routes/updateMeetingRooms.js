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
                message = req.body.reserved == true ? `La ${reservedRoom.name} a bien été réservé` : `La ${reservedRoom.name} a bien été libéré`;
                return res.json(success(message, reservedRoom));
            }).catch(error => {
                if(typeof req.body.reserved !== 'boolean' && req.body.reserved != 0 && req.body.reserved != 1 && req.body.reserved !== null) {
                    message = 'Erreur 400 : Veuillez renseigner un booléen uniquement';
                    return res.status(400).json({message});  
                };
                if (error.name === 'ValidationError'){
                    message = `Erreur 400 : ${Object.values(error.errors)[0]}`
                    return res.status(400).json({message})
                };
                message = 'Erreur 500 : Vous ne pouvez pas réserver de salle pour l\'instant Veuillez réessayer plus tard';
                return res.status(500).json({message});
            });
        }).catch(() => {
            message = 'Erreur 500 : Vous ne pouvez pas réserver de salle pour l\'instant Veuillez réessayer plus tard';
            return res.status(500).json({message});
        });
    });
}