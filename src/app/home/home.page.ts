import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loginForm: FormGroup;
  nombreUsuario: string = '';
  data: any;


  constructor(private activatedRoute: ActivatedRoute, public alertController: AlertController, private router: Router) {
    this.loginForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nivelEducacion: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required)
    });

    // Esta parte trae los datos ingresados
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras && currentNavigation.extras.state && 'user' in currentNavigation.extras.state) {
      this.data = currentNavigation.extras.state['user'];
    } else {
      this.router.navigate(['/login']);
    }
  }
  // Efecto del boton limpiar
  applySlideEffect(inputName: string) {
    const inputElement = document.querySelector(`ion-input[formControlName=${inputName}]`);
    if (inputElement) {
        inputElement.classList.add('slide-effect');
        setTimeout(() => {
            inputElement.classList.remove('slide-effect');
        }, 1000);
    }
  }
  // Metodo de limpiar
  limpiarFormulario() {
    this.loginForm.reset();
    this.applySlideEffect('nombre');
    this.applySlideEffect('apellido');
  }
  // Metodo de Mostrar datos
  async mostrarDatos() {
    const formValue = this.loginForm.value;
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Sus nombre es ${formValue.nombre} ${formValue.apellido}`,
      buttons: ['Yes'],
    });
    await alert.present();
  }




}
