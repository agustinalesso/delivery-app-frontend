import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IShopData } from 'src/app/interfaces/shop.interface';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styles: [
  ]
})
export class ShopFormComponent implements OnInit {

  @ViewChild('bannerImageRef') inputBannerRef : ElementRef;
  @ViewChild('profileImageRef') profileBannerRef : ElementRef;
  bannerFile: File | null;
  profileFile: File | null;

  constructor(
    private _globalProvider: GlobalProviderService
  ){}

  @Input() shopData: IShopData;

  shop: IShopData | null;

  ngOnInit(): void {
    this.shop = {...this.shopData};
  }

  emitShopData($event){
    this._globalProvider.enviarDatosShop(this.shop);
  }

  enviarFormulario(formulario: NgForm){
    if(formulario.invalid) return;
    console.log(this.shop)
    //Logica para enviar al backend
    // => ...
  }

  imageChangeHandler(event:any,type:string){
    if(type === 'banner'){
      this.bannerFile = event.target.files[0];
    }else{
      this.profileFile = event.target.files[0];
    }
  }

}
