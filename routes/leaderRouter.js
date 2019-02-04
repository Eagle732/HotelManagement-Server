var express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('./cors');



leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req,res) =>{
    res.sendStatus(200);
})
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next)=> {
    res.end('Will send all the leader to you');
})
.post((req, res, next)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.put(cors.cors, (req, res, next)=> {
    res.end('Put operation not supported');
})
.delete(cors.cors, (req, res, next)=> {
    res.end('Deleting all the leader');
});


leaderRouter.route('/:leaderId')
.get((req, res, next)=>{
    res.end('Will send details of :' + req.params.leaderId
            + ' to you');
})
.post((req, res, next)=>{
    res.statusCode = 403;
    res.end('Post operation is not supported on /leader/' +
                req.params.leaderId);
})
.put((req, res, next)=>{
    res.write('Updating the leader' + req.params.leaderId);
    res.end('Will update the leader : '+
            req.body.name + ' with detail ' +
            req.body.description);
})
.delete((req, res, next)=>{
    res.end('Deleting all the leader');
});

module.exports = leaderRouter;
