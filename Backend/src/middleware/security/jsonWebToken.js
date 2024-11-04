import 'dotenv/config'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    
    
    try {
        
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.name = payload.name;
        console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(403).json({ message: "Token not valid" });
    }
}

export default {
    verifyToken
}