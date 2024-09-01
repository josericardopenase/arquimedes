import { v4 as uuid } from 'uuid';

export interface Identifiable{
    id() : string
}

export class Entity implements Identifiable{
    id(): string {
        return this._id;
    }
    private _id : string;

    constructor() {
        this._id = uuid();
    }
}