import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../Repositories/user.repository";
import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import jwtAuthenticationMiddleware from "../middleware/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findByNameAndPassword(req.body.email, req.body.password);;
        if (!user) {
            throw new ForbiddenError('Usuario não informado!');
        }
        const jwtPayload = { name: user.name };
        const jwtOptions = { subject: String(user?.user_id), expiresIn: 600000 };
        const secretKey = 'my_secret_key'
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }



})


authorizationRoute.post('/token', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user)
    res.status(StatusCodes.OK).send(req.user);
})

export default authorizationRoute;