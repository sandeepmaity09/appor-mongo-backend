import { User } from '../../db/dbmodels/User'

class UsersRepo {
    constructor() {}

    login(name){
        return User.findOne({where:{'name':name}});
    }

    signup(props:any){
        let obj:any = User.build(props);
        return obj.save();
    }

    getAllUsers(){
        // return User.findAll({attributes:['name','pass']});
        return User.findAll();
        
    }

    forgotPassword(name){
        return User.findOne({where:{'name':name}});
    }
}

export default new UsersRepo();