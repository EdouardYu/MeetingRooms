const mongoose = require('mongoose');

const room = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Veuillez renseigner le nom de la salle'],
    },
    description: {
        type: String,
    },

    capacity: {
        type: Number,
        required: [true, 'Veuillez renseigner la capacité de la salle (5-26 per)'],
        min: [5, 'La capacité d\'une salle est comprise entre 5 et 26 personnes'],
        max: [26, 'La capacité d\'une salle est comprise entre 5 et 26 personnes'],
        validate: [Number.isInteger, 'Veuillez renseigner un nombre entier entre 1 et 26']
    },
    equipements: {
        type: [{ 
            type: String,
            enum: {
                values: ["TV", "Retro Projecteur"], 
                message: 'Veuillez choisir un/des équipement(s) dans ["TV", "Retro Projecteur"]'
            }
        }],
        default: []
    },
    reserved: {
        type: Boolean,
        required: [true, 'Veuillez renseigner l\'état de la salle (Est-elle réservéé ou libre ?)'],
        default: false
    }

}, { versionKey: false });

module.exports = mongoose.model('Room',room);