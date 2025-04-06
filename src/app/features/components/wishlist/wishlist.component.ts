import { CurrencyPipe } from '@angular/common';
import { Iwishlist } from '../../../shared/interfaces/iwishlist';
import { WishlistService } from './../../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly alertService = inject(AlertService)


  wishlistData: Iwishlist = {} as Iwishlist;

  ngOnInit(): void {
    this.getUserWishlist();
  }

  getUserWishlist(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistData = res;
        console.log(this.wishlistData);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async removeProductFromWishlist(id: string): Promise<void> {
    const confirmed = await this.alertService.confirmDeletion('Are you sure you want to remove this product from your wishlist?');
  
    if (confirmed) {
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this.wishlistData = res;
          this.getUserWishlist();
          console.log(this.wishlistData);
          this.alertService.showSuccess('Product removed from wishlist successfully!');
        },
        error: (err) => {
          console.error(err);
          this.alertService.showError('Failed to remove product from wishlist. Please try again.');
        }
      });
    }
  }
}