import jwt from 'jsonwebtoken';

const generateToken = (payload, res) => {
    try {
        const invoCloudAccessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION
        });

        const invoCloudRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });

        res.cookie('invoCloudAccessToken', invoCloudAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('invoCloudRefreshToken', invoCloudRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return { invoCloudAccessToken, invoCloudRefreshToken }
    } catch (error) {
        console.error('Token generation error:', error.message);
        throw new Error('Could not generate tokens');
    }
}

export default generateToken;