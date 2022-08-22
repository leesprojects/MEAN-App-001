import { Injectable }         from "@angular/core";
import { map, Subject }       from "rxjs";
import { HttpClient }         from "@angular/common/http";
import { Router }             from "@angular/router";

import { Flashcard }          from "./flashcard.model";

@Injectable({providedIn: 'root'})

export class FlashcardsService{
  private flashcards: Flashcard[] = [];
  private flashcardsUpdated = new Subject<Flashcard[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getFlashcards() {
    this.http
      .get<{ message: string; flashcards: any }>(
        "http://localhost:3000/api/flashcards"
      )
      .pipe(map((flashcardData) => {
        return flashcardData.flashcards.map((flashcard: { _id: any; subject: any; title: any; content: any; }) => {
          return {
            id: flashcard._id,
            subject: flashcard.subject,
            title: flashcard.title,
            content: flashcard.content,
          }
        });
      }))
      .subscribe(transformedFlashcards => {
        this.flashcards = transformedFlashcards;
        this.flashcardsUpdated.next([...this.flashcards]);
      });
  }

  getFlashcardLocal(id: string){
    return {...this.flashcards.find(p => p.id === id)};
  }

  getFlashcard(id: string) {
    return this.http.get<{ _id: string; subject: string; title: string; content: string }>(
      "http://localhost:3000/api/flashcards/" + id
    );
  }

  getFlashcardUpdateListener() {
    return this.flashcardsUpdated.asObservable();
  }

  addFlashcard(subject: string, title: string, content: string){
    const flashcard: Flashcard = {
      id: "",
      subject: subject,
      title: title,
      content: content,
    }
    this.http.post<{message: string, flashcardId: string}>("http://localhost:3000/api/flashcards/", flashcard)
    .subscribe((responseData) => {
      const Id = responseData.flashcardId;
      flashcard.id = Id;
      this.flashcards.push(flashcard);
      this.flashcardsUpdated.next([...this.flashcards]);
      this.navToViewFlashcards();
    });
  }

  updateFlashcard(id: string, subject: string, title: string, content: string){
    const flashcard: Flashcard = { id: id, subject: subject, title: title, content: content };
    this.http
      .put("http://localhost:3000/api/flashcards/" + id, flashcard)
      .subscribe(response => {
        const updatedFlashcards = [...this.flashcards];
        const oldFlashcardIndex = updatedFlashcards.findIndex(p => p.id === flashcard.id);
        updatedFlashcards[oldFlashcardIndex] = flashcard;
        this.flashcards = updatedFlashcards;
        this.flashcardsUpdated.next([...this.flashcards]);
        this.navToViewFlashcards();
      });
  }

  deleteFlashcard(flashcardId: string){
    this.http.delete("http://localhost:3000/api/flashcards/" + flashcardId)
      .subscribe(() => {
        this.flashcards = this.flashcards.filter(flashcard => flashcard.id !== flashcardId)
        this.flashcardsUpdated.next([...this.flashcards]) });
  }

  navToViewFlashcards(){
    this.router.navigate(["/flashcard-view"]);
  }
}
