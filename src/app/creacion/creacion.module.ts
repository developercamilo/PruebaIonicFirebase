import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacionPageRoutingModule } from './creacion-routing.module';

import { CreacionPage } from './creacion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreacionPageRoutingModule
  ],
  declarations: [CreacionPage]
})
export class CreacionPageModule {}
