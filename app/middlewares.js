const { JWT_SECRET } = require("./constansts");
const jwt = require("jsonwebtoken");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            
            req.user = user;
            console.log(user)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
const authenticateJWTAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, JWT_SECRET, (err, user) => {
            console.log(user)
            if (err) {
                return res.sendStatus(403);
            }
            if (user.role!=="admin"){
                res.sendStatus(401);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports={
    authenticateJWTAdmin,
    authenticateJWT,

}