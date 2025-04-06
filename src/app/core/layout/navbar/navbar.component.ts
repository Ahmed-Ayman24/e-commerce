import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly myTranslateService = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);



  isLogin = input<boolean>(true);
  countNum:Signal<number> = computed( ()=> this.cartService.cartNum() );

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNum.set(res.numOfCartItems);
      }
    })
   
  }


  async logout(): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'bg-red-500',
        cancelButton: 'bg-main'
      },
    });

    if (result.isConfirmed) {
      this.authService.logoutUser();
    }
  }

  change(lang:string): void {
this.myTranslateService.changeLangTranslate(lang);
  }

  currentLang(lang:string): boolean {
return this.translateService.currentLang === lang
}
}