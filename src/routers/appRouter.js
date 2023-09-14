const appRouter = require('express').Router();

appRouter.use(require('./gameRouter'));
appRouter.use(require('./userRouter'));

const errFunc = (req, res) => {
    res.status(400).json({
        message: 'Request path not found!',
        dublicate: false
    })
}

appRouter.get('*', errFunc);
appRouter.post('*', errFunc);
appRouter.put('*', errFunc);
appRouter.delete('*', errFunc);

module.exports = appRouter;