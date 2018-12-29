var express = require('express');
const promoRouter = express.Router();
const bodyParser = require('body-parser');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next)=> {
    res.end('Will send all the promotions to you');
})
.post((req, res, next)=> {
    res.end('Will add the promotions: '+ req.body.name +
    ' with details: '+ req.body.description);
})
.put((req, res, next)=> {
    res.statusCode = 403;
    res.end('Put operation not supported');
})
.delete((req, res, next)=> {
    res.end('Deleting all the promotions');
});


promoRouter.route('/:promoId')
.get((req, res, next)=>{
    res.end('Will send details of :' + req.params.promoId
            + ' to you');
})
.post((req, res, next)=>{
    res.statusCode = 403;
    res.end('Post operation is not supported on /promotions/' +
                req.params.promoId);
})
.put((req, res, next)=>{
    res.write('Updating the promotions' + req.params.promoId);
    res.end('Will update the promotions : '+
            req.body.name + ' with detail ' +
            req.body.description);
})
.delete((req, res, next)=>{
    res.end('Deleting all the promotions');
});

module.exports = promoRouter;
