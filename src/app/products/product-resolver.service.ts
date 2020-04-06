import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved> {

	constructor(private productService: ProductService) {

	}

	resolve(
		route: ActivatedRouteSnapshot, state: RouterStateSnapshot
	) : Observable<ProductResolved> {
		const id = route.paramMap.get('id');
		// Checking if the id in route parameter is a number or not.
		if (isNaN(+id)) {
			const message = `Product id was not a number: ${id}`;
			console.error(message);
			return of({product: null, error: message});
		}

		// Returning the observable of product with error handling.
		return this.productService.getProduct(+id)
			.pipe(
				map(product => ({product: product})),
				catchError(error => {
					const message = `Retrieval error: ${error}`;
					console.log(message);
					return of({product: null, error: message})
				})
			);
	}
}