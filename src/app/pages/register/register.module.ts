import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from './register.component';
import { RegisterRouterModule } from './register.routing.module'

@NgModule({
    declarations: [
      RegisterComponent,
    ],
    imports:[
      RegisterRouterModule,
      FormsModule
    ],
    exports:[
        RegisterComponent
    ],
})
export class RegisterModule {}