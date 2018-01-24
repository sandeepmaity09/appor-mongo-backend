import * as mongoose from 'mongoose';
import { User, IUserModel } from '../app/models/user';

// const dbUrl: string = "mysql://root:root@localhost:3306/rohit";
const dbName = process.env.DATABASE_NAME;
// const dbUserName = process.env.DATABASE_USER;
// const dbUserPassword = process.env.DATABASE_PASSWORD;
const dbPort = process.env.DATABASE_PORT;
const dbHost = process.env.DATABASE_HOST;

const dbUrl: string = `mongodb://${dbHost}:${dbPort}/${dbName}`;
// const options = { benchmark: true };
// export const sequelize: Sequelize = new ORM(dbUrl, options);

export let connection = mongoose.connect(dbUrl);

User.findOne({ "name": "superadmin" }).then(function (result) {
    if (!result) {
        let user = new User({ uid: 1, name: 'superadmin', mail: 'superadmin@ongraph.com', access: 1, status: 1 });
        user.generateHash('superadmin');
        user.save().then(function () {
            console.log('saved successfully');
        });
    }
})


// connection.then(()=>{
//     console.log('Connection has been established successfully.');
// }).catch((err)=>{
//     console.log('Unable to connect to the database:',err);
// })

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
// }).catch(err => {
//     console.error('Unable to connect to the database:', err);
// });