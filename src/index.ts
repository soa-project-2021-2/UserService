import { NextFunction, Request, Response } from 'express';
import usersRoute from './routes/usersRoute';
import { Kafka, logLevel, Partitioners } from 'kafkajs';
const eurekaHelper = require('./eureka.helper');

const express = require('express')
const app = express()
const port = 3000
eurekaHelper.registerWithEureka('user-service', port);
try {
    const kafka = new Kafka({
        brokers: [`localhost:9092`],
        clientId: 'userService',
    })

    const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
    producer.connect()

    app.use((req: Request, res: Response, next: NextFunction) => {
        req.producer = producer;
        return next();
    })
} catch (error) {
    console.log("kafka não conectado")
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(usersRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})