import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  showSearch: boolean = false; // Initially hide the input field
  searchTerm: string = '';

  constructor(private router : Router) { }

  toggleSearch() {
    if(this.showSearch && this.searchTerm.length>0) 
      this.search();
    this.showSearch = !this.showSearch; // Toggle the visibility of the input field
  }

  search() {

    this.router.navigate(
      ['/search/'+this.searchTerm],
    );
  }
}