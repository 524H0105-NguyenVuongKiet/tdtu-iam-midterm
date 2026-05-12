const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { generateRegistrationOptions, verifyRegistrationResponse } = require('@simplewebauthn/server');

// 1. Account Registration API
exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) return res.status(400).json({ message: 'This email is already in use!' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const secret = speakeasy.generateSecret({ name: `TDTU IAM - ${email}` });

        const newUser = new User({ email, password: hashedPassword, role: role || 'user', twoFactorSecret: secret.base32 });
        await newUser.save();

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) return res.status(500).json({ message: 'Error generating QR code' });
            res.status(201).json({ message: 'Account registered successfully!', qrCode: data_url });
        });
    } catch (error) { res.status(500).json({ message: 'Internal Server Error!', error: error.message }); }
};

// 2. Login API
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: 'Email does not exist!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password!' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Added role to the response
        res.json({ message: 'Login successful', token: token, role: user.role });
    } catch (error) { res.status(500).json({ message: 'Internal Server Error!', error: error.message }); }
};

// 3. Generate 2FA QR Code API
exports.generate2FA = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: 'User not found!' });

        const secret = speakeasy.generateSecret({ name: `WPA_Midterm_Kiet (${user.email})` });
        user.twoFactorSecret = secret.base32;
        await user.save();

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) return res.status(500).json({ message: 'Error generating QR code' });
            res.json({ message: 'Scan this QR code', qrCodeImage: data_url, secret: secret.base32 });
        });
    } catch (error) { res.status(500).json({ message: 'Internal Server Error!', error: error.message }); }
};

// 4. Verify 2FA API
exports.verify2FA = async (req, res) => {
    try {
        const { email, token } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !user.twoFactorSecret) return res.status(400).json({ message: '2FA is not configured!' });

        const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token: token });

        if (verified) {
            user.isTwoFactorEnabled = true; await user.save();
            res.json({ message: '2FA verification successful!' });
        } else { 
            res.status(400).json({ message: 'Invalid authentication code!' });
        }
    } catch (error) { res.status(500).json({ message: 'Internal Server Error!', error: error.message }); }
};

// 5. Google Login API
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
        
        // Added role to the user object
        res.json({ message: 'Google login successful', token, user: { email, name, picture, role: user.role } });
    } catch (error) { res.status(400).json({ message: 'Google authentication failed!', error: error.message }); }
};

// 6. Biometric API (WebAuthn Setup)
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

// 7. Forgot Password API
exports.resetPasswordWith2FA = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !user.twoFactorSecret) return res.status(400).json({ message: 'Account error or 2FA not configured' });

        const verified = speakeasy.totp.verify({ secret: user.twoFactorSecret, encoding: 'base32', token: otp });
        if (!verified) return res.status(400).json({ message: 'Invalid OTP code!' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        
        res.json({ message: 'Password reset successful!' });
    } catch (error) { res.status(500).json({ message: 'Internal Server Error!', error: error.message }); }
};

// 8. Single OTP Verification API
exports.verifyOtpOnly = async (req, res) => {
    try {
        const { email, token } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !user.twoFactorSecret) return res.status(404).json({ message: '2FA is not enabled on this account' });

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token,
            window: 1 
        });

        if (verified) { 
            res.json({ message: 'OTP verification successful' });
        } else { 
            res.status(400).json({ message: 'Invalid PIN code!' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};