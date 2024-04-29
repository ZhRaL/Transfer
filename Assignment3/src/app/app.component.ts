import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'communitymirrorapp';

  constructor(private router : Router) { }

  selectHistory(){
    this.router.navigate(
      ['/history'],
    );
  }
}

