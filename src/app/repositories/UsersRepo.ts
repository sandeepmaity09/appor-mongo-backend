import { User } from '../models/user';

class UsersRepo {
    constructor() {}

    login(name){
        return User.findOne({'name':name});
    }

    signup(props:any){
        // let obj:any = User.save(props);
        return props.save();
    }

    getUser(name){
        return User.findOne({'name':name});
    }

    getAllUsers(){
        // return User.findAll({attributes:['name','pass']});
        return User.find();
        
    }
    forgotPassword(name){
        return User.findOne({where:{'name':name}});
    }
}

export default new UsersRepo();