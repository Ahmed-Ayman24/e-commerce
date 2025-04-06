import { ICategory } from './../../../shared/interfaces/icategory';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  imports: [CarouselModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    autoplay: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl:true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  categories: WritableSignal<ICategory[]> = signal([]);

  ngOnInit(): void {
    this.getCategoriesData();
  }
 

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
}
