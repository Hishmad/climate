import { CommonItemModule } from './../../common-item/common-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { EditUserMemberComponent } from '../edit-user-member/edit-user-member.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/main/landing/welcome']);


const routes: Routes = [
  { path: '', redirectTo: '/userEdit', pathMatch: 'full' },
  { path: ':id', component: EditUserMemberComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: '**', redirectTo: '/main/landing/welcome' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonItemModule
  ],
  declarations: [
    EditUserMemberComponent
  ],
  providers: [

  ],
})
export class UserEditModule { }
