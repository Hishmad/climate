import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { ModelUserPresence } from './../../../shared-logic/model-user/model-user-presence';
import { ModelUser } from './../../../shared-logic/model-user/model-user';
import { adminSdk } from '../fb';

export async function dtoNewUserSignup(user: any): Promise<any> {
  const newUser = createNewUser(user.uid, user.email);
  const userPresence = createUserPresence(user.uid, user.email);

  try {
    await adminSdk
      .firestore()
      .collection(ModelUserUrls.URL_MODEL_USERS)
      .doc(user.uid)
      .set(Object.assign({}, newUser));

    await adminSdk
      .database()
      .ref(ModelUserUrls.USER_PRESENCE)
      .child(user.uid)
      .set(Object.assign({}, userPresence));

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function createNewUser(uid: string, email: string): ModelUser {
  const user = new ModelUser(uid);
  user.userEmail = email;
  user.timestamp = Date.now();
  return user;
}

function createUserPresence(uid: string, email: string): ModelUserPresence {
  const user: ModelUserPresence = new ModelUserPresence();
  user.id = uid;
  user.userEmail = email;
  user.status = 'offline';
  user.timestamp = Date.now();
  return user;
}
