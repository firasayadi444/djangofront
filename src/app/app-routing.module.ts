import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { provideHttpClient } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component'; // Import the ProfileComponent
import { HomeComponent } from './home/home.component'; // Import the HomeComponent
import { GenerateComponent } from './generate/generate.component';
import { MygalleryComponent } from './mygallery/mygallery.component';
import { EditimageComponent } from './editimage/editimage.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, providers: [provideHttpClient()] },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'home', component: HomeComponent }, // Add the HomeComponent route
  { path: 'editimage', component: EditimageComponent }, // Add the HomeComponent route

  { path: 'generate', component: GenerateComponent }, // Add the HomeComponent route
  { path: 'gallery', component: MygalleryComponent }, // Add the HomeComponent route

  { path: '', redirectTo: '/home', pathMatch: 'full' } // Update redirection to HomeComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
