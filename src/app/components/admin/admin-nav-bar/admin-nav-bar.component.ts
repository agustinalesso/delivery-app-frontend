import { Component, OnInit } from '@angular/core';
import { IShopData } from 'src/app/interfaces/shop.interface';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styles: [
  ]
})
export class AdminNavBarComponent implements OnInit {

  private usuario: IUsuario;
  private shop: IShopData;
  public shopHasData: boolean = false;

  constructor(
    private _shop: ShopService,
    private _galletita: GalletitaService
  ){
    this.usuario = this._galletita.getCookie('_lg');
  }

  ngOnInit(): void {
    this._shop.getShopData(this.usuario.google_uid).subscribe( (response:any) => {
      if(response.myshop){
        this.shopHasData = true;
        this.shop = response.myshop;
      }
    })
  }

}
