import { ModelReviewUrls } from './../../../../shared-logic/model-review/model-review-urls';
import { ModelReviewV2 } from './../../../../shared-logic/model-review/model-review-v2';
import { ModelPostingLike } from './../../../../shared-logic/model-posting/model-posting-like';
import { DtoUrl } from './../../../../shared-logic/dto-container/dto-url';
import { Dto } from './../../../../shared-logic/dto-container/dto';
import { ModelUserUrls } from './../../../../shared-logic/model-user/model-user-urls';
import { ModelUserMemberV2 } from './../../../../shared-logic/model-user/model-user-member-v2';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ModelUser } from './../../../../shared-logic/model-user/model-user';
import { ModelPostingUrls } from './../../../../shared-logic/model-posting/model-posting-urls';
import { ModelPosting } from './../../../../shared-logic/model-posting/model-posting';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { PresenceService } from './presence.service';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of, from } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataModelService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private presence: PresenceService,
    private afs: AngularFirestore
  ) { }

  get user$(): Observable<ModelUser> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const obj: ModelUser = new ModelUser(user.uid, user.email);
          return of(obj);
        } else {
          return of(null);
        }
      }),
      catchError((_) => of(null))
    );
  }

  getListOfNotifications$(limitFirst: number): Observable<any[]> {
    return this.user$.pipe(
      switchMap((user) => {
        return this.db
          .list<any>(
            `${ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION}/${user.id}`,
            (ref) => ref.orderByChild('timestamp').limitToFirst(limitFirst)
          )
          .valueChanges();
      })
    );
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);

      await (await this.afAuth.currentUser).sendEmailVerification({
        url: 'https://climate.id/#/akun/signin',
        handleCodeInApp: true,
        dynamicLinkDomain: 'climateid.page.link',
      });

      /** signout and resolve */
      await this.presence.signOut();
      return Promise.resolve('Email verfikasi telah terkirim, mohon di reply.');
    } catch (error) {
      /** signout and reject */
      await this.presence.signOut();
      return Promise.reject(error);
    }
  }

  async emailSignUpId(
    email: string,
    password: string,
    idPosting: string
  ): Promise<any> {
    try {
      /** pass the email and password to the auth server */
      await this.afAuth.createUserWithEmailAndPassword(email, password);

      await (await this.afAuth.currentUser).sendEmailVerification({
        url: `https://climate.id/#/akun/signinId/${idPosting}`,
        handleCodeInApp: true,
        dynamicLinkDomain: 'climateid.page.link',
      });

      /** signout and resolve */
      await this.presence.signOut();
      return Promise.resolve('Email verfikasi telah terkirim, mohon di reply.');
    } catch (error) {
      /** signout and reject */
      await this.presence.signOut();
      return Promise.reject(error);
    }
  }

  async emailLogin(email: string, password: string): Promise<any> {
    try {
      /** pass the email and password to the auth server */
      const result1 = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      /** incase the user's email have not been verified */
      if (!result1.user.emailVerified) {
        /** create a special object that will be sent to the server  */
        await (await this.afAuth.currentUser).sendEmailVerification({
          url: 'https://climate.id/#/akun/signin',
          handleCodeInApp: true,
          dynamicLinkDomain: 'climateid.page.link',
        });

        await this.presence.signOut();
        return Promise.reject(
          'Password salah, Anda belum melakukan verifikasi atau akun belum ada'
        );
      } else {
        /** return the user's object when resolved */
        return Promise.resolve(result1);
      }
    } catch (error) {
      /** signout and reject */
      await this.presence.signOut();
      return Promise.reject(
        'Password salah, Anda belum melakukan verifikasi atau akun belum ada'
      );
    }
  }

  async emailLoginId(
    email: string,
    password: string,
    idPosting: string
  ): Promise<any> {
    try {
      /** pass the email and password to the auth server */
      const result1 = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      /** incase the user's email have not been verified */
      if (!result1.user.emailVerified) {
        /** pass the special object to send email verification to the user's inbox */
        await (await this.afAuth.currentUser).sendEmailVerification({
          url: `https://climate.id/#/akun/signinId/${idPosting}`,
          handleCodeInApp: true,
          dynamicLinkDomain: 'climateid.page.link',
        });

        await this.presence.signOut();
        return Promise.reject(
          'Password salah, Anda belum melakukan verifikasi atau akun belum ada'
        );
      } /*[end] if */

      return Promise.resolve(result1);
    } catch (error) {
      /** signout and reject */
      await this.presence.signOut();
      return Promise.reject(
        'Password salah, Anda belum melakukan verifikasi atau akun belum ada'
      );
    }
  }

  emailPasswordReset(email: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.afAuth.sendPasswordResetEmail(email, {
          url: 'https://climate.id/#/akun/signin',
        });
        return resolve('Sent password reset email to your email address');
      } catch (error) {
        return reject(error);
      }
    });
  }

  emailPasswordResetId(email: string, idPosting: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await this.afAuth.sendPasswordResetEmail(email, {
          url: `https://climate.id/#/akun/signinId/${idPosting}`,
        });
        return resolve('Sent password reset email to your email address');
      } catch (error) {
        return reject(error);
      }
    });
  }

  async GoogleAuth(): Promise<any> {
    try {
      return await this.authLogin(new this.presence.auth.GoogleAuthProvider());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async TwitterAuth(): Promise<any> {
    try {
      return await this.authLogin(new this.presence.auth.TwitterAuthProvider());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GithubAuth(): Promise<any> {
    try {
      return await this.authLogin(new this.presence.auth.GithubAuthProvider());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async authLogin(provider: any): Promise<any> {
    try {
      return await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getDocument(url: string): Observable<any> {
    const afd: AngularFirestoreDocument<any> = this.afs.doc(`${url}`);
    return afd.valueChanges();
  }

  getListOfDocuments(url: string): Observable<any[]> {
    const afc: AngularFirestoreCollection<any> = this.afs.collection(`${url}`);
    return afc.valueChanges();
  }

  getListOfPostingDesc(url: string): Observable<any[]> {
    const afc: AngularFirestoreCollection<any> = this.afs.collection(
      `${url}`,
      (ref) => ref.orderBy('timestamp', 'desc')
    );
    return afc.valueChanges();
  }

  getListOfDocumentsQuery(
    url: string,
    property: string,
    query: any,
    sortProperty: string
  ): Observable<any[]> {
    const afc: AngularFirestoreCollection<any> = this.afs.collection(
      `${url}`,
      (ref) => ref.where(property, '==', query).orderBy(sortProperty, 'desc')
    );
    return afc.valueChanges();
  }

  getListOfDatabase(location: string): Observable<any[]> {
    const ref = this.db.list<any>(`${location}`);
    return ref.valueChanges();
  }


  getListOfPosting$(): Observable<ModelPosting[]> {
    return this.getListOfPostingDesc(
      ModelPostingUrls.URL_MODEL_POSTING_MESSAGE
    );
  }

  getUserMemberV2$(
    user$: Observable<ModelUser>
  ): Observable<ModelUserMemberV2> {
    return user$.pipe(
      switchMap((user: ModelUser) => {
        if (!user) {
          return of(null);
        }
        return this.getDocument(
          `${ModelUserUrls.URL_MODEL_USER_MEMBERS_V2}/${user.id}`
        );
      })
    );
  }

  getUserMemberV2Edit$(route: ActivatedRoute): Observable<ModelUserMemberV2> {
    return route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.getDocument(
          `${ModelUserUrls.URL_MODEL_USER_MEMBERS_V2}/${params.get('id')}`
        );
      })
    );
  }

  getDocumentPosting$(route: ActivatedRoute): Observable<ModelPosting> {
    return route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.getDocument(
          `${ModelPostingUrls.URL_MODEL_POSTING_MESSAGE}/${params.get('id')}`
        );
      })
    );
  }

  wrapperCreateNewPost(model: ModelPosting): Observable<ModelPosting> {
    return from(this.createNewPost(model));
  }

  private async createNewPost(model: ModelPosting): Promise<ModelPosting> {
    try {
      const dtoCreate = { ...model };
      const databaseRef = this.presence.firebase.database();
      const refOne: DatabaseReference = databaseRef
        .ref(DtoUrl.DTO_USER)
        .child(dtoCreate.idAdmin)
        .push();

      dtoCreate.id = refOne.key;
      dtoCreate.timestamp = this.presence.timestamp;

      const dto: Dto = new Dto();
      dto.id = refOne.key;
      dto.url = ModelPostingUrls.DTO_CREATE_URL_MODEL_POSTING_MESSAGE;
      dto.targetUrl = ModelPostingUrls.URL_MODEL_POSTING_MESSAGE;
      dto.timestamp = this.presence.timestamp;

      dto.payload = dtoCreate;

      await this.db
        .object(
          `${DtoUrl.DTO_USER}/${ModelPostingUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`
        )
        .set(Object.assign({}, dto));

      return dtoCreate;
    } catch (error) {
      return new ModelPosting();
    }
  }

  wrapperUpdateUserMember(
    model: ModelUserMemberV2
  ): Observable<ModelUserMemberV2> {
    return from(this.updateUserMember(model));
  }

  private async updateUserMember(
    model: ModelUserMemberV2
  ): Promise<ModelUserMemberV2> {
    try {
      const dtoCreate = { ...model };
      const databaseRef = this.presence.firebase.database();
      const refOne: DatabaseReference = databaseRef
        .ref(DtoUrl.DTO_USER)
        .child(dtoCreate.idAdmin)
        .push();

      dtoCreate.timestamp = this.presence.timestamp;

      const dto: Dto = new Dto();
      dto.id = refOne.key;
      dto.url = ModelUserUrls.DTO_UPDATE_URL_MODEL_USER_MEMBER;
      dto.targetUrl = ModelUserUrls.URL_MODEL_USER_MEMBERS_V2;
      dto.timestamp = this.presence.timestamp;

      dto.payload = dtoCreate;

      this.db
        .object(
          `${DtoUrl.DTO_USER}/${ModelUserUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`
        )
        .set(Object.assign({}, dto));

      return dtoCreate;
    } catch (error) {
      return new ModelUserMemberV2();
    }
  }

  deleteUserMemberImages(model: ModelUserMemberV2): void {
    const dtoCreate = { ...model };
    const databaseRef = this.presence.firebase.database();
    const refOne: DatabaseReference = databaseRef
      .ref(DtoUrl.DTO_USER)
      .child(dtoCreate.idAdmin)
      .push();

    dtoCreate.timestamp = this.presence.timestamp;

    const dto: Dto = new Dto();
    dto.id = refOne.key;
    dto.url = ModelUserUrls.DTO_DELETE_URL_MODEL_USER_MEMBER_IMAGES;
    dto.targetUrl = ModelUserUrls.URL_MODEL_USER_MEMBERS_V2;
    dto.timestamp = this.presence.timestamp;

    dto.payload = dtoCreate;

    this.db
      .object(
        `${DtoUrl.DTO_USER}/${ModelUserUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`
      )
      .set(Object.assign({}, dto));
  }

  deletePostImages(model: ModelPosting): void {
    const dtoCreate = { ...model };
    const databaseRef = this.presence.firebase.database();
    const refOne: DatabaseReference = databaseRef
      .ref(DtoUrl.DTO_USER)
      .child(dtoCreate.idAdmin)
      .push();

    dtoCreate.id = refOne.key;
    dtoCreate.timestamp = this.presence.timestamp;

    const dto: Dto = new Dto();
    dto.id = refOne.key;
    dto.url = ModelPostingUrls.DTO_DELETE_URL_MODEL_POSTING_MEDIA_LIST;
    dto.targetUrl = ModelPostingUrls.URL_MODEL_POSTING_MESSAGE;
    dto.timestamp = this.presence.timestamp;

    dto.payload = dtoCreate;

    this.db
      .object(
        `${DtoUrl.DTO_USER}/${ModelPostingUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`
      )
      .set(Object.assign({}, dto));
  }

  getListOfUserLike$(route: ActivatedRoute): Observable<ModelPosting[]> {
    return route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.getListOfDatabase(`${ModelPostingUrls.URL_REF_MODEL_USER_POSTING_MESSAGE_LIKE}/${params.get('id')}`);
      })
    );
  }

  getListOfUserPublicPosting$(route: ActivatedRoute): Observable<ModelPosting[]> {
    return route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.getListOfDocumentsQuery(`${ModelPostingUrls.URL_MODEL_POSTING_MESSAGE}`, 'idUser', params.get('id'), 'timestamp');
      })
    );
  }

  wrapperUpdatePostLike(model: ModelPostingLike): Observable<ModelPostingLike> {
    return from(this.updateLikePost(model));
  }

  private async updateLikePost(
    model: ModelPostingLike
  ): Promise<ModelPostingLike> {
    try {
      const dtoCreate = { ...model };
      const databaseRef = this.presence.firebase.database();
      const refOne: DatabaseReference = databaseRef
        .ref(DtoUrl.DTO_USER)
        .child(dtoCreate.idAdmin)
        .push();
      dtoCreate.id = refOne.key;
      dtoCreate.timestamp = this.presence.timestamp;
      const dto: Dto = new Dto();
      dto.id = refOne.key;
      dto.timestamp = this.presence.timestamp;
      dto.payload = dtoCreate;
      if (dtoCreate.like) {
        dto.url = ModelPostingUrls.DTO_UPDATE_TRUE_POSTING_LIKE;
        dto.targetUrl = ModelPostingUrls.DTO_UPDATE_TRUE_POSTING_LIKE;
      } else {
        dto.url = ModelPostingUrls.DTO_UPDATE_FALSE_POSTING_LIKE;
        dto.targetUrl = ModelPostingUrls.DTO_UPDATE_FALSE_POSTING_LIKE;
      }
      await this.db
        .object(
          `${DtoUrl.DTO_USER}/${ModelPostingUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`
        )
        .set(Object.assign({}, dto));
      return dtoCreate;
    } catch (error) {
      return null;
    }
  }

  getListOfChatQuery$(
    route: ActivatedRoute
  ): Observable<ModelReviewV2[]> {
    return route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.getListOfDocumentsQuery(
          ModelReviewUrls.URL_MODEL_MESSAGE,
          'idPosting',
          params.get('id'),
          'timestamp'
        );
      })
    );
  }

  wrapperCreateMessage(model: ModelReviewV2): Observable<ModelReviewV2> {
    return from(this.createMessage(model));
  }

  private async createMessage(model: ModelReviewV2): Promise<ModelReviewV2> {
    try {
      const dtoCreate = { ...model };
      const databaseRef = this.presence.firebase.database();
      const refOne: DatabaseReference = databaseRef
        .ref(DtoUrl.DTO_USER)
        .child(dtoCreate.idAdmin)
        .push();
      dtoCreate.id = refOne.key;
      dtoCreate.timestamp = this.presence.timestamp;
      const dto: Dto = new Dto();
      dto.url = ModelReviewUrls.DTO_CREATE_MESSGAE;
      dto.targetUrl = ModelReviewUrls.URL_MODEL_MESSAGE;
      dto.id = refOne.key;
      dto.timestamp = this.presence.timestamp;
      dto.payload = dtoCreate;
      await this.db
        .object(
          `${DtoUrl.DTO_USER}/${ModelReviewUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`
        )
        .set(Object.assign({}, dto));
      return dtoCreate;
    } catch (error) {
      return null;
    }
  }

  wrapperUpdateMessageReply(model: ModelReviewV2): Observable<ModelReviewV2> {
    return from(this.updateMessageReply(model));
  }

  private async updateMessageReply(
    model: ModelReviewV2
  ): Promise<ModelReviewV2> {
    try {
      const dtoCreate = { ...model };
      const databaseRef = this.presence.firebase.database();
      const refOne: DatabaseReference = databaseRef
        .ref(DtoUrl.DTO_USER)
        .child(dtoCreate.reply[0].idAdmin)
        .push();
      dtoCreate.reply[0].id = refOne.key;
      dtoCreate.timestamp = this.presence.timestamp;
      dtoCreate.reply[0].timestamp = this.presence.timestamp;
      const dto: Dto = new Dto();
      dto.url = ModelReviewUrls.DTO_CREATE_MESSAGE_REPLY;
      dto.targetUrl = ModelReviewUrls.URL_MODEL_MESSAGE;
      dto.id = refOne.key;
      dto.timestamp = this.presence.timestamp;
      dto.payload = dtoCreate;
      await this.db
        .object(
          `${DtoUrl.DTO_USER}/${ModelReviewUrls.MAIN_URL}/${dtoCreate.reply[0].idAdmin}/${dto.id}`
        )
        .set(Object.assign({}, dto));
      return dtoCreate;
    } catch (error) {
      return null;
    }
  }


  wrapperDeleteModelPosting(model: ModelPosting): Observable<ModelPosting> {
    return from(this.deleteModelPosting(model));
  }

 async deleteModelPosting(model: ModelPosting): Promise<ModelPosting> {
    try {
      const dtoCreate = { ...model };
      const databaseRef = this.presence.firebase.database();
      const refOne: DatabaseReference = databaseRef
        .ref(DtoUrl.DTO_USER)
        .child(dtoCreate.idAdmin)
        .push();

      dtoCreate.timestamp = this.presence.timestamp;
      const dto: Dto = new Dto();
      dto.id = refOne.key;
      dto.timestamp = this.presence.timestamp;
      dto.url = ModelPostingUrls.DTO_DELETE_URL_MODEL_POSTING_MESSAGE;
      dto.targetUrl = ModelPostingUrls.URL_MODEL_POSTING_MESSAGE;
      dto.payload = dtoCreate;

      await this.db
        .object(`${DtoUrl.DTO_USER}/${ModelPostingUrls.MAIN_URL}/${dtoCreate.idAdmin}/${dto.id}`)
        .set(Object.assign({}, dto));

      return dtoCreate;
    } catch (error) {
      return null;
    }

  }

}
