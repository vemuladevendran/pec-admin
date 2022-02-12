import { Component } from '@angular/core';
import { debounceTime } from 'rxjs';
import { LoaderService } from './services/loader/loader.service';
declare const loadFreshDesk: () => {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  title = 'uv-ng-material-template';
  showLoader = false;
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.status
      .pipe(debounceTime(100))
      .subscribe((val: boolean) => {
        this.showLoader = val;
      });

    window.setTimeout(() => {
      loadFreshDesk();
    }, 3500);
  }
}
