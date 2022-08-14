import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})

export class PostListComponent implements OnInit, OnDestroy {
   posts : Post[] = [];
   private postsSub: Subscription = new Subscription;

   //Dependency injection
   //Called whenever Angular creates a new instance of a component
   constructor(public postsService: PostsService) {}

   ngOnInit() { //On init get all posts
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      }); //Subscription
   }

   onDelete(postId: string){
    this.postsService.deletePost(postId);
   }

   ngOnDestroy() { //Remove subscription and prevent memory leaks
    this.postsSub.unsubscribe();
   }
}
