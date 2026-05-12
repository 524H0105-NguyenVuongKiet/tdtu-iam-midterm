const jwt = require('jsonwebtoken');

// Middleware xác thực Token (JWT)
exports.verifyToken = (req, res, next) => {
    // Lấy token từ header 'Authorization'
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Truy cập bị từ chối! Thiếu Token.' });

    try {
        // Giải mã token bằng Secret Key trong file .env
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified; // Lưu thông tin user vào request để dùng ở các bước sau
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token không hợp lệ!' });
    }
};

// Middleware kiểm tra quyền Admin (RBAC)
exports.checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Lỗi quyền truy cập! Bạn không phải là Admin.' });
    }
    next();
};