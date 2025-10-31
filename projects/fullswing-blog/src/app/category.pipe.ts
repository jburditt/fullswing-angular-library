import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    return value == "CSharp" ? "C#" : value;
  }
}
