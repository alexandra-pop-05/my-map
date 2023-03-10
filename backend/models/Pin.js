const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    title:{ 
        type: String,
        require: true,
        min: 3,
        unique: true,
    },
    description: {
        type: String,
        require: true,
        min: 6,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
    },
    lat: {
        type: Number,
        require: true,
    },
    long: {
        type: Number,
        require: true,
    },
    terminalID: { 
        type: String, 
        require: true 
    },
    currentTime: { 
        type: Date, 
        default: Date.now() 
    },

},
    { timestamps: true }
);

module.exports = mongoose.model('Pin', pinSchema);