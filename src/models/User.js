const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], // Core of RBAC (Role-Based Access Control)
        default: 'user' 
    },
    twoFactorSecret: { 
        type: String // Used to store the secret key for Google Authenticator QR code generation
    },
    isTwoFactorEnabled: { 
        type: Boolean, 
        default: false // Default is 2FA disabled
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);