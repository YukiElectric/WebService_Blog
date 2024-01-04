const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (id, admin) => {
    return jwt.sign({
        id: id, admin: admin
    },
        config.get("app.secretKey"),
        { expiresIn: "30d" }
    )
}