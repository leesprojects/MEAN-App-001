import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

//Injectable means only one instance will be created to be shared with all components
@Injectable({providedIn: 'root'}) //Allow this file to be accessed from the root
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();//Payload = list of posts

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); //Can ommit but not emmit
  }

  addPost(title: string, content: string){
    const post: Post = { id: '', title: title, content: content}
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);//Omits a new copy of this posts after update
  }
}


//Subjects can be actively triggered from code i.e. this.postsUpdated.next();
//Observables are passively triggered by wraps callback, events...
