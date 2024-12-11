import HttpStatusCodes from "../enums/httpStatusCodes.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import setToken from "../utils/setToken.js";

const userController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        
        try {
            if(email !== process.env.USER_EMAIL || password !== process.env.USER_PASSWORD) {
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials. Please try again!"})
            }

            if(email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD) {
                const payload = { email, role: 'user' };

                const accessToken = generateAccessToken(payload);
                const refreshToken = generateRefreshToken(payload);
                setToken(res, 'invoCloudAccessToken', accessToken);
                setToken(res, 'invoCloudRefreshToken', refreshToken);

                return res.status(HttpStatusCodes.OK).json({ message: "Login successfull"});
            }
        } catch (error) {
            
        }
    },
    
    logout: async (req, res) => {
        try {
            
        } catch (error) {
            
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