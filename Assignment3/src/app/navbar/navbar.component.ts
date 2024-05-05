import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})


export class NavbarComponent implements OnInit {

  isSticky: boolean = true;
  logoPath: String = environment.logoPath;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  selectInfo(){
    this.router.navigate(
      ['/info'],
    );
  }
  selectHistory(){
    this.router.navigate(
      ['/history'],
    );
  }

  home(){
    this.router.navigate(
      ['/home'],
    );
  }

}
