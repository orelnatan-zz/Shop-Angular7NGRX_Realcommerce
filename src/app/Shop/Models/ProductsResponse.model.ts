import { Product } from "./Product.model";

export interface ProductsResponse {
    results: Array<Product>,
    totalResults: string
}