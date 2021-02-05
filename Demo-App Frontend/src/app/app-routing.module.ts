import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/Components/page-not-found/page-not-found.component';

const routes: Routes = [
  
  {path:'', redirectTo: '/home', pathMatch: 'full' },
  {path:'home',
    loadChildren: () => import('./modules/user/users.module').then(m => m.UserModule) 
  },
  {path: 'addupdateuser', 
    loadChildren: () => import('./modules/userAddUpdate/add-update-user-page.module').then(m => m.AddUpdateModule) 
  },
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
