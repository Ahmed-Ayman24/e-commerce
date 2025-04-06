import { FormsModule } from '@angular/forms';
import { BrandsService } from './../../../core/services/brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';
import { IBrands } from '../../../shared/interfaces/ibrands';
import { SearchBrandsPipe } from '../../../shared/pipes/search-brands/search-brands.pipe';

@Component({
  selector: 'app-brands',
  imports: [FormsModule, SearchBrandsPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  searchBrands: string = '';
  brands: IBrands[] = [];
  specificBrand = {} as IBrands;
  isClicked: boolean = false;

  ngOnInit(): void {
    this.getBrandsData();
  }

  getBrandsData(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        console.log(this.brands)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSpecificBrandData(id: string): void {
    this.brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.specificBrand = res.data;
        this.isClicked = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModal(): void {
    this.isClicked = false;
  }
}
