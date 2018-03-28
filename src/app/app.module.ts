import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpServiceService } from './common/http-service.service';
import { GlobalConstantsServiceService } from './common/global-constants-service.service';
import { AppComponent } from './app.component';
import { LaddaModule } from 'angular2-ladda';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    LaddaModule.forRoot({
      style: "expand-left",
      spinnerSize: 40,
      spinnerColor: "red",
      spinnerLines: 12
  })

  ],
  providers: [HttpServiceService, GlobalConstantsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
