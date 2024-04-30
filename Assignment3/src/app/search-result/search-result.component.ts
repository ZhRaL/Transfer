import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommunityMashupService } from '../services/communitymashup/communitymashup.service';
import { Item } from '../services/communitymashup/model/item.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  
  searchString: string='';
  newSearchString: string='';
  
  results: Array<Item> = [];

  constructor(private mashupService: CommunityMashupService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchString = params['searchString'];
      if(this.mashupService.isInitialized) 
        this.Init();
      else {
        this.mashupService.getInitializedEvent().subscribe(() => {
          this.Init();
        });
      }
    });
  }

  private Init(){
    console.log("I was called");
    this.results = [];
    this.newSearchString=this.searchString;
    let temp = this.mashupService.getItems();
    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      if(element.getItemName().includes(this.searchString)) {
        this.results.push(element);
        console.log("Found: "+element.getItemName());
      }

    }

  }

  search() {
    console.log("Size: "+this.newSearchString);
    this.router.navigate(
      ['/search/'+this.newSearchString],
    );
  }

  selectItem(id: string){
    this.router.navigate(
      ['/item/'+id],
    );
  }
  
}
