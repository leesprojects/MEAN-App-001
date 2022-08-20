import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppDashboard } from './app-dashboard/app-dashboard.component';
import { FlashcardDashboard } from './flashcards/flashcards-dashboard/flashcards-dashboard.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: AppDashboard },
  { path: 'post-list', component: PostListComponent },
  { path: 'post-create', component: PostCreateComponent },
  { path: 'post-edit/:postId', component: PostCreateComponent },
  { path: 'flashcards', component: FlashcardDashboard },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //Take the selected route
  exports: [RouterModule] //Export the selected routes in the app root
})
export class AppRoutingModule { }

//These are all client-side Angular nodes, the server ones are separate
