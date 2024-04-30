import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  showSearch: boolean = false; // Initially hide the input field
  searchTerm: string = '';

  constructor() {}

  toggleSearch() {
    if(this.showSearch) 
      this.search();
    this.showSearch = !this.showSearch; // Toggle the visibility of the input field
  }

  search() {
    // Implement your search logic here
    console.log('Searching for:', this.searchTerm);
  }
}