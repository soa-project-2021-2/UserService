import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


const usersRoute = Router();

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    await req.producer.send({
        topic: 'user-topic',
        messages: [
            { value: newUser.email },
        ],
    })
    res.status(StatusCodes.CREATED).send(newUser);

});



export default usersRoute;