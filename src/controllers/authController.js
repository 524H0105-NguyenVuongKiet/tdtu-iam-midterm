const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { generateRegistrationOptions, verifyRegistrationResponse } = require('@simplewebauthn/server');

// 1. API Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email này đã được sử dụng!' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const secret = speakeasy.generateSecret({ name: `TDTU IAM - ${email}` });
        
        const newUser = new User({ email, password: hashedPassword, role: role || 'user', twoFactorSecret: secret.base32 });
        await newUser.save();

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) return res.status(500).json({ message: 'Lỗi tạo mã QR' });
            res.status(201).json({ message: 'Đăng ký tài khoản thành công!', qrCode: data_url });
        });
    } catch (error) { res.status(500).json({ message: 'Lỗi Server!', error: error.message }); }
};

// 2. API Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email không tồn tại!' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu!' });
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Đã thêm role vào phản hồi
        res.json({ message: 'Đăng nhập thành công', token: token, role: user.role });
    } catch (error) { res.status(500).json({ message: 'Lỗi Server!', error: error.message }); }
};

// 3. API Tạo mã QR 2FA
exports.generate2FA = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Không tìm thấy người dùng!' });
        
        const secret = speakeasy.generateSecret({ name: `WPA_Midterm_Kiet (${user.email})` });
        user.twoFactorSecret = secret.base32;
        await user.save();
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) return res.status(500).json({ message: 'Lỗi tạo mã QR' });
            res.json({ message: 'Quét mã QR này', qrCodeImage: data_url, secret: secret.base32 });
        });
    } catch (error) { res.status(500).json({ message: 'Lỗi Server!', error: error.message }); }
};

// 4. API Xác thực mã 2FA
exports.verify2FA = async (req, res) => {
    try {
        const { email, token } = req.body; 
        const user = await User.findOne({ email });
        if (!user || !user.twoFactorSecret) return res.status(400).json({ message: 'Chưa cài đặt 2FA!' });

        const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token: token });
        if (verified) {
            user.isTwoFactorEnabled = true; await user.save();
            res.json({ message: 'Xác thực 2FA thành công!' });
        } else { res.status(400).json({ message: 'Mã xác thực không đúng!' }); }
    } catch (error) { res.status(500).json({ message: 'Lỗi Server!', error: error.message }); }
};

// 5. API Đăng nhập bằng Google
exports.googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body; 
        const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
        const { email, name, picture } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, password: await bcrypt.hash(Math.random().toString(36), 10), role: 'user' });
            await user.save();
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Đã thêm role vào đối tượng user
        res.json({ message: 'Đăng nhập Google thành công', token, user: { email, name, picture, role: user.role } });
    } catch (error) { res.status(400).json({ message: 'Xác thực Google thất bại!', error: error.message }); }
};

// 6. API Vân tay
exports.getBiometricOptions = async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email });
    const options = await generateRegistrationOptions({
        rpName: 'TDTU IAM Project', rpID: 'localhost', userID: user._id.toString(), userName: user.email,
        attestationType: 'none', authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
    });
    user.currentChallenge = options.challenge; await user.save();
    res.json(options);
};

// 7. API Quên mật khẩu
exports.resetPasswordWith2FA = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.twoFactorSecret) return res.status(400).json({ message: 'Lỗi tài khoản' });

        const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token: otp });
        if (!verified) return res.status(400).json({ message: 'Mã OTP không đúng!' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({ message: 'Lấy lại mật khẩu thành công!' });
    } catch (error) { res.status(500).json({ message: 'Lỗi Server!', error: error.message }); }
};

// 8. Xác thực OTP lẻ
exports.verifyOtpOnly = async (req, res) => {
    try {
        const { email, token } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !user.twoFactorSecret) return res.status(404).json({ message: '2FA chưa kích hoạt' });

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token,
            window: 1 
        });

        if (verified) { res.json({ message: 'Xác thực OTP thành công' }); } 
        else { res.status(400).json({ message: 'Mã PIN không đúng!' }); }
    } catch (error) { res.status(500).json({ message: error.message }); }
};