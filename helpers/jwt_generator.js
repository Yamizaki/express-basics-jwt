import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export  function generateToken(payload){
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET || "default_jwt_secret" , { expiresIn: '1h' });
}

export  function verifyToken(req, res, next){
    const authHeader = req.headers['authorization'];
    console.log("authHeader", authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        jsonwebtoken.verify(token, process.env.JWT_SECRET || "default_jwt_secret");      
        next();
    } catch (error) {
        console.error("Invalid token", error);
        return res.status(400).json({ error: 'Token inválido' });;
    }           
}