const Game = require('../models/gameModel');

const getOwnerId = async(gameId) => {
    const game = await Game.findById(gameId);
    const ownerId = JSON.parse(JSON.stringify(game))._ownerId;
    return ownerId;
}

exports.getAll = async() => {
    try {
        const games = await Game.find().lean();
        return games;
    }catch(err){
        return { err }
    }
}

exports.getAllByOwnerId = async(id) => {
    try {
        const games = await Game.find({ _ownerId: id }).lean();
        return games;
    }catch(err){
        return { err }
    }
}

exports.getById = async(id) => {
    try {
        const game = await Game.findById(id).lean();
        return game;
    }catch(err){
        return { err }
    }
}

exports.add = async(data) => {
    try {
        const game = await Game.create({ ...data, likes: [], dislikes: [], comments: [] });
        return game;
    }catch(err){
        return { err }
    }
}

exports.update = async(id, data, userId) => {
    try {
        const ownerId = await getOwnerId(id);

        if(ownerId !== userId){
            throw new Error('Only game owner is allowed to update or delete his game posts!');
        }
        const newGame = await Game.findByIdAndUpdate(id, data);
        return newGame;
    }catch(err){
        return { err }
    }
}

exports.delete = async(id, userId) => {
    try {
        const ownerId = await getOwnerId(id);
        if(ownerId !== userId){
            throw new Error('Only game owner is allowed to update or delete his game posts!');
        }
        const deadGame = await Game.findByIdAndDelete(id);
        return deadGame;
    }catch(err){
        return { err }
    }
}

exports.doLike = async(gameId, userId, add, like) => {
    try {
        if(like){
            if(add){
                const newGame = await Game.findByIdAndUpdate(gameId, { $push: { likes: userId } });
                return newGame;
            }else{
                const newGame = await Game.findByIdAndUpdate(gameId, { $pull: { likes: userId } });
                return newGame;
            }
        }else{
            if(add){
                const newGame = await Game.findByIdAndUpdate(gameId, { $push: { dislikes: userId } });
                return newGame;
            }else{
                const newGame = await Game.findByIdAndUpdate(gameId, { $pull: { dislikes: userId } });
                return newGame;
            }
        }
    }catch(err){
        return { err }
    }
}

exports.addComment = async(id, comment) => {
    try {
        const newGame = await Game.findByIdAndUpdate(id, { $push: { comments: comment } });
        return newGame;        
    }catch(err){
        return { err }
    }
}