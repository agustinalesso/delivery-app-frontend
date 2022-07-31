import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IShopData } from 'src/app/interfaces/shop.interface';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faBookmark } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-shop-preview',
  templateUrl: './shop-preview.component.html',
  styles: [
  ]
})
export class ShopPreviewComponent implements OnInit {

  facebookIcon = faFacebook;
  instagramIcon = faInstagram;
  emailIcon = faEnvelope;
  websiteIcon = faBookmark;
  shopSubscription: Subscription;
  shopData: IShopData = {
    nombre: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    sitio_web: '',
    facebook_url: '',
    instagram_url: '',
    email: '',
    banner_imagen_url: '',
    perfil_imagen_url: ''
  };

  constructor(
    private _globalProvider: GlobalProviderService
  ){}

  ngOnInit(): void {

    this.shopSubscription = this._globalProvider.escucharDatosShop().subscribe( response => {
      this.shopData = response;
      console.log(this.shopData);
    } )

  }

}
