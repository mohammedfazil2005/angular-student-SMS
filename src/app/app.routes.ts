import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PNFComponent } from './components/pnf/pnf.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
import { EditComponent } from './components/edit/edit.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';


export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'admin',canActivate:([adminGuard]),component:HomeComponent},
    {path:'editprofile/:id',canActivate:([adminGuard]),component:EditprofileComponent},
    {path:'users',canActivate:([userGuard]),loadChildren:()=>import("../app/modules/user/user.module").then((res)=>res.UserModule)},
    {path:'**',component:PNFComponent}
]
   
