const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdsSchema = new Schema({
    title: {
        type: String,
        require: true,
        default: ''
    },
    content: {
        type: String,
        require: true,
        default: ''
    },
    author: {
        type: String,
        require: true,
        default: ''
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})


module.exports = mongoose.model('Ads', AdsSchema);