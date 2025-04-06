import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IaddProductToWishlist } from '../../../shared/interfaces/iwishlist';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);



  productId: any;
  productDetails: IProduct = {} as IProduct;
  addedToWishlist: boolean = false;
  wishlistData: IaddProductToWishlist = {} as IaddProductToWishlist;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');
        this.productsService.getSpecificProducts(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
        this.cartService.cartNum.set(res.numOfCartItems);        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        this.wishlistData = res;
        if (this.wishlistData.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
        this.addedToWishlist = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeProductFromWishlist(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this.wishlistData = res;
        this.wishlistService.getLoggedUserWishlist()
        console.log(this.wishlistData);
        this.addedToWishlist = false
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}