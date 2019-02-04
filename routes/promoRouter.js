var express = require('express');
const promotionRouter = express.Router();
const bodyParser = require('body-parser');
const authenticate = reqired('../authenticate');
const cors = require('./cors');
var Promotions = required('../models/promotions');

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get(cors.cors, (req, res, next) => {
    Promotions.find({})
    .populate('comments.author')
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
    Promotions.create(req.body)
    .then((dishes) =>{
        console.log('Promotions created!!!')
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser (req, res, next)=> {
    res.end('Put operation not supported');
})
.delete(cors.cors, (req, res, next)=> {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(resp)
    },(err) => next(err))
    .catch((err) => next(err));
});


promotionRouter.route('/:promoId')
.get(cors.cors, (req, res, next)=>{
    Promotions.findById(req.params.promoId)
    .populate('comments.author')
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=>{
    res.statusCode = 403;
    res.end('Post operation is not supported on /promo/' +
                req.params.promoId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
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
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','application/json');
        res.json(dish)
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promotionRouter;
