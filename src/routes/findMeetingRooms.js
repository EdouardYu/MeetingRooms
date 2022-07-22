const Room = require('../models/room');
const { success, pluralize } = require('../helper');
  
module.exports = (app) => {
  app.get('/api/availableRooms/:reserved', (req, res) => {
    let message = '';
    const reserved = (req.params.reserved == 'true' || parseInt(req.params.reserved) == 1);
    const capacity = req.query.capacity || 1;
    const equipement1 = req.query.equipement1 || '';
    const equipement2 = req.query.equipement2 || '';
    if(capacity < 1) {
      message = 'Erreur 400 : Veuillez choisir un nombre de personnes valide (1-26 per)';
      return res.status(400).json({message});
    }
    const equipements = ['', 'TV', 'Retro Projecteur'];
    if(!equipements.includes(equipement1) || !equipements.includes(equipement2)) {
      message = "Erreur 400 : Veuillez choisir un équipement disponible dans ['TV', 'Retro Projecteur']";
      return res.status(400).json({message});
    }
    if(equipement1 != '' && equipement2 != ''){
      Room.find({'capacity': { $gt: capacity-1 }, 'equipements': ['TV', 'Retro Projecteur'], 'reserved': false}).then(rooms => {
        if(rooms.length == 0){
          message = 'Il n\'y a aucune salle de disponible pour l\'instant Veuillez réessayer plus tard';
          return res.json({message});
        }
        message = `Il y a actuellement ${pluralize(rooms.length, 'salle', 'salles')} de disponible`;
        res.json(success(message, rooms));
      }).catch(() => {
        message = 'Erreur 500 : Oups! Une erreur est survenue de notre côté Veuillez réessayer plus tard';
        res.status(500).json({message});
      });
    } else if(equipement1 != ''){
      Room.find({'capacity': { $gt: capacity-1 }, 'equipements': { $in: [equipement1]}, 'reserved': false}).then(rooms => {
        if(rooms.length == 0){
          message = 'Il n\'y a aucune salle de disponible pour l\'instant Veuillez réessayer plus tard';
          return res.json({message});
        }
        message = `Il y a actuellement ${pluralize(rooms.length, 'salle', 'salles')} de disponible`;
        res.json(success(message, rooms));
      }).catch(() => {
        message = 'Erreur 500 : Oups! Une erreur est survenue de notre côté Veuillez réessayer plus tard';
        res.status(500).json({message});
      });
    } else if(equipement2 != ''){
      Room.find({'capacity': { $gt: capacity-1 }, 'equipements': { $in: [equipement2]}, 'reserved': false}).then(rooms => {
        if(rooms.length == 0){
          message = 'Il n\'y a aucune salle de disponible pour l\'instant Veuillez réessayer plus tard';
          return res.json({message});
        }
        message = `Il y a actuellement ${pluralize(rooms.length, 'salle', 'salles')} de disponible`;
        res.json(success(message, rooms));
      }).catch(() => {
        message = 'Erreur 500 : Oups! Une erreur est survenue de notre côté Veuillez réessayer plus tard';
        res.status(500).json({message});
      });
    } else {
      Room.find({'capacity': { $gt: capacity-1 }, 'reserved': reserved}).then(rooms => {
        if(rooms.length == 0){
          message = 'Il n\'y a aucune salle de disponible pour l\'instant Veuillez réessayer plus tard';
          return res.json({message});
        }
        message = `Il y a actuellement ${pluralize(rooms.length, 'salle', 'salles')} de disponible`;
        res.json(success(message, rooms));
      }).catch(() => {
        message = 'Erreur 500 : Oups! Une erreur est survenue de notre côté Veuillez réessayer plus tard';
        res.status(500).json({message});
      });
    }
  });
}