import {Component} from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  standalone: true,
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(private sessionService: SessionService) {}

  public isLoading(): boolean {
    return this.sessionService.isLoading();
  }
}
