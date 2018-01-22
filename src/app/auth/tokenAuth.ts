import * as jsonwebtoken from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;
// const expire = process.env.JWT_EXPIRE;

export default class TokenAuth {
    constructor() { }
    public static tokenMatcher(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if (token) {
            jsonwebtoken.verify(token, secret, function (error, decoded) {
                if (error) {
                    return res.json({
                        success: false,
                        message: 'Failed to Authenticate token'+' Token Expired!'
                    })
                } else {
                    req.decoded = decoded;
                    // console.log('this is from the decoded request',req.decoded);
                    next();
                }
            })
        } else {
            return res.send({
                success: false,
                message: "You're Not Authenticated to use this route"
            })

        }
    }

    public static tokenGenerator(payload) {
        // console.log(payload);
        return jsonwebtoken.sign(payload, secret, { expiresIn: "24h" });
    }

    public static tokenGeneratorforReset(payload) {
        console.log(payload);
        return jsonwebtoken.sign(payload, secret, { expiresIn: 600 });
    }
}