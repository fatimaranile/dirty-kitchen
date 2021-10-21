import { Component, OnInit } from '@angular/core';
import { ILoginCredredentials } from 'src/app/shared/ILoginCredentials';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginCredential: ILoginCredredentials = {
    email: '',
    password: '',
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  loginUser() {

    this.authenticationService.signInWithEmailPassword(this.loginCredential.email, this.loginCredential.password)
    .then(response => {
      if (response) {
        this.router.navigate(['/home']);
      }
    }, error => {
      alert('Invalid Credentials');
      console.log(`Error logging in: ${JSON.stringify(error)}`);
    })
    .catch(error => {
      console.log(`Error pa gyud dri: ${error}`);
    });
  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }
}
