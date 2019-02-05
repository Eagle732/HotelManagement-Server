const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating:{
        type:Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
        timestamps: true
});

const leaderSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    comments : [ commentSchema ]
},{
    timestamps: true
});

var Leaders = mongoose.model('leader',leaderSchema)

module.exports = Leaders;
