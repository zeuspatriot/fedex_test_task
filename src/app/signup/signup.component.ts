import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Router } from '@angular/router';

type formKeys = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService, private snackbar: MatSnackBar, private router: Router) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(^(?=.*[A-Z])(?=.*[a-z]).*$)/)
      ]),
      confirmPassword: new FormControl(undefined, Validators.required)
    }, [this.passwordNoUsernames, this.samePassword]);
   }

  ngOnInit(): void {
    
  }

  getFirstErrorText = (control: AbstractControl | null) => {
    const error = Object.keys(control?.errors || {}).shift();
    switch(error){
      case 'minlength':
        return 'Password should contain at least 8 characters'
      case 'pattern':
        return 'Password should contain at least one Uppercase and one Lowercase'
      case 'containsName':
        return 'Password should not contain first or last name'
      case 'required':
        return 'Password is required'
      default:
        return ''
    }
  }
  
  samePassword: ValidatorFn = (form) => {
    const {password, confirmPassword} = form.value;
    const confirmPasswordControl = (form as FormGroup).controls['confirmPassword'];
    
    if(confirmPassword !== password) {
      confirmPasswordControl.setErrors({noMatch: true})
    } else {
      confirmPasswordControl.setErrors(null)
      confirmPasswordControl.updateValueAndValidity({onlySelf: true})
    }
    return null;
  }

  passwordNoUsernames: ValidatorFn = (form: AbstractControl) => {
    const formValue: Record<formKeys, string> = form.value;
    const passControl = (form as FormGroup).controls['password'];

    const isPasswordIncludes = (search: string) => formValue.password?.toLowerCase().includes(search);
    
    if(isPasswordIncludes(formValue.firstName?.toLowerCase()) || isPasswordIncludes(formValue.lastName?.toLowerCase())) {
      passControl.setErrors({...passControl.errors, containsName: true});
    } else {
      passControl.setErrors(null);
      passControl.updateValueAndValidity({onlySelf: true})
    };
    
    return null;
  }

  submitForm = () => {
    const {firstName, lastName, email} = this.signUpForm.value;
    if(this.signUpForm.valid) {
      this.signUpForm.disable();
      this.authService.signUp({
        firstName,
        lastName,
        email
      }).pipe(
        take(1)
      ).subscribe(
        {
          next: (success) => {
            this.snackbar.open('Sign up successfull', 'Ok', {duration: 2000})
            this.router.navigate(['/success']);
          },
          error: (error) => {
            this.snackbar.open('Sign up failed', 'Ok')
          }
        });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

}
