import jwt from 'jsonwebtoken';

const generateAccessToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    return token
};

const generateRefreshToken = (payload) => {
    const token = jwt.sign({payload}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    return token
};

export { generateAccessToken, generateRefreshToken };