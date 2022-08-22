import { Component }                  from "@angular/core";
import { NgForm }                     from "@angular/forms";
import { ActivatedRoute, ParamMap }   from "@angular/router";

import { Flashcard }                  from "../flashcard.model";
import { FlashcardsService }          from "../flashcards.service";

@Component({
  selector: 'flashcard-create',
  templateUrl: './flashcards-create.component.html',
  styleUrls: ['./flashcards-create.component.css']
})

export class FlashcardCreateComponent {
  enteredSubject = "";
  enteredTitle = "";
  enteredContent = "";
  flashcard: Flashcard | undefined;
  private mode = "create";
  private flashcardId: string = null;

  constructor(
    public flashcardService: FlashcardsService,
    public route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('flashcardId')) {
        this.mode = 'edit';
        this.flashcardId = paramMap.get('flashcardId');
        console.log("Edit mode | Flashcard id | " + this.flashcardId);
        console.log(paramMap.get('subject'));
        //this.flashcard = this.flashcardService.getFlashcardLocal(this.flashcardId);

        this.flashcardService.getFlashcard(this.flashcardId)
          .subscribe(flashcardData => {
            this.flashcard = {
              id: flashcardData._id,
              subject: flashcardData.subject,
              title: flashcardData.title,
              content: flashcardData.content,
            };
        });
      } else {
        console.log("Create mode | Enabled")
        this.mode = 'create';
        this.flashcardId = "";
      }
    }); //It's an obvserver since the url can change based on a dynamic id
  }

  onSaveFlashcard(form: NgForm){
    if(form.invalid){
      return;
    }
    if (this.mode === "create"){
      console.log("Flashcards | Create Mode = True")
      this.flashcardService.addFlashcard(form.value.subject, form.value.title, form.value.content);
    } else {
      this.flashcardService.updateFlashcard(
        this.flashcardId,
        form.value.subject,
        form.value.title,
        form.value.content
        );
    }
    form.resetForm();
  }
}
