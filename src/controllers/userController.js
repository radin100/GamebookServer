const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const controllerErrHandler = require('../utils/controllerErrHandler');
const jwt = require('../utils/jwt');

exports.login = async (req, res) => {
    try {
        const data = req.body; 
        const user = await userService.get(data);

        if(user.err){
            throw user.err;
        }

        const accessToken = await jwt.sign(user, 'SecretKey');

        res.status(200).json(accessToken);

    } catch (err) {
        controllerErrHandler(res, err);
    }
}

exports.register = async (req, res, next) => {
    try {
        const data = req.body;

        if( data.password !== data.repassword || data.password === '' || data.username === '' || data.email === '' ){
            throw new Error('Invalid data');
        }
    
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(data.password, salt);

        const newData = {
            username: data.username,
            email: data.email,
            password
        }

        const user = await userService.add(newData);
        if(user.err){
            throw user.err;
        }

        next();
        
    } catch(err){
        controllerErrHandler(res, err);
    }
}

exports.get = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        res.status(200).json(user.username);
    }catch(err){
        controllerErrHandler(res, err);
    }
}