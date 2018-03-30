import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  imports: [
    SharedModule,
    PageNotFoundRoutingModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: []
})
export class PageNotFoundModule { }
