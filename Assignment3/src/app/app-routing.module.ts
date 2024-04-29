import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ItemComponent } from './item/item.component';
import { HistoryComponent } from './history/history.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: 'item/:id', component: ItemComponent},
  { path: 'history', component: HistoryComponent },
  { path: 'info', component: InfoComponent },
  { path: '', redirectTo: '/item/a_142', pathMatch: 'full' }, //redirect to dummy object
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
