import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chart-app';
  chart;
  myData;
  private subscription: Subscription;

  constructor(private dataService: DataService) {
    this.subscription = new Subscription();
  }
  ngOnInit() {
    this.addData();

    const isLoading$ = this.dataService.isLoadingQuery$.subscribe(
      (query) => (
        // (this.myData = query.firstQuery),
        // console.log('query', query),
        this.chart.data.datasets[0].data.push(query[0]),
        this.chart.data.datasets[1].data.push(query[1]),
        this.chart.update()
      ),
      (err) => console.log(err)
    );
    this.subscription.add(isLoading$);
  }

  addData() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l'],
        datasets: [
          {
            label: 'First',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
          },
          {
            label: 'Second',
            borderColor: 'green',
            data: [],
          },
          {
            label: 'Third',
            borderColor: 'black',
            data: [1, 5, 7, 3],
          },
        ],
      },
      options: {},
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
