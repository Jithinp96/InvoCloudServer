import jwt from 'jsonwebtoken';
import HttpStatusCodes from "../enums/httpStatusCodes.js";
import { generateAccessToken } from '../utils/generateToken.js';
import setToken from '../utils/setToken.js';

const authMiddleware = async(req, res, next) => {
    try {
        let invoCloudAccessToken = req.cookies.invoCloudAccessToken;
        const invoCloudRefreshToken = req.cookies.invoCloudRefreshToken;

        if(!invoCloudRefreshToken) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Please login to view the datails!"})
        }

        if(!invoCloudAccessToken) {
            const decoded = jwt.verify(invoCloudRefreshToken, process.env.JWT_REFRESH_SECRET);
            const newToken = generateAccessToken(decoded.payload);
            setToken(res, 'invoCloudAccessToken', newToken);

            return res.status(HttpStatusCodes.OK).json({ message: "Access token refreshed" });
        }

        next()
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Authentication failed!" });
    }
}

export default authMiddleware;