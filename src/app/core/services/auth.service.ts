import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupInput, User } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp = (value: SignupInput): Observable<User> => {
    return this.http.post<User>('https://demo-api.now.sh/users', value);
  };
}
