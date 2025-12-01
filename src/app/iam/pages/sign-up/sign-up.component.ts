import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { AuthService } from '../../services/auth.service';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up.component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgxCaptchaModule,
    TranslatePipe
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  siteKey = '6Ldred4rAAAAAO7t3yKUZ1_-cn8YU3GiZA_gcPS_';

  @ViewChild('captchaElem') captchaElem?: ReCaptcha2Component;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      imgUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      role: ['', Validators.required],
      recaptcha: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      imgUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      role: ['', Validators.required],
      recaptcha: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  handleSuccess(_: string): void {}
  handleReset(): void {}
  handleExpire(): void { this.registerForm.get('recaptcha')?.reset(); }
  handleLoad(): void {}

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.submitted = true;
    const v = this.registerForm.value;
    const signUpRequest = {
      username: v.username,
      name: v.name,
      surname: v.surname,
      imgUrl: v.imgUrl,
      email: v.email,
      password: v.password,
      roles: [v.role === 'leader' ? 'ROLE_LEADER' : 'ROLE_MEMBER'],
      captcha: v.recaptcha
    };
    this.authService.signUp(signUpRequest);
  }

  passwordsMatchValidator(form: FormGroup) {
    const p = form.get('password')?.value;
    const c = form.get('confirmPassword')?.value;
    return p === c ? null : { passwordMismatch: true };
  }
}
