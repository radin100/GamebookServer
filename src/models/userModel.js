const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email required!'],
        unique: true
    },

    username: {
        type: String,
        require: [true, 'Username required!'],
        unique: true
    },

    password: {
        type: String,
        require: [true, 'Password required!']
    },

    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Game'
    }]
})

const User = mongoose.model('User', userShema);

module.exports = User;