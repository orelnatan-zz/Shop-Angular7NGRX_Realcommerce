import { Product } from "../../Shop/Models/Product.model";

export interface ProductsState {
	products: Array<Product>,
    inProgress: boolean,
    failure: boolean,
    viewMode: string,
    typeShown: string,
    sort: string,
    filter: string,
}