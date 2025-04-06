import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchWords'
})
export class SearchWordsPipe implements PipeTransform {

  transform(myArray:any[], text:string): any[] {
    return myArray.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
  }

}
