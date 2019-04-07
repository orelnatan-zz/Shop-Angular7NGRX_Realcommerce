import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './ProductsState.model';
import { Product } from '../../Shop/Models/Product.model';

export const getProductsState = createFeatureSelector<ProductsState>('Products');

export const getAllProducts = createSelector(
    getProductsState,
    (state: ProductsState): Array<Product> => {
        return state.products;
    }
);

export const getProductsInProgress = createSelector(
    getProductsState,
    (state: ProductsState): boolean => {
        return state.inProgress;
    }
);

export const getProductsFailure = createSelector(
    getProductsState,
    (state: ProductsState): boolean => {
        return state.failure;
    }
);

export const getProductsViewMode = createSelector(
    getProductsState,
    (state: ProductsState): string => {
        return state.viewMode;
    }
);

export const getTypeShown = createSelector(
    getProductsState,
    (state: ProductsState): string => {
        return state.typeShown;
    }
);

export const getSortDirection = createSelector(
    getProductsState,
    (state: ProductsState): string => {
        return state.sort;
    }
);

export const getTextFilter = createSelector(
    getProductsState,
    (state: ProductsState): string => {
        return state.filter;
    }
);
