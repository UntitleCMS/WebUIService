import { Component } from '@angular/core';
import { PasswordService } from '../../../../core/auth/password.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss'
})
export class SigninPageComponent {
  loginForm = this.fb.group({
    username: '',
    password: '',
  });

  isShowMsg = false;
  isLoginFailed = false;

  constructor(
    private passwordLogin: PasswordService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    this.passwordLogin
      .login(this.loginForm.value.username!, this.loginForm.value.password!)
      .subscribe({
        next: () => {
          this.location.back();
        },
        error: () => {
          this.isShowMsg = true;
          this.isLoginFailed = true;
        },
        complete: () => {
          this.loginForm.reset();
        },
      });
  }

  // github() {
  //   this.loginService.githubFlow();
  // }

  resetState() {
    if (this.isLoginFailed) {
      this.isShowMsg = false;
      this.isLoginFailed = false;
    }
  }
}
