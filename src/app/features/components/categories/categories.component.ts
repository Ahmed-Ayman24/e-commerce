import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../shared/interfaces/icategory';
import { SearchCategoriesPipe } from '../../../shared/pipes/search-categories/search-categories.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [SearchCategoriesPipe, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  searchCategories: string = '';
  categories: WritableSignal<ICategory[]> = signal([]);
  subCategories: WritableSignal<ICategory[]> = signal([]);
  isClicked: boolean = false;

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

  getAllSubcategoryOnCategory(id: string): void {
    this.categoriesService.getAllSubcategoryOnCategory(id).subscribe({
      next: (res) => {
        this.subCategories.set(res.data);
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
