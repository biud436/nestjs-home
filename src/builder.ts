import { getConnection } from "typeorm";
import {EventEmitter} from "events";
import * as express from "express";
import {Request, Response} from "express";
import {createConnection, Connection} from "typeorm";
import {User} from "./entity/User";
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

export class QueryBuilderImpl extends EventEmitter {
    constructor() {
        super();
    }

    initWithEvents() {
    }

    public onCreate(app: NestExpressApplication) {
        
        app.use(express.json());

        createConnection().then(connection => {
            const userRepository = connection.getRepository(User);
        })

    }


}