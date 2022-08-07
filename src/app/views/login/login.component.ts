import { Component, OnInit } from '@angular/core';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: Auth, private route: Router, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void { }

  login(): void {
    const { email, password } = this.loginForm.value;
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user as any;
        this.cookieService.set(environment.firebase.apiKey, JSON.stringify(user['stsTokenManager'].accessToken));
        this.route.navigate(['/panel']);
      })
      .catch((error) => {
        console.log('Error => ', error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
