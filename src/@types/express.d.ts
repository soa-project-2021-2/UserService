import { kafka } from 'kafkajs';

declare module 'express-serve-static-core' {

    interface Request {
        producer?: any
    }
}