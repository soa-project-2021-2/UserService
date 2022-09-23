import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../Repositories/user.repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import jwtAuthenticationMiddleware from "../middleware/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findByUsernameAndPassword(req.body.username, req.body.password);;
        if (!user) {
            throw new ForbiddenError('Usuario não informado!');
        }
        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid, expiresIn: 600000 };
        const secretKey = 'my_secret_key'
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }



})


authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})

export default authorizationRoute;