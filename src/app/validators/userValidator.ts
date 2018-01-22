import { Request } from 'express';

export default class userValidator {
    constructor() { }

    public static signupUserValidator(req: Request): boolean | object {
        if (/*!req.body.uid ||*/ !req.body.name || !req.body.mail ) {
            // if (!req.body.uid) {
            //     return {
            //         success: false,
            //         message: 'Uid Not Provided'
            //     }
            // }
            // else 
            if (!req.body.name) {
                return {
                    success: false,
                    message: 'Username Not Provided'
                }
            }
            else if (!req.body.pass) {
                return {
                    success: false,
                    message: 'Password Not Provided'
                }
            }
            else if (!req.body.mail) {
                return {
                    success: false,
                    message: 'Email Not Provided'
                }
            }
            else {
                return false;
            }
        }
    }

    public static loginUserValidator(req: Request): boolean | object {
        console.log(req.body.name);
        console.log(req.body.pass);

        if (!req.body.name || !req.body.pass) {
            if (!req.body.name) {
                return {
                    success: false,
                    message: 'Username Not Provided'
                }
            }
            else if (!req.body.pass) {
                return {
                    success: false,
                    message: 'Password Not Provided'
                }
            } else {
                return false;
            }
        }
    }

    public static forgotUserValidator(req: Request): boolean | object {
        if (!req.body.name) {
            return {
                success: false,
                message: 'Username Not Provided'
            }
        }
    }
}