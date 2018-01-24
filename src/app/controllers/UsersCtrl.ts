import { NextFunction, Request, Response, Router } from 'express';
import { apiErrorHandler } from '../../handlers/errorHandler';
import UsersRepo from '../repositories/UsersRepo';
// import { IUserModel, UserModel, rightAccess } from '../models/userModel';
import { IUserModel, User } from '../models/user';

import TokenAuth from '../auth/tokenAuth';
import userValidator from '../validators/userValidator';
import accessService from '../auth/accessService';

import emailService from '../auth/emailService';

import { access } from 'fs';
import { userSchema } from '../schemas/user';

export default class UsersRoutes {

    constructor() { }

    public signup(req: Request, res: Response, next: NextFunction) {
        // console.log(req['decoded']['access']);
        // Check the request is valid or not

        let obj = userValidator.signupUserValidator(req);
        if (obj) {
            return res.json(obj)
        }

        // Check for request come from super admin , admin or user
        let accessFlag = accessService.checkAccessByRoleNum(req['decoded']['access'])

        // console.log(accessFlag);

        if (accessFlag) {
            UsersRepo.getUser(req.body.name).then(function (result) {
                if (!result) {

                    console.log(result);

                    // Creating a new user from model 

                    let saveuser: IUserModel = new User({ uid: req.body.uid, name: req.body.name, pass: req.body.pass, mail: req.body.mail, access: req.body.access, status: req.body.status });
                    saveuser.generateHash(req.body.pass);

                    if (saveuser.access <= accessFlag) {
                        let role = accessService.getRoleName(saveuser.access);
                        return res.json({
                            status: false,
                            message: "You're not authorized to create " + role + " User"
                        })
                    }

                    UsersRepo.signup(saveuser)
                        .then((result: any) => {
                            // redirect the user to login after successfully creating this from frontend

                            // calling the message Service here
                            emailService.sendEmailForSignup(saveuser.name, req.body.pass, saveuser.mail);

                            res.json({
                                success: true,
                                message: 'User Successfully Created',
                            });

                            // also write here the code for sending a mail to user's mail id for successfully registering
                        })
                        .catch((err) => {
                            res.json({
                                success: false,
                                message: 'User Creation Failed',
                                error: err.message
                            });
                        });
                } else {
                    res.json({
                        status: false,
                        message: 'duplicate user found'
                    })
                }
            })


        } else {
            return res.json({
                success: false,
                message: "You're Not Authorized to Create a New User"
            })
        }
    }

    public login(req: Request, res: Response, next: NextFunction) {
        let obj = userValidator.loginUserValidator(req);
        if (obj) {
            return res.json(obj);
        }
        let name = req.body.name;
        let pass = req.body.pass;

        UsersRepo.login(name)
            .then((result: IUserModel) => {
                if (!result) {
                    return res.json({
                        "message": "No user found by this name in Database"
                    });
                }
                let successflag = result.validPassword(pass);
                if (!successflag) {
                    return res.json({
                        success: false,
                        message: "invalid password"
                    });
                }
                else if (result.status === 0) {
                    return res.json({
                        success: false,
                        message: "You're account is disable, Please Contact your ADMIN"
                    })
                }
                else {
                    const payload = { uid: result.uid, access: result.access }
                    var token = TokenAuth.tokenGenerator(payload);
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Promise Database Fetching Error',
                    status: res.status,
                    err: err
                });
            })
    }

    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        // console.log(req['decoded']);
        // console.log(rightAccess.SUPERADMIN);
        // const access: [Number] = [rightAccess.SUPERADMIN];

        UsersRepo.getAllUsers()
            .then((result: any) => {
                res.json({
                    success: true,
                    message: 'All Users Success',
                    status: res.status,
                    result: result
                })
            })
            .catch((err) => {
                // console.log('failed')
                res.json({
                    success: false,
                    status: res.status,
                    message: 'Unable to fetch all users'
                })
            })
    }

    public forgotPassword(req: Request, res: Response, next: NextFunction) {
        let obj = userValidator.forgotUserValidator(req);
        if (obj) {
            return res.json(obj);
        }

        let name = req.body.name;

        console.log('this is req.body.name', req.body.name);

        UsersRepo.forgotPassword(name)
            .then((result: any) => {
                if (!result) {
                    return res.json({
                        success: false,
                        message: "No user found by this name in Database"
                    });
                }

                console.log(result.dataValues);
                // res.json(result[0]);
                let email = result.dataValues.mail;
                let token = TokenAuth.tokenGeneratorforReset({});

                emailService.sendEmailForReset(email, token);

                res.json({
                    success: true,
                    message: "Check Your Registered Mail for Password Reset Link"
                })
            })
            .catch((err) => {
                console.log(err);
                return res.json(err);
            })
    }

    // public reset(req:Request, res:Response, next:NextFunction){
    //     // console.log(req.query);aa
    //     // console.log(req.params.id);
    //     let token = req.params.id;
    //     if (token) {
    //         jsonwebtoken.verify(token, secret, function (error, decoded) {
    //             if (error) {
    //                 return res.json({
    //                     success: false,
    //                     message: 'Failed to Authenticate token'+' Token Expired!'
    //                 })
    //             } else {
    //                 req.decoded = decoded;
    //                 // console.log('this is from the decoded request',req.decoded);
    //                 // next();
    //             }
    //         })
    //     } else {
    //         return res.send({
    //             success: false,
    //             message: "You're Not Authenticated to use this route"
    //         })

    //     }
    // }
}
