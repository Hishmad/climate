import { Subscription, fromEvent } from 'rxjs';
import { ModelUserMemberV2 } from './../../../../../shared-logic/model-user/model-user-member-v2';
import { environment } from './../../../environments/environment.prod';
import { ModelPosting } from './../../../../../shared-logic/model-posting/model-posting';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import places from 'places.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { filter, take } from 'rxjs/operators';
declare let cloudinary: any;

@Component({
  selector: 'app-raw-post-v1',
  templateUrl: './raw-post-v1.component.html',
  styleUrls: ['./raw-post-v1.component.scss'],
})
export class RawPostV1Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() user: ModelUserMemberV2;
  @Output() detailNewPost = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() deletePostingImages = new EventEmitter();
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  myWidget: any;
  newListOfCloudinaryImages: any[] = [];
  listOfCloudinaryImages: any = [];
  _listOfImagePublicId: string[] = [];

  detailForm: FormGroup;
  placesInstance: any;

  overlayRef: OverlayRef | null;
  sub: Subscription;

  listStatus = [
    { value: 'CRITICAL', viewValue: 'CRITICAL' },
    { value: 'DANGER', viewValue: 'DANGER' },
    { value: 'ALERT', viewValue: 'ALERT' },
    { value: 'ATTENTION', viewValue: 'ATTENTION' },
  ];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {
    this.initFormBuilder();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.detailForm.controls;
  }

  get message(): AbstractControl {
    return this.detailForm.get('message');
  }

  get alertStatus(): AbstractControl {
    return this.detailForm.get('alertStatus');
  }

  get youtubeUrl(): AbstractControl {
    return this.detailForm.get('youtubeUrl');
  }

  get street(): AbstractControl {
    return this.detailForm.get('street');
  }

  get state(): AbstractControl {
    return this.detailForm.get('state');
  }

  get city(): AbstractControl {
    return this.detailForm.get('city');
  }

  get country(): AbstractControl {
    return this.detailForm.get('country');
  }

  get postCode(): AbstractControl {
    return this.detailForm.get('postCode');
  }

  get lat(): AbstractControl {
    return this.detailForm.get('lat');
  }

  get lng(): AbstractControl {
    return this.detailForm.get('lng');
  }

  ngOnInit(): void {
    this.myWidget = this.initCloudinaryWidget();
  }

  ngAfterViewInit(): void {
    this.placesInstance = places({
      appId: environment.algoliaPlaces.appId,
      apiKey: environment.algoliaPlaces.apiKey,
      container: this.searchElementRef.nativeElement,
    }).configure({
      language: 'id',
      countries: ['id'],
      aroundLatLngViaIP: true,
      useDeviceLocation: true,
    });

    this.placesInstance.on('change', (e: any) => {
      const obj = e.suggestion;
      this.street.setValue(obj.value || '');
      this.state.setValue(obj.administrative || '');
      this.city.setValue(obj.city || '');
      this.country.setValue(obj.country || '');
      this.postCode.setValue(obj.postcode || 0);
      this.lat.setValue(obj.latlng.lat || 0);
      this.lng.setValue(obj.latlng.lng || 0);
    });
  }

  reset(): void {
    this.restForm();
    this.cancel.emit(false);
  }

  onUploadImage(): void {
    this.myWidget.open();
  }

  onSubmit(formValues: any): void {
    const length = this._listOfImagePublicId.length;
    if (!this.hasImageVideo(length)) return;
    const dtoCreate = this.dtoCreate(
      formValues,
      this.user,
      this.newListOfCloudinaryImages
    );
    this._listOfImagePublicId = [];
    this.detailNewPost.emit(dtoCreate);
    this.restForm();
  }

  open(event: MouseEvent, thumb: string) {
    this.close();
    event.preventDefault();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: event.x, y: event.y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu, this.viewContainerRef, {
        $implicit: thumb,
      })
    );

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
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
    this._listOfImagePublicId = this.deleteElementFromList(
      this._listOfImagePublicId,
      publicId
    );
    this.newListOfCloudinaryImages = this.deleteElementById(
      this.newListOfCloudinaryImages,
      list
    );
    this.deleteTempImagesFromCloudinary(list);
    this.close();
  }

  ngOnDestroy(): void {
    this.restForm();
    this.close();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private deleteTempImagesFromCloudinary(deletePublicIds: string[]): void {
    const dtoCreate = new ModelPosting();
    dtoCreate.id = this.user.id;
    dtoCreate.idAdmin = this.user.id;
    dtoCreate.listOfImagePublicId = [...deletePublicIds];
    this.deletePostingImages.emit(dtoCreate);
  }

  private dtoCreate(
    formValues: any,
    user: ModelUserMemberV2,
    newListOfCloudinaryImages: any[]
  ): ModelPosting {
    const dtoCreate: ModelPosting = new ModelPosting();
    dtoCreate.idUser = user.id;
    dtoCreate.idAdmin = user.id;
    dtoCreate.alertStatus = formValues.alertStatus;
    dtoCreate.youtubeUrl = formValues.youtubeUrl;
    dtoCreate.userName = this.checkUserName(user);
    dtoCreate.userMobileNumber = this.checkUserMobileNumber(user);
    dtoCreate.message = formValues.message;
    dtoCreate.address = formValues.street;
    dtoCreate.city = formValues.city;
    dtoCreate.state = formValues.state;
    dtoCreate.country = formValues.country;
    dtoCreate.postCode = +formValues.postCode;
    dtoCreate.lat = +formValues.lat;
    dtoCreate.lng = +formValues.lng;
    dtoCreate.listOfCloudinaryImages = [...newListOfCloudinaryImages];
    dtoCreate.photoUserUrl = this.passProfilePhoto(user.listOfCloudinaryImages);
    return dtoCreate;
  }

  private checkUserName(user: ModelUserMemberV2): string {
    if (typeof user.userFullName !== 'undefined') return user.userFullName;
    return '';
  }

  private checkUserMobileNumber(user: ModelUserMemberV2): string {
    if (typeof user.userMobileNumber !== 'undefined')
      return user.userMobileNumber;
    return '';
  }

  private restForm(): void {
    this.detailForm.reset();
    if (this._listOfImagePublicId.length > 0) {
      this.deleteTempImagesFromCloudinary(this._listOfImagePublicId);
    }
    this._listOfImagePublicId = [];
    this.newListOfCloudinaryImages = [];
  }

  private initCloudinaryWidget(): any {
    return cloudinary.createUploadWidget(
      {
        cloudName: environment.cloudinary.cloudName,
        uploadPreset: environment.cloudinary.uploadPreset,
        folder: `climate/${this.user.id}`,
        quality: 'auto',
        maxFiles: 6,
        maxFileSize: 12000000,
        clientAllowedFormats: [
          'png',
          'jpeg',
          'jpg',
          'mp4',
          'ogv',
          'webm',
          'mov',
        ],
        maxImageWidth: 2400,
        maxImageHeight: 1600,
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
            width: result.info.width,
          };

          this.newListOfCloudinaryImages.push(obj);
          this._listOfImagePublicId.push(result.info.public_id);
        }
      }
    );
  }

  private passProfilePhoto(listOfCloudinaryImages: any[]): string {
    if (typeof listOfCloudinaryImages !== 'undefined') {
      return listOfCloudinaryImages[0].secure_url;
    }
    return '';
  }

  private deleteElementById(origin: any[], ids: string[]): any[] {
    if (typeof ids === 'undefined') return [];
    if (typeof origin === 'undefined') return [];
    if (!origin) return [];
    if (!ids) return [];
    const list = [...origin];
    return list.filter((item) => !ids.some((id) => item.public_id === id));
  }

  private deleteElementFromList(
    origin: string[],
    deleteItem: string
  ): string[] {
    if (typeof origin === 'undefined') return [];
    if (!origin) return [];
    const list = [...origin];
    return list.filter((item) => deleteItem !== item);
  }

  private hasImageVideo(length: number): boolean {
    if (length > 0) {
      this._snackBar.open('Thank you, your message will be processed', 'OK', {
        duration: 5000,
      });
      return true
    };
    this._snackBar.open('Please upload one image or video before you can submit', 'OK', {
      duration: 5000,
    });
    return false;
  }

  private initFormBuilder(): void {
    this.detailForm = this.fb.group({
      message: ['', [Validators.maxLength(250), Validators.required]],
      alertStatus: ['', [Validators.required]],
      youtubeUrl: ['', [Validators.pattern(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/)]],
      street: ['', [Validators.required]],
      state: [''],
      city: [''],
      country: [''],
      postCode: [''],
      lat: [''],
      lng: [''],
    });
  }
}
