import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SliderInterface} from '../../interfaces/slider.interface';
import {BehaviorSubject, Subject, switchMap, takeUntil, timer} from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  standalone: true,
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input()
  items: SliderInterface[] = [];
  @Input()
  intervalTimer: number = 5000;

  @Output()
  applySettingsEmitter = new EventEmitter();

  private destroy$: Subject<void> = new Subject<void>();
  private timer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  translateValue: number = 0;
  currentIndex: number = 0;
  itemWidth: number = 200;

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timer$
      .pipe(
        switchMap(() => timer(0, this.intervalTimer)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.nextSlide();
      });
  }

  nextSlide() {
    this.currentIndex = this.getNextIndex(1);
    this.translateValue = -this.currentIndex * this.itemWidth;
  }

  prevSlide() {
    this.currentIndex = this.getNextIndex(-1);
    this.translateValue = -this.currentIndex * this.itemWidth;
  }

  private getNextIndex(step: number): number {
    const slidesByPriority = this.items.reduce((acc: any, item: SliderInterface) => {
      const priority = item.priority || 1;
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].push(item);
      return acc;
    }, {});

    const priorities = Object.keys(slidesByPriority).map(Number).sort((a, b) => b - a);

    for (const priority of priorities) {
      const slides = slidesByPriority[priority];
      const currentIndex = slides.indexOf(this.items[this.currentIndex]);
      const nextIndex = (currentIndex + step + slides.length) % slides.length;
      if (nextIndex !== currentIndex) {
        const nextSlide = slides[nextIndex];
        return this.items.indexOf(nextSlide);
      }
    }

    return this.currentIndex;
  }

  onApplySettingsClicked(timer: any, itemsCount: any) {
    if (timer) {
      this.destroy$.next();
      this.destroy$.complete()
      this.destroy$ = new Subject<void>();
      this.intervalTimer = timer * 1000;
      this.startTimer();
    }
    if (itemsCount && itemsCount < this.items.length) {
      this.applySettingsEmitter.emit({itemsCount});
      this.translateValue = 0;
      this.currentIndex  = 0;
      this.itemWidth = 200;
    }
  }

  reset() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
