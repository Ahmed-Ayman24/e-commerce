import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart/cart.service';
import { SearchWordsPipe } from '../../../shared/pipes/search-words/search-words.pipe';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IaddProductToWishlist } from '../../../shared/interfaces/iwishlist';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, SearchWordsPipe, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);


  searchProducts: string = '';
  products: WritableSignal<IProduct[]> = signal([]);
  addedToWishlist: {[key: string]: boolean} = {};
  wishlistData: IaddProductToWishlist = {} as IaddProductToWishlist;

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
        this.addedToWishlist[id] = true;
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
        this.addedToWishlist[id] = false
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isInWishlist(id: string): boolean {
    return this.addedToWishlist[id] === true;
  }  
}