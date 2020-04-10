const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,        
    },
    tokenConfirmRegister: {
        type: String,
        required: false,        
    },
    confirmRegisterAt: {
        type: Date,     
    },
    active: {
        type: String,        
    },
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    this.active = 'N';

    next();
});

module.exports = mongoose.model('User', UserSchema);