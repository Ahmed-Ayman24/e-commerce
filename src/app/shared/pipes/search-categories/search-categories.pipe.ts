import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategories'
})
export class SearchCategoriesPipe implements PipeTransform {

  transform(myArray:any[], text:string): any[] {
    return myArray.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
  }

}
