import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styles: [
  ]
})
export class MisDatosComponent implements OnInit {

  @ViewChild('inputFileRef') 
  inputFileRef:ElementRef;
  @ViewChild('imageRef') 
  imageRef:ElementRef;

  public usuario: IUsuario;
  private pendingUpload: boolean = false;
  private imagePath: string | null;
  private imageFile: File | null;
  private imageFileName: string | null;

  constructor(
    private _galletita: GalletitaService,
    private _usuario: UsuarioService,
    private _globalProvider: GlobalProviderService,
    private _angularFireStorage: AngularFireStorage
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    const cookie: IUsuario = this._galletita.getCookie('_lg');
    this._usuario.obtenerDatosUsuario(cookie.google_uid).subscribe( response => {
      this.usuario = response;
    })
  }

  onSubmit(formulario: NgForm){
    if(formulario.invalid) return;

    if(this.pendingUpload){
      Swal.fire({
        title: 'Actualizando datos',
        text: 'Por favor espere...',
        allowEnterKey: false,
        allowEscapeKey: false,
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: false      
      });

      //Si tengo imágen, es nueva, primero borro la anterior.
      if(this.imagePath){
        if(this.usuario.imagen_perfil && this.usuario.imagen_perfil.trim().length > 0){
          const PATH_URL: string = `${environment.PROFILE_IMAGE_FB_PATH}${this.usuario.imagen_nombreArchivo}`;
          const REF = this._angularFireStorage.refFromURL(PATH_URL);
          REF.delete();
        }
      }

      const ref = this._angularFireStorage.refFromURL(this.imagePath);
      ref.put(this.imageFile)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe( response => {
            this.usuario.imagen_perfil = response;
            this.usuario.imagen_nombreArchivo = this.imageFileName;
            this._usuario.actualizarDatosUsuario(this.usuario.google_uid,this.usuario).subscribe(this.updateUserLocally)

          });
        })
      )
      .subscribe()
    }

  }

  private updateUserLocally = ( user: any ): void => {
    this._galletita.setCookie('_lg',user.usuarioActualizado);
    this.usuario = user.usuarioActualizado;
    this._globalProvider.enviarDatosUsuario(this.usuario);
    this.pendingUpload = false;
    this.imageFile = null;
    this.imagePath = null;
    this.inputFileRef.nativeElement.value = null;
    Swal.close();
    Swal.fire('Éxito','Datos actualizados correctamente','success');
  }

  removerImagenDePerfil(){
    if(!this.usuario.imagen_nombreArchivo) return;
    const PATH_URL: string = `${environment.PROFILE_IMAGE_FB_PATH}${this.usuario.imagen_nombreArchivo}`;
    const REF = this._angularFireStorage.refFromURL(PATH_URL);
    REF.delete().pipe(
      finalize( () => {
        this.usuario.imagen_nombreArchivo = null;
        this.usuario.imagen_perfil = null;
        this._usuario.actualizarDatosUsuario(this.usuario.google_uid,this.usuario).subscribe(this.updateUserLocally)
      })
    ).subscribe();
  }

  markForUpload(event){
    this.pendingUpload = true;
    this.imageFile = event.target.files[0];
    this.imageFileName = `${this.usuario.google_uid}-${event.target.files[0].name}`;
    this.imagePath = `${environment.PROFILE_IMAGE_FB_PATH}${this.imageFileName}`;
  }

}
