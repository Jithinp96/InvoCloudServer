import jwt from 'jsonwebtoken';

import { generateAccessToken } from '../utils/generateToken.js';
import setToken from '../utils/setToken.js';

import HttpStatusCodes from "../enums/httpStatusCodes.js";
import ErrorMessages from '../enums/ErrorMessages.js';

const authMiddleware = async(req, res, next) => {
    try {
        let invoCloudAccessToken = req.cookies.invoCloudAccessToken;
        const invoCloudRefreshToken = req.cookies.invoCloudRefreshToken;

        if(!invoCloudRefreshToken) {
            return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: ErrorMessages.REFRESH_TOKEN_NOT_FOUND})
        }

        if(!invoCloudAccessToken) {
            const decoded = jwt.verify(invoCloudRefreshToken, process.env.JWT_REFRESH_SECRET);
            const newToken = generateAccessToken(decoded.payload);
            setToken(res, 'invoCloudAccessToken', newToken);

            return res.status(HttpStatusCodes.OK).json({ message: "Access token refreshed" });
        }

        next()
    } catch (error) {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.INTERNAL_SERVER_ERROR });
    }
}

export default authMiddleware;