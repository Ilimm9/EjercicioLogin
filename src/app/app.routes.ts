
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';  
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  {path: '',redirectTo: 'login', pathMatch: 'full'},
    {path: 'login',component: LoginComponent},
    {path:'home', component: HomeComponent,children:[
      {path: '',redirectTo: 'usuarios', pathMatch: 'full'},
      {path:'usuarios', component: UserListComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

    export class AppModule { }


