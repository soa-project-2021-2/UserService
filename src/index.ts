import { NextFunction, Request, Response } from 'express';
import usersRoute from './routes/usersRoute';
import { Kafka, logLevel, Partitioners, SASLOptions } from 'kafkajs';
const eurekaHelper = require('./eurekaHelper');
import db from './routes/db';
import authorizationRoute from './routes/authorization.route';

const port = 8800
const express = require('express')
const app = express({ port: port })

async function run() {
    db.connect()
    eurekaHelper.registerWithEureka('user-service', port);

    const sasl: SASLOptions = {
        username: '6D22ZK3ORK2HKWWP',
        password: 'bO2G1UCwUdBfS6j/mhg3ioXCFmqm4F3ej/A2evpvJeyk7nT3O/yTH+G1C4HtLBye',
        mechanism: 'plain',
    };
    const kafka = new Kafka({
        clientId: 'user-producer',
        brokers: ['pkc-56d1g.eastus.azure.confluent.cloud:9092'],
        ssl: true,
        logLevel: 2,
        sasl: sasl
    })

    const producer = kafka.producer();


    app.use((req: Request, res: Response, next: NextFunction) => {
        req.producer = producer;
        return next();
    })

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(authorizationRoute)
    app.use(usersRoute);
    await producer.connect()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

run()


