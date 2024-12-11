import HttpStatusCodes from "../enums/httpStatusCodes.js";
import generateToken from "../utils/generateToken.js";

const userController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            if(email !== process.env.USER_EMAIL || password !== process.env.USER_PASSWORD) {
                return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials. Please try again!"})
            }

            if(email === process.env.USER_EMAIL && password === process.env.USER_PASSWORD) {
                const payload = { email, role: 'user' }

                generateToken(payload, res)
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
    
}

export default userController