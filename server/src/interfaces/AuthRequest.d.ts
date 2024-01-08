import { Request } from "express";
import { IUsersDocument } from "./model/usersTypes.ts";

export interface IToken {
    id: string,
    email: string,
    date: Date,
};

export interface AuthRequest extends Request {
    authUser?: IUsersDocument;
}