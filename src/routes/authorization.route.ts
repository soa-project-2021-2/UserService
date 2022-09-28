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
        const jwtOptions = { subject: String(user?.user_id), expiresIn: 60000 };
        const secretKey = 'my_secret_key'
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        res.sendStatus(401)
    }



})


authorizationRoute.post('/token', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findById(req.user.uuid)
        if (user.name === req.user.name) {
            res.status(StatusCodes.OK).send(req.user);
        }
        else {
            res.status(StatusCodes.UNAUTHORIZED).send('token Invalido')
        }

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send('token Invalido')
    }

})

export default authorizationRoute;