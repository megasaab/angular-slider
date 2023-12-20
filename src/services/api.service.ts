import { Injectable } from '@angular/core';
import {SliderInterface} from '../interfaces/slider.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  mockApiData: SliderInterface[] = [
    {
      id: 1,
      image: '/assets/images/image1.jpg',
      priority: 1,
      url: 'https://unsplash.com/photos/a-couple-of-people-that-are-walking-in-the-dirt-wUyMk7ziLT0'
    },
    {
      id: 2,
      image: '/assets/images/image2.jpg',
      priority: 1,
      url: 'https://unsplash.com/photos/the-dome-of-a-building-with-paintings-on-it-vThvq6uhtsM'
    },
    {
      id: 3,
      image: '/assets/images/image3.jpg',
      priority: 1,
      url: 'https://unsplash.com/photos/a-woman-wearing-a-hat-standing-in-a-canyon-p8Xp5DWQpVc'
    },
    {
      id: 4,
      image: '/assets/images/image4.jpg',
      priority: 3,
      url: 'https://unsplash.com/photos/a-man-in-a-green-jacket-waving-to-someone-rcDPLo35GK4'
    }
  ]
  constructor() { }
}
