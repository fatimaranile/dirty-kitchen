import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { IUser } from 'src/app/shared/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerUserInfo: IUser = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  registerUser = async () => {
    try {
      const response = await this.authenticationService.getRegistrationToken(this.registerUserInfo);
      console.log(response);

      if (response) {
        this.registerUserInfo.uid = response.user.uid;
        const registrationResponse = this.authenticationService.registerUserData(this.registerUserInfo);

        if (registrationResponse) {
          alert('Registration complete');

          this.router.navigate(['/login']);
        }

      }
      else {
        throw new Error('Request failed');
      }
    }
    catch (error) {
      console.log(`Error: ${error.message}`);
      alert(error.message);
    }
  };

}
