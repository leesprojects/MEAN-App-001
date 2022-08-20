import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { MatInputModule }           from '@angular/material/input';
import { MatButtonModule }          from '@angular/material/button';
import { MatCardModule }            from '@angular/material/card';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatIconModule }            from '@angular/material/icon'
import { MatExpansionModule }       from '@angular/material/expansion'
import { CdkMenuModule }            from '@angular/cdk/menu';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
import { HttpClientModule }         from '@angular/common/http';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { HeaderComponent }          from './header/header.component';
import { PostCreateComponent }      from './posts/post-create/post-create.component';
import { PostListComponent }        from './posts/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent
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
    CdkMenuModule,
    MatExpansionModule,
    HttpClientModule,
  ],
  providers: [], //Can put the service here, or make it @injectable
  bootstrap: [AppComponent]
})
export class AppModule { }
