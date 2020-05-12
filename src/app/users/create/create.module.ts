import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';

// Importa formulário do usuário
import { UserFormComponent } from '../../components/user-form/user-form.component';

// Importa ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,

    // Inicializa ReactiveForms
    ReactiveFormsModule
  ],
  declarations: [
    CreatePage,

  // Declara componente do formulário do usuário
    UserFormComponent]
})
export class CreatePageModule {}
