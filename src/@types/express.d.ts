import { kafka } from 'kafkajs';
import { User } from '../models/user.model';

declare module 'express-serve-static-core' {

    interface Request {
        producer?: any,
        user?: User


    }
}