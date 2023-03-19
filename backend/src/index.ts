import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as StoreController from "./api/StoreController";
import { AppDataSource } from '../data.source'
import { Store } from "./entity/Store";

const PORT = 3000;

async function startup() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
    })

    app.post('/store', StoreController.save);
    app.get('/getAll', StoreController.getAll);

    app.listen(PORT, ()=> {
        console.log("App running on port" + PORT);
    });
}

startup();