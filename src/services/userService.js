const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.get = async (data) => {
    try{
        const user = await User.findOne({ email: data.email }).lean();
        if(user === null){
            throw new Error('User with this email doesn\'t exist! Register a new one?');
        }

        const isPasswordWright = await bcrypt.compare(data.password, user.password);
                
        if(!isPasswordWright){
            throw new Error('Wrong password!');
        }

        return user;
    }catch(err){
        return { err }
    }
}

exports.getByUsername = async (username) => {
    try{
        const user = await User.findOne({ username }).lean();
        if(user === null){
            throw new Error('User with this username doesn\'t exist! Register a new one?');
        }

        return user;
    }catch(err){
        return { err }
    }
}

exports.getById = async (id) => {
    try{
        const user = await User.findById(id).lean();
        return user;
    }catch(err){
        return { err }
    }
}

exports.add = async (data) => {
    try{
        const user = await User.create(data);
        return user;
    }catch(err){
        return { err }
    }
}