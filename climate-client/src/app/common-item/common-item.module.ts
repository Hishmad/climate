import { CardPostUserAssetV2Component } from './card-post-user-asset-v2/card-post-user-asset-v2.component';
import { CardMessageV1Component } from './card-message-v1/card-message-v1.component';
import { RawDetailPostV1Component } from './raw-detail-post-v1/raw-detail-post-v1.component';
import { RawPostV1Component } from './raw-post-v1/raw-post-v1.component';
import { CardPostV2Component } from './card-post-v2/card-post-v2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { RawUserMemberComponent } from './raw-user-member/raw-user-member.component';

@NgModule({
  declarations: [
    RawUserMemberComponent,
    CardPostV2Component,
    RawPostV1Component,
    RawDetailPostV1Component,
    CardMessageV1Component,
    CardPostUserAssetV2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CarouselModule,
    MatProgressSpinnerModule,
    MatRadioModule,
  ],
  exports: [
    RawUserMemberComponent,
    CardPostV2Component,
    RawPostV1Component,
    RawDetailPostV1Component,
    CardMessageV1Component,
    CardPostUserAssetV2Component
  ],
  providers: [],
})
export class CommonItemModule { }
