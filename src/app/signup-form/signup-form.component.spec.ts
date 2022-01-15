import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { SignupInput } from '../core/types';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  const AuthServiceMock = {
    signUp: jasmine.createSpy('signUp').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFormComponent ],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: AuthService, useValue: AuthServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger required validation on empty fields', () => {
    fixture.componentInstance.submitForm();
    const form = fixture.componentInstance.signUpForm;
    expect(form.get('firstName')?.errors).toBeTruthy();
    expect(form.get('lastName')?.errors).toBeTruthy();
    expect(form.get('email')?.errors).toBeTruthy();
    expect(form.get('password')?.errors).toBeTruthy();
    expect(form.get('confirmPassword')?.errors).toBeTruthy();
  });

  it('should not accept invalid email format', () => {
    const emailControl = fixture.componentInstance.signUpForm.get('email');
    emailControl?.setValue('test.com');
    expect(emailControl?.getError('email')).toBeTruthy();
    emailControl?.setValue('test@test.');
    expect(emailControl?.getError('email')).toBeTruthy();
    emailControl?.setValue('test.@test.com');
    expect(emailControl?.getError('email')).toBeTruthy();
    emailControl?.setValue('test@test.com.');
    expect(emailControl?.getError('email')).toBeTruthy();
  });

  it('should accept valid email format', () => {
    const emailControl = fixture.componentInstance.signUpForm.get('email');
    emailControl?.setValue('test@test');
    expect(emailControl?.getError('email')).toBeNull();
    emailControl?.setValue('test@test.com');
    expect(emailControl?.getError('email')).toBeNull();
    emailControl?.setValue('test@test.subdomain.com');
    expect(emailControl?.getError('email')).toBeNull();
    emailControl?.setValue('test.testerski@test.com');
    expect(emailControl?.getError('email')).toBeNull();
  });

  it('should correctly validate password', () => {
    const passwordControl = fixture.componentInstance.signUpForm.get('password');
    passwordControl?.setValue('1234567');
    expect(passwordControl?.getError('minlength')).toBeTruthy();
    passwordControl?.setValue('testtest');
    expect(passwordControl?.getError('pattern')).toBeTruthy();
    passwordControl?.setValue('TESTTEST');
    expect(passwordControl?.getError('pattern')).toBeTruthy();
    fixture.componentInstance.signUpForm.get('firstName')?.setValue('test');
    passwordControl?.setValue('Testrest');
    expect(passwordControl?.getError('containsName')).toBeTruthy();
    fixture.componentInstance.signUpForm.get('lastName')?.setValue('Best');
    passwordControl?.setValue('WestBest');
    expect(passwordControl?.getError('containsName')).toBeTruthy();
  });

  it('should accept properly validated password', () => {
    const passwordControl = fixture.componentInstance.signUpForm.get('password');
    fixture.componentInstance.signUpForm.get('firstName')?.setValue('Test');
    fixture.componentInstance.signUpForm.get('lastName')?.setValue('West');
    passwordControl?.setValue('BestCrest');
    expect(passwordControl?.errors).toBeNull();
  });

  it('confirm password should match password', () => {
    const confirmPasswordControl = fixture.componentInstance.signUpForm.get('confirmPassword');
    fixture.componentInstance.signUpForm.get('password')?.setValue('TestTest');
    confirmPasswordControl?.setValue('testtest');
    expect(confirmPasswordControl?.getError('noMatch')).toBeTruthy();
    confirmPasswordControl?.setValue('Testtest');
    expect(confirmPasswordControl?.getError('noMatch')).toBeTruthy();
    confirmPasswordControl?.setValue('TestTest');
    expect(confirmPasswordControl?.getError('noMatch')).toBeNull();
  })

  it('should submit data to AutService with proper format', () => {
    const TEST_DATA = {
      firstName: 'Test',
      lastName: 'Best',
      email: 'test@best.com',
      password: 'CrestWest',
      confirmPassword: 'CrestWest'
    };

    fixture.componentInstance.signUpForm.get('firstName')?.setValue(TEST_DATA.firstName);
    fixture.componentInstance.signUpForm.get('lastName')?.setValue(TEST_DATA.lastName);
    fixture.componentInstance.signUpForm.get('email')?.setValue(TEST_DATA.email);
    fixture.componentInstance.signUpForm.get('password')?.setValue(TEST_DATA.password);
    fixture.componentInstance.signUpForm.get('confirmPassword')?.setValue(TEST_DATA.confirmPassword);

    fixture.componentInstance.submitForm();

    expect(AuthServiceMock.signUp).toHaveBeenCalledWith({
      firstName: TEST_DATA.firstName,
      lastName: TEST_DATA.lastName,
      email: TEST_DATA.email
    });
  });
});
