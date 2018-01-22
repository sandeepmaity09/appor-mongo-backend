import { Application, Request, Response, NextFunction, Router } from "express";
import TokenAuth from '../auth/tokenAuth'

import UserRoutes from "../controllers/UsersCtrl";

export default class Routes {

    usersCtrl = new UserRoutes();

    constructor(app: Application) {

        const baseAPI = process.env.BASE_API;

        const authorizedAPI = process.env.BASE_API + '/res';
        const authenticatedAPI = process.env.BASE_API + '/auth';

        // User Management Routes
        app.route(baseAPI + '/login').post(this.usersCtrl.login);
        app.route(baseAPI + '/forgot').post(this.usersCtrl.forgotPassword);
        app.route(baseAPI + '/reset/:id').get(this.usersCtrl.reset);        
        // app.route(baseAPI+'/reset').post();

        // Using Token Authenticator as a middleware
        app.use(authenticatedAPI, TokenAuth.tokenMatcher);
        app.use(authorizedAPI, TokenAuth.tokenMatcher);

        // Access Control : Only for Super Admin or Admin
        app.route(authenticatedAPI + '/signup').post(this.usersCtrl.signup);

        // If token authenticated then only provides this routes access
        app.route(authorizedAPI + '/allusers').get(this.usersCtrl.getAllUsers);
    }
}