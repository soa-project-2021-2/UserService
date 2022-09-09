"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
;
// import userRepository from '../repositories/user.repository';
const usersRoute = (0, express_1.Router)();
// usersRoute.get('/users',async (req: Request, res: Response, next: NextFunction) => {
//     //const users = await userRepository.findAllUsers();
//     res.status(StatusCodes.OK).send(users);
// })
// usersRoute.get('/users/:uuid', async (req: Request<{ uuid : string}>, res: Response, next: NextFunction) => {
//     try {
//         const uuid = req.params.uuid;
//         //const user = await userRepository.findById(uuid);
//         res.status(StatusCodes.OK).send(user);
//     } catch (error) {
//         next(error);
//     }
// });
usersRoute.post('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    //const uuid = await userRepository.create(newUser);
    res.status(http_status_codes_1.StatusCodes.CREATED).send(newUser);
}));
// usersRoute.put('/users/:uuid', async (req: Request<{ uuid : string}>, res: Response, next: NextFunction) => {
//     const uuid = req.params.uuid;
//     const modifiedUser = req.body;
//     modifiedUser.uuid = uuid;
//     //await userRepository.update(modifiedUser);
//     res.status(StatusCodes.OK).send({ uuid });
// });
// usersRoute.delete('/users/:uuid', async (req: Request<{ uuid : string}>, res: Response, next: NextFunction) => {
//     const uuid = req.params.uuid;
//     //await userRepository.remove(uuid);
//     res.sendStatus(StatusCodes.OK);
// })
exports.default = usersRoute;
