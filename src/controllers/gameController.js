const gameService = require('../services/gameService');
const userService = require('../services/userService');
const controllerErrHandler = require('../utils/controllerErrHandler');

exports.getAll = async(req, res) => {
    try {
        const games = await gameService.getAll(req.body.id);
        
        if(games.err){
            throw games.err;
        }
        res.status(200).json(games);
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.getAllByOwnerUsername = async(req, res) => {
    try {
        const user = await userService.getByUsername(req.params.username);
        const games = await gameService.getAllByOwnerId(user._id);
        
        if(games.err){
            throw games.err;
        }
        res.status(200).json(games);
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.get = async(req, res) => {
    try {
        const game = await gameService.getById(req.params.id);
        if(game.err){
            throw game.err;
        }
        res.status(200).json(game);
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.create = async(req, res) => {
    try {
        const user = await userService.getById(req.body._ownerId);

        if(user === null){
            throw new Error('Adding data without logged in user isn\'t allowed!');
        }

        if(user.err){
            throw user.err;
        }

        const game = await gameService.add(req.body);

        
        if(game.err){
            throw game.err;
        }
        res.status(200).json(game);
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.update = async(req, res) => {
    try {
        const user = await userService.getById(req.body.userId);

        if(user === null){
            throw new Error('Adding data without logged in user isn\'t allowed!');
        }

        if(user.err){
            throw user.err;
        }

        const game = await gameService.update(req.body.id, req.body.data, req.body.userId);
        
        if(game.err){
            throw game.err;
        }
        res.status(200).json(game);
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.delete = async(req, res) => {
    try {
        const game = await gameService.delete(req.params.id, req.body.userId);
        if(game.err){
            throw game.err;
        }
        res.status(200).json(game);
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.like = async(req, res) => {
    try {
        const gameId = req.params.id;
        const { userId, like } = req.body;

        const game = await gameService.getById(gameId);

        if(like){
            game.dislikes.includes(userId) ? await gameService.doLike(gameId, userId, false, !like) :  1 ;
            game.likes.includes(userId) ? await gameService.doLike(gameId, userId, false, like) : await gameService.doLike(gameId, userId, true, like);
        }else{
            game.likes.includes(userId) ? await gameService.doLike(gameId, userId, false, !like) :  1 ;
            game.dislikes.includes(userId) ? await gameService.doLike(gameId, userId, false, like) : await gameService.doLike(gameId, userId, true, like);
        }
    }catch(err){
        controllerErrHandler(res, err);
    }
}

exports.comment = async(req, res) => {
    try {
        const game = await gameService.addComment(req.params.id, req.body);
        res.status(200).json(game);
    }catch(err){
        controllerErrHandler(res, err);
    }
}
