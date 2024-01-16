import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRequest, IToken } from 'src/interfaces/AuthRequest.js';
import { IAdminUsersDocument } from 'src/interfaces/model/adminType.js';
import AdminsModel from 'src/db/models/AdminModels.js';

export default async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        let token;
        const cookieToken = req.cookies['user'];
        const headerToken = req.headers.authorization;

        if (headerToken) {
            token = headerToken.split(" ")[1];
        } else if (cookieToken) {
            token = cookieToken;
        } else {
            return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });
        }

        if (!token) {
            return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });
        }

        const user = jwt.verify(token, process.env.JWTKEY || "123") as JwtPayload | IToken;
        const userInfo: IAdminUsersDocument | null = await AdminsModel.findOne({ "_id": user!.id }, { pass: 0 });
        if (!userInfo) {
            return res.status(401).send({ "error": "You Are Not Authorized", "auth": false });
        }

        req.authUser = userInfo;
        next();

    } catch (error) {
        console.log({
            "Error": "Unauthorized User Request",
            "message": error,
            "status": "Jwt Error",
        });
        return res.status(401).send({ "error": "You Are Not Authorized", "auth": false, "message": error!.toString(), });
    }
}