import { rightAccess } from '../models/userModel'
import { reach } from 'joi';

export default class AccessService {

    constructor() { }

    public static checkAccessByRoleNum(access: number): boolean | number {
        switch(access){
            case 1:
            return 1;
            case 2:
            return 2;
            case 3:
            return false;
        }
    }

    public static getRoleName(roleNum:number){
        switch(roleNum){
            case 1:
            return 'SUPERADMIN';
            case 2:
            return 'ADMIN';
            case 3:
            return 'USER';
        }
    }

    public static isSuperAdmin(acc): boolean | number {
        if (1 in acc) {
            return true;
        } else {
            return false;
        }
    }

    public static isAdmin(acc): boolean | number {
        if (2 in acc) {
            return true;
        } else {
            return false;
        }
    }

    // private static isUser(acc): boolean | Number {
    // }
}