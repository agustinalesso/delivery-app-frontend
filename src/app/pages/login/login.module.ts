import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginRouterModule } from "./login-routing.module";
import { LoginComponent } from './login.component';

@NgModule({
    declarations:[
    LoginComponent
  ],
    imports: [
        LoginRouterModule,
        FormsModule,
    ],
    exports: [],
    providers: []
})
export class LoginModule {}