import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { ModalWindowComponent } from './modal-window/modal-window.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalWindowComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalWindowComponent
  ],
})
export class AppModule {}
