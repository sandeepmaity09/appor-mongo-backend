import * as ORM from "sequelize";

import { Sequelize, LoggingOptions } from "sequelize";

// const dbUrl: string = "mysql://root:root@localhost:3306/rohit";
const dbName = process.env.DATABASE_NAME;
const dbUserName = process.env.DATABASE_USER;
const dbUserPassword = process.env.DATABASE_PASSWORD;
const dbPort = process.env.DATABASE_PORT;
const dbHost = process.env.DATABASE_HOST;

const dbUrl: string = `mysql://${dbUserName}:${dbUserPassword}@${dbHost}:${dbPort}/${dbName}`;
const options: LoggingOptions = { benchmark: true, logging: console.log };
export const sequelize: Sequelize = new ORM(dbUrl, options);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
