import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {

  constructor(public authService: AuthService) {}

  onRegister(form: NgForm){
    if(form.invalid){
      return;
    }
    console.log("Registration requested with " + form.value.email + ", and " + form.value.password)
    this.authService.createUser(form.value.email, form.value.password)
  }

}
