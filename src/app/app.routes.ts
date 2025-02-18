import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { ImportComponent } from './components/import/import.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditComponent },
  { path: 'import', component: ImportComponent },
  { path: '**', redirectTo: 'home' }
];
