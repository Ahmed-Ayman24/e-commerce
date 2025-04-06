import { CurrencyPipe } from '@angular/common';
import { ICart } from './../../../shared/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly alertService = inject(AlertService);

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        console.log(this.cartDetails);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async removeItem(id: string): Promise<void> {
    const confirmed = await this.alertService.confirmDeletion('Do you want to delete this item?');

    if (confirmed) {
      this.cartService.removeSpecificCartItem(id).subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
          this.cartService.cartNum.set(res.numOfCartItems)
          this.alertService.showSuccess('Item has been deleted successfully!');
        },
        error: (err) => {
          console.error(err);
          this.alertService.showError('Failed to delete the item. Please try again.');
        }
      });
      }
  }

  updateCount(id: string, count: number): void {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
        if (res.status === 'success') {
          this.toastrService.success('Done', 'Fresh Cart');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  async clearItems(): Promise<void> {
    const confirmed = await this.alertService.confirmDeletion('Are you sure you want to clear the cart?');
  
    if (confirmed) {
      this.cartService.clearUserCart().subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.getCartData();
            this.alertService.showSuccess('Cart has been cleared successfully!');
            this.cartService.cartNum.set(0);
          }
        },
        error: (err) => {
          console.error(err);
          this.alertService.showError('Failed to clear the cart. Please try again.');
        }
      });
    }
  }
  
}
