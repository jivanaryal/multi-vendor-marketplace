import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });


    }

    try {
        const verified = jwt.verify(token.split('')[1], process.env.JWT_SECRET);
        req.user = verified;
        next();



    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
}

export default verifyToken;