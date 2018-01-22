const dotenv = require("dotenv").config();
import * as express from "express";
import { Application } from "express";
import Server from "./src/config/express";

const app: Application = express();
const server: Server = new Server(app);
const port: number = process.env.HTTP_PORT;

app.listen(port, "localhost", function (err: any) {
    if (err) return err;
    console.info(`Server running on : http://localhost:${port}`);
});

process.on('uncaughtException', (err) => {
    console.log(err);
});