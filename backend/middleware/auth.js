const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) =>
{
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token)
    {
        return res.status(401).json({message: 'TOKEN NOT FOUND, AUTHORIZATION DENIED'});
    }

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err)
    {
        res.status(401).json({message: "Invalid Token"});
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = { authMiddleware, adminMiddleware };