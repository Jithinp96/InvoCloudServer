import ErrorMessages from "../enums/ErrorMessages.js";
import HttpStatusCodes from "../enums/httpStatusCodes.js";
import SuccessMessages from "../enums/successMessages.js";
import AppError from "../utils/appError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import setToken from "../utils/setToken.js";

const userController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        
        try {
            if(email !== process.env.USER_EMAIL || password !== process.env.USER_PASSWORD) {
                return next(new AppError(HttpStatusCodes.UNAUTHORIZED, ErrorMessages.INVALID_CREDENTIALS))
            }

            if(email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD) {
                const payload = { email, role: 'user' };

                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);

                setToken(res, 'invoCloudAccessToken', accessToken);
                setToken(res, 'invoCloudRefreshToken', refreshToken);

                return res.status(HttpStatusCodes.OK).json({ message: SuccessMessages.LOGIN_SUCCESS});
            }
        } catch (error) {
            next(error)
        }
    },
    
    logout: async (req, res, next) => {
        try {
            res.clearCookie('invoCloudAccessToken');
            res.clearCookie('invoCloudRefreshToken');

            res.status(HttpStatusCodes.OK).json({ message: SuccessMessages.LOGOUT_SUCCESS})
        } catch (error) {
            next(error)
        }
    },

    getDashboard: async (req, res) => {
        try {
            console.log("Inside getDashboard function");
            
        } catch (error) {
            console.log("Inside getDashboard function catch");
        }
    }
    
}

export default userController