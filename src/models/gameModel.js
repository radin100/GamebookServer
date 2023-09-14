const mongoose = require('mongoose');

const gameShema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name required!']
    },

    description: {
        type: String,
        require: [true, 'Description required!']
    },

    img: {
        type: String,
        require: [true, 'Image URL required!']
    },

    genre: {
        type: String,
        require: [true, 'Genre required!'],
        enum: { 
            values: ['Role-Playing', 'Survival', 'Racing/Simulation', 'Other'],
            message: 'Please choose game genre or use one from our data!'   
        }
    },

    likes: [{
        type: String,
        require: [true, 'Only users can like and dislike posts!']
    }],

    dislikes: [{
        type: String,
        require: [true, 'Only users can like and dislike posts!']
    }],

    comments: [{
        authorUsername: {
            type: String,
            require: [true, 'Username required!']
        },
        text: {
            type: String,
            require: [true, 'Text required!']
        }
    }],

    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Game = mongoose.model('Game', gameShema);

module.exports = Game;