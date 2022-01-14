import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp = (value: {
    firstName: string,
    lastName: string,
    email: string
  }) => {
    return this.http.post('https://demo-api.now.sh/users', value);
  }
}
