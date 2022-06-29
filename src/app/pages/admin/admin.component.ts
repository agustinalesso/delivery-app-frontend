import { Component, OnInit } from '@angular/core';
import { GalletitaService } from 'src/app/services/galletita.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(
    private _galletita: GalletitaService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._galletita.esAdmin;
  }

}
