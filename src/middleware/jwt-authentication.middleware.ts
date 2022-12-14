import { NextFunction, Request, Response } from "express";
import JWT from 'jsonwebtoken';
import ForbiddenError from "../models/errors/forbidden.error.model";


async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de authenticação invalida');
        }

        try {
            const tokenPayload = JWT.verify(token, 'my_secret_key');


            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                throw new ForbiddenError("token invalido");
            }

            const user = {
                uuid: tokenPayload.sub,
                name: tokenPayload.name
            };
            req.user = user;
            next();

        } catch (error) {
            throw new ForbiddenError("token invalido");
        }

    } catch (error) {
        next(error);
    }

}

export default jwtAuthenticationMiddleware;