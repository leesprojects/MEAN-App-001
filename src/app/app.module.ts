//Packages
import { NgModule }                           from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatInputModule }                     from '@angular/material/input';
import { MatButtonModule }                    from '@angular/material/button';
import { MatCardModule }                      from '@angular/material/card';
import { MatToolbarModule }                   from '@angular/material/toolbar';
import { MatIconModule }                      from '@angular/material/icon'
import { MatExpansionModule }                 from '@angular/material/expansion'
import { MatProgressSpinnerModule }           from '@angular/material/progress-spinner'
import { MatSidenavModule }                   from '@angular/material/sidenav';
import {  MatListModule }                     from '@angular/material/list';
import { CdkMenuModule }                      from '@angular/cdk/menu';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations'
import { HttpClientModule }                   from '@angular/common/http';

//Components
import { AppRoutingModule }                   from './app-routing.module';
import { AppComponent }                       from './app.component';
import { HeaderComponent }                    from './header/header.component';
import { Portfolio }                       from './portfolio/portfolio.component';
import { PostCreateComponent }                from './posts/post-create/post-create.component';
import { PostListComponent }                  from './posts/post-list/post-list.component';
import { FlashcardDashboardComponent }        from './flashcards/flashcards-dashboard/flashcards-dashboard.component';
import { FlashcardViewComponent }             from './flashcards/flashcards-view/flashcards-view.component';
import { FlashcardCreateComponent }           from './flashcards/flashcards-create/flashcard-create.component';
import { LoginComponent }                     from './auth/login/login.component';
import { RegisterComponent }                  from './auth/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    Portfolio,
    PostCreateComponent,
    PostListComponent,
    FlashcardDashboardComponent,
    FlashcardViewComponent,
    FlashcardCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    CdkMenuModule,
    HttpClientModule,
  ],
  providers: [], //Can put the service here, or make it @injectable
  bootstrap: [AppComponent]
})
export class AppModule { }
