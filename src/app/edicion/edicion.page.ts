import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ServicioCrudService } from "../servicios/servicio-crud.service";
@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.page.html',
  styleUrls: ['./edicion.page.scss'],
})
export class EdicionPage implements OnInit {
  updateListForm: FormGroup;
  id: any;
  constructor(
    private servicio: ServicioCrudService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.servicio.getUser(this.id).valueChanges().subscribe(res => {
      this.updateListForm.setValue(res);
    });
   }

  ngOnInit() {
    this.updateListForm = this.fb.group({
      Descripcion: [''],
      Nombre: [''],
      Imagen: ['']
    })
    console.log(this.updateListForm.value)
  }

  updateForm() {
    this.servicio.updateUser(this.id, this.updateListForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

}
