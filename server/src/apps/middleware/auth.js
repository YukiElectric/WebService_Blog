const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, config.get("app.secretKey"), (err, user) => {
            if (err) {
                res.status(403).json({
                    status: "Failed",
                    message: "Token is not valid"
                })
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            status: "Failed",
            message: "Permission denied"
        })
    }
}

const adminAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.admin) next();
        else {
            res.status(401).json({
                status: "Failed",
                message: "Permission denied"
            });
        }
    })
}

module.exports = {
    verifyToken,
    adminAuth
}