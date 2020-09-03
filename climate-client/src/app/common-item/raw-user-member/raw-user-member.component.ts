import { environment } from './../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { ModelUserMemberV2 } from '../../../../../shared-logic/model-user/model-user-member-v2';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Subscription, fromEvent } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, take } from 'rxjs/operators';

declare let cloudinary: any;


@Component({
  selector: 'app-raw-user-member',
  templateUrl: './raw-user-member.component.html',
  styleUrls: ['./raw-user-member.component.scss']
})
export class RawUserMemberComponent implements OnInit, OnDestroy {

  @Input() id: string; // genesis
  @Input() userMember: ModelUserMemberV2;
  @Output() createUser = new EventEmitter();
  @Output() deleteUserImages = new EventEmitter();
  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  myWidget: any;
  detailForm: FormGroup;
  listOfCloudinaryImages: any[] = [];
  newListOfCloudinaryImages: any[] = [];
  _listOfPhotoProfilePublicId: string[] = [];

  overlayRef: OverlayRef | null;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  get userFullName(): AbstractControl {
    return this.detailForm.get('userFullName');
  }

  get userMobileNumber(): AbstractControl {
    return this.detailForm.get('userMobileNumber');
  }

  

  ngOnInit(): void {
    this.detailForm = this.initFormBuilder();
    this.fetchData();

  }

  openSnackBar() {
    this._snackBar.open('Update success, thank you.', 'OK', {
      duration: 5000,
    });
  }


  onUploadImage(): void {
    this.myWidget.open();
  }

  open(event: MouseEvent, thumb: string) {
    this.close();
    event.preventDefault();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: event.x, y: event.y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: thumb
    }));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close());

  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }


  onUserDeleteImages(publicId: string): void {
    const list = [publicId];
    this._listOfPhotoProfilePublicId = this.deleteElementFromList(this._listOfPhotoProfilePublicId, publicId);
    this.newListOfCloudinaryImages = this.deleteElementById(this.newListOfCloudinaryImages, list);
    this.listOfCloudinaryImages = this.deleteElementById(this.listOfCloudinaryImages, list);
    this.deleteTempImagesFromCloudinary(list);
    this.close();
  }


  onSubmit(formValues: any): void {
    const dtoCreate = this.dtoCreate(
      this.id,
      formValues,
      this.listOfCloudinaryImages,
      this.newListOfCloudinaryImages
    );
    this._listOfPhotoProfilePublicId = [];
    this.createUser.emit(dtoCreate);
  }

  ngOnDestroy(): void {
    this.close();
    if (this._listOfPhotoProfilePublicId.length > 0) {
      this.deleteTempImagesFromCloudinary(this._listOfPhotoProfilePublicId);
      this._listOfPhotoProfilePublicId = [];
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private deleteTempImagesFromCloudinary(deletePublicIds: string[]): void {
    const dtoCreate = new ModelUserMemberV2();
    dtoCreate.id = this.id;
    dtoCreate.idAdmin = this.id;
    dtoCreate.listOfPhotoProfilePublicId = [...deletePublicIds];
    this.deleteUserImages.emit(dtoCreate);
  }

  private dtoCreate(
    id: string,
    formValues: any,
    listOfCloudinaryImages: any[],
    newListOfCloudinaryImages: any[]
  ): ModelUserMemberV2 {
    const dtoCreate = new ModelUserMemberV2();
    dtoCreate.id = id;
    dtoCreate.userFullName = formValues.userFullName;
    dtoCreate.userMobileNumber = `${formValues.userMobileNumber}`;
    dtoCreate.idAdmin = id;
    dtoCreate.listOfCloudinaryImages = [...listOfCloudinaryImages, ...newListOfCloudinaryImages];

    return dtoCreate;
  }


  private fetchData(): void {
    this.initUserMember();
    this.myWidget = this.initCloudinaryWidget();
  }

  private initUserMember(): void {

    if (typeof this.userMember !== 'undefined') {

      this.userFullName.setValue(this.userMember.userFullName);
      this.userMobileNumber.setValue(this.userMember.userMobileNumber);

      if (typeof this.userMember.listOfCloudinaryImages !== 'undefined') {
        this.listOfCloudinaryImages = [...this.userMember.listOfCloudinaryImages];
      }

    }
  }


  private initCloudinaryWidget(): any {
    return cloudinary.createUploadWidget(
      {
        cloudName: environment.cloudinary.cloudName,
        uploadPreset: environment.cloudinary.uploadPreset,
        folder: `lessgo/${this.id}/personal`,
        quality: 'auto:low',
        maxFiles: 6,
        clientAllowedFormats: ['png', 'jpeg', 'jpg'],
        maxFileSize: 600000,
        maxImageWidth: 1000,
        maxImageHeight: 1000,
        cropping: true
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {

          const obj = {
            id: result.info.id,
            secure_url: result.info.secure_url,
            thumbnail_url: result.info.thumbnail_url,
            public_id: result.info.public_id,
            asset_id: result.info.asset_id,
            batchId: result.info.batchId,
            format: result.info.format,
            resource_type: result.info.resource_type,
            signature: result.info.signature,
            version: result.info.version,
            version_id: result.info.version_id,
            height: result.info.height,
            width: result.info.width
          };

          this.newListOfCloudinaryImages.push(obj);
          this._listOfPhotoProfilePublicId.push(result.info.public_id);
        }
      }
    );
  }

  private initFormBuilder(): FormGroup {
    return this.fb.group({
      userFullName: ['', [Validators.maxLength(200), Validators.required]],
      userMobileNumber: ['', [Validators.required]]
    });
  }


  private deleteElementById(origin: any[], ids: string[]): any[] {
    if (typeof ids === 'undefined') return [];
    if (typeof origin === 'undefined') return [];
    if (!origin) return [];
    if (!ids) return [];
    const list = [...origin];
    return list.filter((item) => !ids.some(id => item.public_id === id));
  }

  private deleteElementFromList(origin: string[], deleteItem: string): string[] {
    if (typeof origin === 'undefined') return [];
    if (!origin) return [];
    const list = [...origin];
    return list.filter((item) => deleteItem !== item);
  }

}
