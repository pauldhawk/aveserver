import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { TempComponent } from './temp.component';
import { AppComponent }  from './app.component';

import { HttpModule, JsonpModule } from '@angular/http';


@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule
],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent, TempComponent]
})
export class AppModule { }
