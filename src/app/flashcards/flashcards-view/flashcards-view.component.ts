import { Component, OnDestroy, OnInit  } from "@angular/core";
import { Subscription } from "rxjs";
import { Flashcard } from "../flashcard.model";
import { FlashcardsService } from "../flashcards.service";

@Component({
  selector: 'flashcards-dashboard',
  templateUrl: './flashcards-view.component.html',
  styleUrls: ['./flashcards-view.component.css']
})

export class FlashcardViewComponent {
  flashcards : Flashcard[] = [];
   private flashcardsSub: Subscription = new Subscription;

   constructor(public flashcardsService: FlashcardsService) {}

   ngOnInit() {
    this.flashcardsService.getFlashcards();
    this.flashcardsSub = this.flashcardsService.getFlashcardUpdateListener()
      .subscribe((flashcards: Flashcard[]) => {
        this.flashcards = flashcards;
      });
   }

   addDummyFlashcard(){
    this.flashcardsService.addFlashcard(
      'C#', 'Dummy title', 'This is dummy content',
    )
   }

   onDelete(flashcardId: string){
    this.flashcardsService.deleteFlashcard(flashcardId);
   }

   ngOnDestroy() { //Remove subscription and prevent memory leaks
    this.flashcardsSub.unsubscribe();
   }
}
