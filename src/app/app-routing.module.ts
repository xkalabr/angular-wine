import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventComponent } from './advent/advent.component';
import { CombopageComponent } from './combopage/combopage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

const routes: Routes = [
    { path: 'main', component: CombopageComponent },
    { path: 'advent', component: AdventComponent },
    { path: 'search', component: SearchpageComponent },
    { path: '', redirectTo: '/main', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
