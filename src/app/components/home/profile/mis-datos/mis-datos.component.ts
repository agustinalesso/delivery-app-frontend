import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { GalletitaService } from 'src/app/services/galletita.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { finalize, Observable } from 'rxjs';
import { GlobalProviderService } from 'src/app/services/globalProvider.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styles: [
  ]
})
export class MisDatosComponent implements OnInit {

  usuario: IUsuario;
  downloadURL : Observable<string>;

  constructor(
    private _galletita: GalletitaService,
    private _usuario: UsuarioService,
    private _globalProvider: GlobalProviderService,
    private storage: AngularFireStorage
  ){}

  get haySesion(){
    return this._galletita.checkCookie('_lg');
  }

  ngOnInit(): void {
    this.usuario = this._galletita.getCookie('_lg');
  }

  onSubmit(formulario: NgForm){
    if(formulario.invalid) return;
    this._usuario.actualizarDatosUsuario(this.usuario.google_uid,this.usuario).subscribe(response => {
      if(response.status === 200){
        this._galletita.setCookie('_lg',response.usuarioActualizado);
        console.log(response);
        this._globalProvider.sendUser(response.usuarioActualizado);
      }
    })
  }

  uploadFile(event){
    const file = event.target.files[0];
    const filePath = `gs://deliverysanjusto.appspot.com/uploads/profile/${this.usuario.google_uid}-${file.name}`;
    const ref = this.storage.refFromURL(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(
      finalize( () => {
        this.downloadURL = ref.getDownloadURL()
        this.downloadURL.subscribe(response => {
          this.usuario.imagen_perfil = response;
          this._globalProvider.sendNewProfileImage(response);
        })
      })
    ).subscribe();
  }

}
