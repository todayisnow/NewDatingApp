import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
//import { User } from '../_models/user';
import { ReplaySubject } from "rxjs";
import { User } from '../_models/user';



//import { environment } from "src/environments/environment";
//import { PresenceService } from "./presence.service";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "/api/account";// environment.apiUrl;
   private currentUserSource = new ReplaySubject<User>(1); //It buffers a set number of values (1) and will emit those values immediately to any new subscribers in addition to emitting new values to existing subscribers.
  currentUser$ = this.currentUserSource.asObservable();//create observable to subscribe to
  
  constructor(private http: HttpClient/*, private presence: PresenceService*/) {

  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "/login", model).
      pipe(
        map((response: User) => {//manipulate the response before subscription 
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));// save user to browser local storage
                 this.setCurrentUser(user);
            //      this.presence.createHubConnection(user);

          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "/register", model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
         // this.presence.createHubConnection(user);
        }
      })
    );
  }
  setCurrentUser(user: User) {
    //if (user != null) {
    //  user.roles = [];
    //  const roles = this.getDecodedToken(user.token)?.role;
    //  Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);


    //  localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    //}
  }

  logout() {
    localStorage.removeItem('user');
    
    this.currentUserSource.next(null);
    //this.presence.stopHubConnection();
  }
  //getDecodedToken(token: string) {
  //  return JSON.parse(atob(token.split('.')[1]));
  //}
}

