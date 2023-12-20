import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {SpinnerComponent} from '../shared/spinner/spinner.component';
import {SessionService} from '../services/session.service';
import {CarouselComponent} from '../shared/carousel/carousel.component';
import {ApiService} from '../services/api.service';
import {Observable, of, Subscription} from 'rxjs';
import {SliderInterface} from '../interfaces/slider.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SpinnerComponent,
    CarouselComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'angular-slider';
  public items: SliderInterface[] = [];
  public intervalTime = 5000;
  private timeout: any
  private readonly subscription = new Subscription();

  constructor(
    private sessionService: SessionService,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.sessionService.showLoading();
    this.timeout = setTimeout(() => {
      this.fetchData()
        .subscribe({
          next: (sliderData: SliderInterface[]) => {
            this.items = sliderData;
          },
          error: () => {
            console.error('error while fetching data!!!');
          },
          complete: () => {
            this.sessionService.hideLoading();
          }
        });
    }, 4000)
  }

  fetchData(): Observable<SliderInterface[]> {
    return of(this.apiService.mockApiData);
  }

  setItemsCount(settings: {itemsCount: number}) {
    this.items = this.items.slice(0, settings.itemsCount)
    console.log(settings)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearTimeout(this.timeout);
  }
}
