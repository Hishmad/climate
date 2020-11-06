import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'main',
    loadChildren: () =>
      import('./app-main/app-main.module').then(m => m.AppMainModule)
  },
  {
    path: 'akun',
    loadChildren: () =>
      import('./akun/akun.module').then(m => m.AkunModule)
  },
  { path: '**', redirectTo: '/main/landing/welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
