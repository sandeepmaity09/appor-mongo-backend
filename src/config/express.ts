import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";
import * as path from "path";
import * as fs from "fs";
import { WriteStream } from "fs";
import { connection } from './dbconfig';

import Routes from "../app/router/routes";
import { jsonErrorHandler } from "../handlers/errorHandler"

export default class Server {

    constructor(app: Application) {
        this.config(app);
        var routes: Routes = new Routes(app);
    }

    public config(app: Application): void {
        const accessLogStream: WriteStream = fs.createWriteStream(path.join(__dirname, "./logs/access.log"), { flags: "a" });
        app.use(morgan("combined", { stream: accessLogStream }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(helmet());
        // app.use(morgan('dev'))
        app.use(cors());
        app.use(jsonErrorHandler);
        connection.then(() => {
            console.log('Connection has been established successfully.');
        }).catch((err) => {
            console.log('Unable to connect to the database:', err);
        })
        // this hides the error and log the error so not use this in develpment mode
        // app.use(unCoughtErrorHandler);  
    }
}
