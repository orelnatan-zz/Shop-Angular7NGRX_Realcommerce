import { Actions, ActionTypes } from './Actions';
import { ProductsState } from './ProductsState.model';

const initialState: ProductsState = {
	products: [],
    inProgress: false,
    failure: false,
    viewMode: "grid",
    typeShown: null,
    sort: null,
    filter: null,
}

export function ProductsReducer(state = initialState, action: Actions): ProductsState {    
    switch(action.type){
        case ActionTypes.LOAD: {
            return {
                ... state,
                inProgress: true,
                typeShown: action.payload.load.type,
                sort: action.payload.load.direction,
                filter: action.payload.load.textFilter, 
            };
        };
        case ActionTypes.READY: {
            return {
                ... state,
                inProgress: false,
                failure: false,
                products: action.payload.products
            };
        };
        case ActionTypes.REJECTED: {
            return {
                ... state,
                failure: true
            };
        };
        case ActionTypes.UPDATE: {
            return {
                ... state,
                inProgress: true
            };
        };
        case ActionTypes.VIEW: {
            return {
                ... state,
                viewMode: action.payload.mode
            };
        };
        case ActionTypes.REFRESH: {
            return {
                ... state,
                products: [],
            };
        };
        default: {
            return {
                ... state
            };
        };
    }
}
