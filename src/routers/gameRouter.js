const gameRouter = require('express').Router();
const gameController = require('../controllers/gameController');

gameRouter.get('/game', gameController.getAll);
gameRouter.get('/game/:id', gameController.get);
gameRouter.get('/game/profile/:username', gameController.getAllByOwnerUsername);
gameRouter.post('/game', gameController.create);
gameRouter.put('/game/:id', gameController.update);
gameRouter.delete('/game/:id', gameController.delete);


gameRouter.post('/game/:id/like', gameController.like);
gameRouter.post('/game/:id/comment', gameController.comment);

module.exports = gameRouter;