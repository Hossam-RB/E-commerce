import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[] ,tearm:any): any[] {
    return products.filter( (item)=>item.title.toLowerCase().includes(tearm.toLowerCase()) );
  }

}
