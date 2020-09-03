import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelReviewV2 } from './../../../../../shared-logic/model-review/model-review-v2';
import { ModelUserMemberV2 } from './../../../../../shared-logic/model-user/model-user-member-v2';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-message-v1',
  templateUrl: './card-message-v1.component.html',
  styleUrls: ['./card-message-v1.component.scss']
})
export class CardMessageV1Component implements OnInit {

  private _user: ModelUserMemberV2
  @Input()
  set user(user: ModelUserMemberV2) {
    if (typeof user === 'undefined') this._user = null;
    this._user = user;
  }
  get user(): ModelUserMemberV2 { return this._user; }
  @Input() chats: ModelReviewV2[];
  @Output() replyMessage = new EventEmitter();

  detailFormReply: FormGroup;
  isReply = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.initFormBuilderReply();
  }

  get comment(): FormControl {
    return <FormControl>this.detailFormReply.get('comment');
  }

  onSubmit(formValues: any, item: ModelReviewV2, user: ModelUserMemberV2): void {
    const dtoCreate = this.onSubmitReplyHelper(formValues, item, user);
    this.openSnackBar();
    this.detailFormReply.reset();
    this.replyMessage.emit(dtoCreate);
  }

  private onSubmitReplyHelper(formValues: any, item: ModelReviewV2, user: ModelUserMemberV2): ModelReviewV2 {
    const reply: ModelReviewV2 = new ModelReviewV2();
    reply.idPosting = item.idPosting;
    reply.idHost = item.idHost;
    reply.idAdmin = user.id;
    reply.idUser = user.id;
    reply.userFullName = user.userFullName;
    reply.ratings = 0;
    reply.comment = formValues.comment;
    reply.photoUserUrl = this.passProfilePhoto(user.listOfCloudinaryImages)

    return new ModelReviewV2(
      item.id,
      item.idPosting,
      item.idHost,
      item.idUser,
      item.ratings,
      item.userFullName,
      item.photoUserUrl,
      item.comment,
      [reply],
      ''
    );

  }

  private initFormBuilderReply(): void {
    this.detailFormReply = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(250)]]
    });

  }

  private passProfilePhoto(listOfCloudinaryImages: any[]): string {
    if (typeof listOfCloudinaryImages !== 'undefined') {
      return listOfCloudinaryImages[0].secure_url;
    }

    return '';
  }

  private openSnackBar() {
    this._snackBar.open('Terima kasih posting telah berhasil terupdate', 'OK', {
      duration: 5000,
    });
  }

}
