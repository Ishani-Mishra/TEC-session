const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        default: '',
    },
    lastName: {
        type: String,
        required: true,
        default: '',
    },
    email: {
        type: String,
        required: true,
        default: '',
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    dateCreated: {
        type: String,
        required: false,
        default: ''
    },
    noOfAds: {
        type: String,
        required: false,
        default: 0
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    const timeElapsed = Date.now();
    const todayDate = new Date(timeElapsed);
    user.dateCreated = todayDate.toUTCString();
    next();
})

module.exports = mongoose.model('User', UserSchema);
