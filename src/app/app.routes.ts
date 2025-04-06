import { loggedGuard } from './core/guards/logged.guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {
        path: '', component: AuthLayoutComponent,
        canActivate: [loggedGuard],
        children: [
            { path: 'login', title: 'Login', loadComponent: () => import('./features/components/login/login.component').then(m => m.LoginComponent) },
            { path: 'register', title: 'Register', loadComponent: () => import('./features/components/register/register.component').then(m => m.RegisterComponent) },
            { path: 'forgot-password', title: 'Forgot Password', loadComponent: () => import('./features/components/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent) }
        ]
    },

    {
        path: '', component: BlankLayoutComponent, children: [
            { path: 'home', title: 'home', loadComponent: () => import('./features/components/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
            { path: 'cart', title: 'cart', loadComponent: () => import('./features/components/cart/cart.component').then(m => m.CartComponent) },
            { path: 'myWishlist', title: 'my wishlist', loadComponent: () => import('./features/components/wishlist/wishlist.component').then(m => m.WishlistComponent) },
            { path: 'categories', title: 'categories', loadComponent: () => import('./features/components/categories/categories.component').then(m => m.CategoriesComponent) },
            { path: 'brands', title: 'brands', loadComponent: () => import('./features/components/brands/brands.component').then(m => m.BrandsComponent) },
            { path: 'products', title: 'products', loadComponent: () => import('./features/components/products/products.component').then(m => m.ProductsComponent) },
            { path: 'products/product-details/:id', title: 'product details', loadComponent: () => import('./features/components/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
            { path: 'checkout/:id', title: 'checkout', loadComponent: () => import('./features/components/checkout/checkout.component').then(m => m.CheckoutComponent) },
            { path: 'allorders', title: 'all orders', loadComponent: () => import('./features/components/allorders/allorders.component').then(m => m.AllordersComponent) },
            { path: '**', title: '404 Not Found', component: NotfoundComponent },
        ]
    },
];