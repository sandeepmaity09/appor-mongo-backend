import { Schema } from "mongoose";
import * as drupalHash from "drupal-hash";

export let userSchema: Schema = new Schema({
    uid: Number,
	name: String,
	pass: String,
	mail: String,
	access: Number,
	status: Number
});

userSchema.methods.generateHash = function(pass){
    this.pass = drupalHash.hashPassword(pass);
}

userSchema.methods.validPassword = function(password){
    return drupalHash.checkPassword(password,this.pass);
}

// userSchema.pre('save',this.generateHash)