import { Action } from '@ngrx/store';
import { Product } from '../../Shop/Models/Product.model';
import { Update as UpdateModel } from '../../Shop/Models/Update.model';
import { Load as LoadModel } from '../../Shop/Models/Load.model';

export enum ActionTypes {
	LOAD = '[PRODUCTS] Load',
	REJECTED = '[PRODUCTS] Rejected', 
    READY = '[PRODUCTS] Ready',
    UPDATE = '[PRODUCTS] Update',
    VIEW = '[PRODUCTS] View',
    REFRESH = '[PRODUCTS] Refresh'
}

export class Load implements Action {
	readonly type = ActionTypes.LOAD;

	constructor(public payload: {
        load: LoadModel
    }){}
}

export class Rejected implements Action {
    readonly type = ActionTypes.REJECTED;

    constructor(){}
}

export class Ready implements Action {
    readonly type = ActionTypes.READY;

    constructor(public payload: {
        products: Array<Product>,
    }){}
}

export class Update implements Action {
    readonly type = ActionTypes.UPDATE;

    constructor(public payload: {
		update: UpdateModel
    }){}
}

export class View implements Action {
    readonly type = ActionTypes.VIEW;

    constructor(public payload: {
		mode: string
    }){}
}

export class Refresh implements Action {
    readonly type = ActionTypes.REFRESH;

    constructor(){}
}

export type Actions = Load | Rejected |  Ready |  Update | View | Refresh;
					