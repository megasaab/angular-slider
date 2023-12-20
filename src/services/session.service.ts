import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private loading = false;
  constructor() { }


  public showLoading(): void {
    this.loading = true;
  }

  public hideLoading(): void {
    this.loading = false;
  }

  public isLoading(): boolean {
    return this.loading;
  }
}
