import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../Repositories/user.repository';


const usersRoute = Router();


usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
})

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send(user);
    } catch (error) {
        next(error);

    }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = req.body
        console.log(newUser)
        const user = await userRepository.create(newUser);
        // await req.producer.send({
        //     topic: 'user-topic',
        //     messages: [
        //         { value: JSON.stringify(user) },
        //     ],
        // })
        res.status(StatusCodes.CREATED).send(user);

    } catch (error: any) {
        if (error.column) {
            res.status(StatusCodes.BAD_REQUEST).send(`Campos invalido: ${error.column} `)
        }
        else {
            res.status(StatusCodes.FORBIDDEN).send('usuario ja cadastrado')
        }

    }


});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;
        await userRepository.update(modifiedUser);
        res.status(StatusCodes.OK).send({ uuid });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send('erro ao atualizar usuario')
    }

});






export default usersRoute;