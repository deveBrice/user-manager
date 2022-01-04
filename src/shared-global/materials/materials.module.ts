import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
  
  ],
  imports: [
    BrowserModule,

  ],
  providers: [],
  exports: [MatInputModule, MatFormFieldModule, MatTableModule, MatSelectModule, MatButtonModule],
  bootstrap: []
})
export class MaterialsModule { }