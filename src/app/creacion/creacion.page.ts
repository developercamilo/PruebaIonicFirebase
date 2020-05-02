import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ServicioCrudService } from "../servicios/servicio-crud.service";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker/ngx";
import { File } from "@ionic-native/file/ngx";
@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.page.html',
  styleUrls: ['./creacion.page.scss'],
})
export class CreacionPage implements OnInit {
  UsersForm: FormGroup;
  images:any=[]
  constructor(private servicio: ServicioCrudService,
    public fb: FormBuilder,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public imagePicker:ImagePicker,
    public file:File) { }

  ngOnInit() {
    this.UsersForm = this.fb.group({
      Descripcion: [''],
      Nombre: [''],
      Imagen: ['']
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

  /* openImagePicker(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          })
        }
      }, (err) => {
        console.log(err);
      });
  } */

  PickMultipleImages(){
    var options : ImagePickerOptions={
      maximumImagesCount:1,
      width:100,
      height:100
    }
    this.imagePicker.getPictures(options).then((result) =>{
      for(var interval = 0;interval<result.length;interval++)
      {
        let filename =  result[interval].substring(result[interval]
          .lastIndexOf('/')+1);
          let path = result[interval].substring(0,result[interval].lastIndexOf('/')+1)
          this.file.readAsDataURL(path,filename).then((base64string) =>{

          })
      }
    })
  }

}
