import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddbookComponent } from './addbook/addbook.component';
import { BookListComponent } from './book-list/book-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { addBookReducer } from './addbook/state/addbook.reducer';
import { AddBookEffects } from './addbook/state/addbook.effects';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddbookComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('addBook', addBookReducer),
    EffectsModule.forFeature([AddBookEffects])
  ]
})
export class AdminModule { }
