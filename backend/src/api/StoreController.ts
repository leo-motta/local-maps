import { Request, Response } from "express";
import { Store } from '../entity/Store'
import { AppDataSource } from '../../data.source'

export async function save(request: Request, response: Response) {
    const storeRepository = AppDataSource.getRepository(Store);

    const savedStore = await storeRepository.save(request.body);

    return response.status(200).json(savedStore);
}

export async function getAll(request: Request, response: Response) {
    const storeRepository = AppDataSource.getRepository(Store);

    const allStores = await storeRepository.find();
    

    return response.json(allStores);
}