import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]+')
      ])
    });
  }
  

  ingresar() {
    if (this.loginForm.valid) {
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.loginForm.value
        }
      };
      this.router.navigate(['/home'], navigationExtras);
      //Manejador de errores para una futura implementacion
    } else {
      
    }
  }

  ngOnInit() {}

   //Metodo para el envio y obtener de datos
  onSubmit() {
    const usuario = this.loginForm?.get('usuario')?.value;
    const password = this.loginForm?.get('password')?.value;
  
    let navigationExtras: NavigationExtras = {
      state: {
        user: {
          usuario: usuario,
          password: password
        }
      }
    };
  
    this.router.navigate(['/home'], navigationExtras);
  }
  
  
  
}
