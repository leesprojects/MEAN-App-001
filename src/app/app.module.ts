import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { MatInputModule }           from '@angular/material/input';
import { MatButtonModule }          from '@angular/material/button';
import { MatCardModule }            from '@angular/material/card';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatIconModule }            from '@angular/material/icon'
import { MatExpansionModule }       from '@angular/material/expansion'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSidenavModule }         from '@angular/material/sidenav';

import { CdkMenuModule }            from '@angular/cdk/menu';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
import { HttpClientModule }         from '@angular/common/http';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';
import { AppDashboard }             from './app-dashboard/app-dashboard.component';
import { PostCreateComponent }      from './posts/post-create/post-create.component';
import { PostListComponent }        from './posts/post-list/post-list.component';
import { FlashcardDashboard }       from './flashcards/dashboard/flashcards-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppDashboard,
    PostCreateComponent,
    PostListComponent,
    FlashcardDashboard,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    CdkMenuModule,
    HttpClientModule,
  ],
  providers: [], //Can put the service here, or make it @injectable
  bootstrap: [AppComponent]
})
export class AppModule { }
