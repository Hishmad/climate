import { DtoUrl } from './../../shared-logic/dto-container/dto-url';
import * as functions from 'firebase-functions';
import { dtoNewUserSignup } from './dto/dto-new-user-signup';
import { dtoUser } from './dto/dto-user';

exports.dtoNewUserSingup = functions.auth.user().onCreate((user) => {
    return dtoNewUserSignup(user);
});

exports.dtoUser = functions.database
    .ref(`${DtoUrl.DTO_USER}/{mainUrl}/{userId}/{id}`)
    .onWrite((event, context) => {
        return dtoUser(event, context);
    });
