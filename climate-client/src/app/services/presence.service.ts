import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import { auth } from 'firebase/app';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PresenceService {

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
        console.log('let there be presence');
        this.updateOnUser().subscribe();
        this.updateOnDisconnect().subscribe();
        this.updateOnAway();
    }

    get auth(): any {
        return auth;
    }

    get timestamp(): any {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    get firebase(): any {
        return firebase;
    }


    getPresence(uid: string) {
        return this.db.object(`status/${uid}`).valueChanges();
    }

    getUser() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    async setPresence(status: string) {
        const user = await this.getUser();
        if (user) {
            return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
        }
    }



    // Updates status when logged-in connection to Firebase starts
    updateOnUser() {
        const connection = this.db.object('.info/connected').valueChanges().pipe(
            map(connected => connected ? 'online' : 'offline')
        );

        return this.afAuth.authState.pipe(
            switchMap(user => user ? connection : of('offline')),
            tap(status => this.setPresence(status))
        );
    }

    updateOnDisconnect() {
        return this.afAuth.authState.pipe(
            tap(user => {
                if (user) {
                    this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
                        .update({
                            status: 'offline',
                            timestamp: this.timestamp
                        });
                }
            })
        );
    }

    // User navigates to a new tab, case 3
    updateOnAway() {
        document.onvisibilitychange = (e) => {

            if (document.visibilityState === 'hidden') {
                this.setPresence('away');
            } else {
                this.setPresence('online');
            }
        };
    }

    async signOut(): Promise<any> {
        await this.setPresence('offline');
        await this.afAuth.signOut();
    }


}

