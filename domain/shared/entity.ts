import { v4 as uuid } from 'uuid';

export class Entity{
    get id(): string {
        return this._id;
    }
    private _id : string;

    constructor() {
        this._id = uuid();
    }
}