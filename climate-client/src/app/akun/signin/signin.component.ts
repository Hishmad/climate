import { PresenceService } from './../../services/presence.service';
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
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  matcher: MyErrorStateMatcher;
  detailForm: FormGroup;
  isSpinner = false;
  hide = true;

  constructor(
    private dataModelService: DataModelService,
    private presence: PresenceService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder(): void {
    this.matcher = new MyErrorStateMatcher();
    this.detailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  get email(): AbstractControl {
    return this.detailForm.get('email');
  }

  get password(): AbstractControl {
    return this.detailForm.get('password');
  }

  googleSign(): Promise<any> {
    this.isSpinner = true;
    return this.dataModelService
      .GoogleAuth()
      .then((auth) => {
        return this.router.navigate(['/main/landing/welcome']);
      })
      .catch((error) => {
        this.snackBar.open(error);
        this.isSpinner = false;
        return this.presence.signOut();
      });
  }

  twitterSign(): Promise<any> {
    this.isSpinner = true;
    return this.dataModelService
      .TwitterAuth()
      .then((auth) => {
        return this.router.navigate(['/main/landing/welcome']);
      })
      .catch((error) => {
        this.snackBar.open(error);
        console.log(error);
        this.isSpinner = false;
        return this.presence.signOut();
      });
  }

  githubSign(): Promise<any> {
    this.isSpinner = true;
    return this.dataModelService
      .GithubAuth()
      .then((auth) => {
        return this.router.navigate(['/main/landing/welcome']);
      })
      .catch((error) => {
        this.snackBar.open(error);
        console.log(error);
        this.isSpinner = false;
        return this.presence.signOut();
      });
  }

  forgetPassword(): Promise<any> {
    this.isSpinner = true;
    return this.dataModelService
      .emailPasswordReset(this.email.value)
      .then(message => {
        let snackBarRef = this.snackBar.open(message);
        this.isSpinner = false;
        return null
      })
      .catch(error => {
        let snackBarRef = this.snackBar.open(error);
        this.isSpinner = false;
        return null;
      });
  }

  onEmailSignin(formValues: any): Promise<any> {
   

    this.isSpinner = true;

    // stop here if form is invalid
    if (this.detailForm.invalid) {
      this.isSpinner = false;
      return;
    }

    return this.dataModelService
      .emailLogin(formValues.email, formValues.password)
      .then(auth => {
        return this.router.navigate(['/main/landing/welcome']);
      })
      .catch(error => {
        let snackBarRef = this.snackBar.open(error);
        this.isSpinner = false;
        return this.presence.signOut();
      });
  }

  register(): Promise<boolean> {
    return this.router.navigate(['/akun/register']);
  }

  batal(): Promise<boolean> {
    return this.router.navigate(['/main/landing/welcome']);
  }

  onBackHome(): Promise<boolean> {
    return this.router.navigate(['/main/landing/welcome']);
  }

  ngOnDestroy(): void {
    this.matcher = null;
    this.detailForm = null;
  }
}
