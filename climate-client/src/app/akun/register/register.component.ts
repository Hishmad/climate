import { DataModelService } from './../../services/data-model.services';
import {
  FormGroup,
  AbstractControl,
  Validators,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  detailForm: FormGroup;
  isSpinner = false;
  matcher: MyErrorStateMatcher;

  constructor(
    private dataModelService: DataModelService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
   
  }

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder(): void {
    this.matcher  = new MyErrorStateMatcher();
    this.detailForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator('password', 'repassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  get email(): AbstractControl {
    return this.detailForm.get('email');
  }

  get password(): AbstractControl {
    return this.detailForm.get('password');
  }

  get repassword(): AbstractControl {
    return this.detailForm.get('repassword');
  }

  onEmailRegister(formValues: any): Promise<any> {
  
    this.isSpinner = true;
  
    if (this.detailForm.invalid) {
      this.isSpinner = false;
      return;
    }

    return this.dataModelService
      .emailSignUp(formValues.email, formValues.password)
      .then(message => {

        let snackBarRef = this.snackBar.open(message);
        this.detailForm.reset();
        return this.router.navigate(['/akun/signin']);
      })
      .catch(error => {

        let snackBarRef = this.snackBar.open(error);
        this.isSpinner = false;
        return null;
      });

  }

  signin(): Promise<boolean> {
    return this.router.navigate(['/akun/signin']);
  }

  batal(): Promise<boolean> {
    return this.router.navigate(['/main/landing/welcome']);
  }

  onBackHome(): Promise<boolean> {
    return this.router.navigate(['/main/landing/welcome']);
  }

  passwordMatchValidator(
    controlName: string,
    matchingControlName: string
  ): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnDestroy(): void {
    this.detailForm = null;
    this.matcher = null;
  }
}
