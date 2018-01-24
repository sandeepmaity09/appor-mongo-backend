import { Document,model } from "mongoose";
import { IUser } from "../interfaces/user";
import { userSchema } from "../schemas/user";

export interface IUserModel extends IUser, Document {
    uid: number;
	name: string;
	pass: string;
	mail: string;
	access: number;
    status: number;
    
    generateHash(password);
    validPassword(password);
}

export let User = model<IUserModel>('User',userSchema);