import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private snackbar: MatSnackBar, private router: Router) { }

  onSignupSuccess = () => {
    this.snackbar.open('Sign up successfull', 'Ok', {duration: 2000})
    this.router.navigate(['/success']);
  }

  onSignupError = (error: unknown) => {
    this.snackbar.open('Sign up failed', 'Ok');
    console.error('Signup failed with the following error:', error);
  }
}
