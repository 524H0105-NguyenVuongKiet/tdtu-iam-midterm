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
        enum: ['user', 'admin'], // Đây là cốt lõi của RBAC (Phân quyền)
        default: 'user' 
    },
    twoFactorSecret: { 
        type: String // Dùng để lưu mã bí mật tạo ra mã QR cho Google Authenticator
    },
    isTwoFactorEnabled: { 
        type: Boolean, 
        default: false // Mặc định là chưa bật 2FA
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);