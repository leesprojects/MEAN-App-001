import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

//Injectable means only one instance will be created to be shared with all components
@Injectable({providedIn: 'root'}) //Allow this file to be accessed from the root
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();//Payload = list of posts

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => { //Operator from rxjs //We map because DB returns _id, whereas we use id
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); //Can ommit but not emmit
  }

  getPost(id: string) {
    //return { ...this.posts.find(p => p.id === id) }; //would return the local array, we need the server
    return this.httpClient.get
    <{_id: string, title: string, content: string}>
    ("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string){
    const post: Post = { //TS Objects are reference types, so updaing the id later, doesn't affect this object, only the reference to id
      id: "",
      title: title,
      content: content}

    this.httpClient.post<{message: string, postId: string}>("http://localhost:3000/api/posts/", post)
    .subscribe((responseData) => { //On Success
      const Id = responseData.postId;
      post.id = Id;
      this.posts.push(post); //update local data
      this.postsUpdated.next([...this.posts]);//Omits a new copy of this posts after update
    });
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = { id: id, title: title, content: content };
    this.httpClient
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string){
    this.httpClient.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== postId) //For each post in arr, Delete the selected from the array to match the DB
        this.postsUpdated.next([...this.posts]) //Go to the next post and send a copy of this newly updated postsUpdated array
      });
  }

}
//Subjects can be actively triggered from code i.e. this.postsUpdated.next();
//Observables are passively triggered by wraps callback, events...
