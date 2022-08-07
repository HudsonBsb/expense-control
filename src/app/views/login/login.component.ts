import { AfterViewChecked, Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { browserLocalPersistence, Persistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewChecked {
  loginForm: FormGroup;

  constructor(private auth: Auth, private route: Router, private cookieService: CookieService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (this.auth.currentUser)
        this.route.navigate(['/panel']);
    }, 500);
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    if (!this.auth.currentUser)
      setPersistence(this.auth, browserLocalPersistence)
        .then(() => this.signIn(email, password))
        .catch(err => console.log('Erro ao tentar setar persistencia AUTH => ', err))
    else
      this.route.navigate(['/panel']);
  }

  protected signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => this.route.navigate(['/panel']))
      .catch((error) => console.log('Error => ', error));
  }
}

class LocalPersistence implements Persistence {
  type: 'SESSION' | 'LOCAL' | 'NONE';
  constructor() {
    this.type = 'LOCAL';
  }
}
