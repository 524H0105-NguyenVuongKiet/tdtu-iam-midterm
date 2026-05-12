const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, checkAdmin } = require('../middlewares/authMiddleware');

router.get('/profile', verifyToken, (req, res) => { res.json({ message: 'This is the personal profile page', user: req.user }); });
router.get('/admin-dashboard', verifyToken, checkAdmin, (req, res) => { res.json({ message: 'Welcome, Administrator!' }); });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/2fa/generate', authController.generate2FA);
router.post('/verify-2fa', authController.verify2FA);
router.post('/google', authController.googleLogin);
router.get('/biometric/options', authController.getBiometricOptions);
router.post('/reset-password-2fa', authController.resetPasswordWith2FA);

// New route to prevent Frontend Gateway Error
router.post('/verify-otp-only', authController.verifyOtpOnly);

module.exports = router;