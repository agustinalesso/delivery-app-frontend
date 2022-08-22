import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { IShopData } from 'src/app/interfaces/shop.interface';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styles: [
  ]
})
export class ShopFormComponent implements OnInit {

  @Input() shopData: IShopData;
  @Input() usuario: IUsuario | null;
  @ViewChild('bannerImageRef') inputBannerRef : ElementRef;
  @ViewChild('profileImageRef') profileBannerRef : ElementRef;
  private bannerFile: File | null;
  private bannerFileName: string | null;
  private bannerFilePath: string | null;
  private profileFile: File | null;
  private profileFileName: string | null;
  private profileFilePath: string | null;
  public shop: IShopData | null;

  constructor(
    private _globalProvider: GlobalProviderService,
    private _angularFireStorage: AngularFireStorage
  ){}


  ngOnInit(): void {
    this.shop = {...this.shopData};
  }

  emitShopData($event){
    this._globalProvider.enviarDatosShop(this.shop);
  }

  enviarFormulario(formulario: NgForm){
    if(formulario.invalid) return;
    console.log(this.shop)

    const bannerRef = this._angularFireStorage.refFromURL(this.bannerFilePath);
    const profileRef = this._angularFireStorage.refFromURL(this.profileFilePath);

    //Logica para enviar al backend
    // => ...
  }

  imageChangeHandler(event:any,type:string){
    if(type === 'banner'){
      this.bannerFile = event.target.files[0];
      this.bannerFileName = `${this.usuario.google_uid}-${this.bannerFile.name}`;
      this.bannerFilePath = `${environment.SHOP_BANNER_IMAGE_FB_PATH}${this.bannerFileName}`
      console.log(this.bannerFilePath);
    }else{
      this.profileFile = event.target.files[0];
      this.profileFileName = `${this.usuario.google_uid}-${this.profileFile.name}`;
      this.profileFilePath = `${environment.SHOP_PROFILE_IMAGE_FB_PATH}${this.profileFileName}`
      console.log(this.profileFilePath);
    }
  }

}
