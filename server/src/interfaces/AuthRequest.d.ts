import { Request } from "express";
import { IUsersDocument } from "./model/usersTypes.ts";
import { IAdminUsers } from "./model/adminType.js";

export interface IToken {
    id: string,
    mobile?: string | number,
    email?: string,
    date: Date,
};

export interface AuthRequest extends Request {
    authUser?: IUsersDocument | IAdminUsers;
}