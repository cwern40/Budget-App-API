const jwt = require('jsonwebtoken');

function generateToken(user) {

    const payload = {
        sub: user.id,
        email: user.email,
    };

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = generateToken;