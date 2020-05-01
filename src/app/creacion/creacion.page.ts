import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ServicioCrudService } from "../servicios/servicio-crud.service";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {
  UsersForm: FormGroup;
  constructor(private servicio: ServicioCrudService,
    public fb: FormBuilder,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,) { }

  ngOnInit() {
    this.UsersForm = this.fb.group({
      descripcion: [''],
      nombre: [''],
      imagen: ['']
    })
  }

  formSubmit() {
    if (!this.UsersForm.valid) {
      return false;
    } else {
      this.servicio.createUser(this.UsersForm.value).then(res => {
        console.log(res)
        this.UsersForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }

}
