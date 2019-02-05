var express = require('express');
const leaderRouter = express.Router();
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');
var Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(cors.cors, (req, res, next) => {
    Leaders.find(req.query)
    .populate('comments.author')
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    Leaders.create(req.body)
    .then((dishes) =>{
        console.log('Leaders created!!!')
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=> {
    res.end('Put operation not supported');
})
.delete(cors.cors, (req, res, next)=> {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err) => next(err))
    .catch((err) => next(err));
});


leaderRouter.route('/:leaderId')
.get(cors.cors, (req, res, next)=>{
    Leaders.findById(req.params.promoId)
    .populate('comments.author')
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=>{
    res.statusCode = 403;
    res.end('Post operation is not supported on /leader/' +
                req.params.leaderId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .populate('comments.author')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo)
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','application/json');
        res.json(dish)
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = leaderRouter;
