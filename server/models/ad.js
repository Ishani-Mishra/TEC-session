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
    dateCreated: {
        type: String,
        required: false,
        default: ''
    }
})

AdsSchema.pre('save', async function (next){
    const ad = this;
    const timeElapsed = Date.now();
    const todayDate = new Date(timeElapsed);
    ad.dateCreated = todayDate.toUTCString();
    next();
})


module.exports = mongoose.model('Ads', AdsSchema);