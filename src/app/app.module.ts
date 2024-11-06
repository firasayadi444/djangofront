import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProfilComponent } from './profil/profil.component'; // Import MatMenuModule
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { GenerateComponent } from './generate/generate.component';
import { MygalleryComponent } from './mygallery/mygallery.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { NavbarNewComponent } from './navbar-new/navbar-new.component';
import { HeroComponent } from './hero/hero.component';
import { EditimageComponent } from './editimage/editimage.component';
// import { Typography, Card, CardBody, CardHeader, Button } from "@material-tailwind/html";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
    FooterComponent,
    ProfilComponent,
    HomeComponent,
    GenerateComponent,
    MygalleryComponent,
    ImageCardComponent,
    NavbarNewComponent,
    HeroComponent,
    EditimageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule here
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule, // Add MatMenuModule here
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ], // No need for importProvidersFrom or provideHttpClient here
  bootstrap: [AppComponent]
})
export class AppModule { }
