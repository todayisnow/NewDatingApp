import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member} from '../_models/member';
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { UserParams} from '../_models/userParams'
import { AccountService } from "./account.service";
import { User } from "../_models/user";
import { take } from "rxjs/operators";
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
// interceptor used instead 
//const httpOptions = {
//  headers: new HttpHeaders({
//    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
//  })
//}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = "/api/";
  memberCache= new Map();
  userParams: UserParams;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user: User) => {
      this.user = user;
      this.userParams = new UserParams(user);
      this.getMembers(this.userParams)
    });
  }

  getUserParams() {
    return this.userParams;
  }
  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }
  resetMemberCache() {
    this.memberCache = new Map();
    
  }
  private setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  getMembers(userParams: UserParams) {
    return this.http.get<Member[]>(this.baseUrl + 'users/' );
    //this.setUserParams(userParams);
    //const currentKey = Object.values(userParams).join('-');
    //const resposne = this.memberCache.get(currentKey);
    //if (resposne) return of(resposne);//caching as observable "of"



    //let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);


    //params = params.append('minAge', userParams.minAge.toString());
    //params = params.append('maxAge', userParams.maxAge.toString());
    //params = params.append('gender', userParams.gender);
    //params = params.append('orderBy', userParams.orderBy);

    //return getPaginatedResult<Member[]>(this.baseUrl + 'users', params,this.http).pipe(
    //  map(members => {
    //    this.memberCache.set(currentKey, members);
    //    return members;
    //  })
    //  );
  }


 
  getMember(username: string) {

    
    const member = [...this.memberCache.values()]//spread operator
      .reduce((arr, elem) => arr.concat(elem.result), [])//call back for all the elems 
      .find((member: Member) => member.username === username);

    if (member) return of(member);
   return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  updateMember(member: Member) {

    return this.http.put(this.baseUrl + 'users', member);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params,this.http);
  }


}
