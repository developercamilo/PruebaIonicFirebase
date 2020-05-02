import { Component, OnInit } from '@angular/core';
//FCM
import { FCM } from '@ionic-native/fcm/ngx';
import { ServicioCrudService } from "../servicios/servicio-crud.service";
import { Data } from "../data/data";
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  Usuarios = [];
  constructor(private fcm:FCM, private servicio:ServicioCrudService,
    private localNotifications: LocalNotifications) {}

  ngOnInit(){
    this.fcm.getToken().then(token => {
      console.log(token)
    });
    this.fetchBookings();
    let bookingRes = this.servicio.getUserList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Usuarios = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Usuarios.push(a as Data);
      })
    })
  }

  fetchBookings() {
    this.servicio.getUserList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteUser(id) {
    console.log(id)
    if (window.confirm('Estas seguro de eliminar?')) {
      this.servicio.deleteUser(id)
    }
  }

  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }
  
}
