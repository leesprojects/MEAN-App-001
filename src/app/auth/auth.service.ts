import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root"})

export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password};

    this.http.post("http://localhost:3000/api/user/register", authData)
      .subscribe(response => {
        console.log(response);
      })
  }

  login(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        console.log(response);
      })
  }
}


//SPA cannot use 'Sessions' with 'Session ID (cookies)' because SPA's are stateless
//and therefore decoupled from the frontend.
//SPA's use 'Tokens (Cookies)' which only this server knows the exact algorithm to read the token
