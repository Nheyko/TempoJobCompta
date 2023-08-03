import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FormatPipeModule } from './format-pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'tempojobcompta'}),
    AppRoutingModule,
    HttpClientModule,
    FormatPipeModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
