import * as bcrypt from "bcrypt";
import * as drupalHash from "drupal-hash";

export interface IUserModel {
	uid: number;
	name: string;
	pass: string;
	mail: string;
	access: number;

	generateHashPassword(password);
	validPassword(password);
}

export class UserModel implements IUserModel {
	uid: number;
	name: string;
	pass: string;
	mail: string;
	access: number;

	constructor() { }

	public createUser(uid, name, pass) { }

	public generateHashPassword = function (password) {
		// this.pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
		this.pass = drupalHash.hashPassword(password);
	}

	public validPassword = function (password) {
		// return bcrypt.compareSync(password, this.pass);
		return drupalHash.checkPassword(password,this.pass);
	}
}

export enum rightAccess {
	SUPERADMIN = 1,
	ADMIN,
	USER
}

