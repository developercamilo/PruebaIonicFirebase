import { Injectable } from '@angular/core';
import { Data } from "../data/data";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ServicioCrudService {
  UsuarioListRef: AngularFireList<any>;
  UsuarioRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createUser(user: Data) {
    return this.UsuarioListRef.push({
      Descripcion: user.Descripcion,
      Nombre: user.Nombre,
      Imagen: user.Imagen
    })
  }

  // Get Single
  getUser(id: string) {
    this.UsuarioRef = this.db.object('/Usuario/' + id);
    return this.UsuarioRef;
  }

  // Get List
  getUserList() {
    this.UsuarioListRef = this.db.list('/Usuario');
    return this.UsuarioListRef;
  }

  // Update
  updateUser(id, user: Data) {
    return this.UsuarioRef.update({
      Descripcion: user.Descripcion,
      Nombre: user.Nombre,
      Imagen: user.Imagen
    })
  }

  // Delete
  deleteUser(id: string) {
    this.UsuarioRef = this.db.object('/Usuario/' + id);
    this.UsuarioRef.remove();
  }
  
}
