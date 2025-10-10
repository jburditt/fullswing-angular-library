import { Injectable } from "@angular/core";
import { Observable, takeWhile } from "rxjs";

@Injectable()
export class UnsubscribeOnDestroy
{
  isActive: boolean = true;

  safe(observable: Observable<any>): Observable<any> {
    return observable.pipe(takeWhile(value => this.isActive));
  }

  ngOnDestroy(): void {
    this.isActive = false;
  }
}
