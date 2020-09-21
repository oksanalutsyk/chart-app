import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  merge,
  Observable,
  of,
  range,
  timer,
} from 'rxjs';
import { concatMap, delay, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private isLoadingSubject = new BehaviorSubject<any>([0,0]);
  isLoadingQuery$ = this.isLoadingSubject.asObservable();

  constructor() {
    const timer$ = timer(10000);
    const first = interval(1000).pipe(takeUntil(timer$));

    // const second = interval(2000).pipe(takeUntil(timer$));

    const second = Observable.create((observer) => {
      let value = 0;
      const interval = setInterval(() => {
        if(value){
          observer.next(Math.floor(Math.random() * Math.floor(value)));
        }
        value++;
      }, 2000);
      
      return () => clearInterval(interval);
    });


    const example = combineLatest(first, second).pipe(takeUntil(timer$)).subscribe(
      ([timerValOne, timerValTwo]) => {
        console.log([timerValOne, timerValTwo]);
        this.changeIsLoadingQueryParameter([timerValOne, timerValTwo]);
        return [timerValOne, timerValTwo];
      }
    );
    
  }

  changeIsLoadingQueryParameter(query: any) {
    this.isLoadingSubject.next(query);
  }
}
