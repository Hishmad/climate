import { ALGOLIA_INDEX_NAME_MODEL_POSTING } from './../environments/keys';
import { ModelPostingUrls } from './../../../shared-logic/model-posting/model-posting-urls';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { ModelPostingLike } from './../../../shared-logic/model-posting/model-posting-like';
import { ModelUserLog } from './../../../shared-logic/model-user/model-user-log';
import { ModelUser } from '../../../shared-logic/model-user/model-user';
import { ModelPosting } from '../../../shared-logic/model-posting/model-posting';


export async function dtoUpdateFalsePostingLike(
  admin: any,
  context: any,
  container: any,
  algoliasearch: any
): Promise<any> {

  console.log('dtoUpdateFalsePostingLike');

  const index = algoliasearch.initIndex(`${ALGOLIA_INDEX_NAME_MODEL_POSTING}`);

  try {
    const log: ModelUserLog = new ModelUserLog();
    log.id = container.payload.id;
    log.idUser = container.payload.idAdmin;
    log.sourceUrl = `${container.url}`;
    log.targetUrl = `${container.targetUrl}/${container.payload.id}`;
    log.descriptions = `dtoCreate`;
    log.timestamp = Date.now();

    const model: ModelPostingLike = { ...container.payload };
    const objectID = model.idPosting

    const result1 = await admin
      .firestore()
      .collection(ModelUserUrls.URL_MODEL_USERS)
      .doc(model.idUser);

    const docResult1 = await admin
      .firestore()
      .runTransaction((t: any) => t.get(result1));
    const user: ModelUser = { ...docResult1.data() };

    const result2 = await admin
      .firestore()
      .collection(ModelPostingUrls.URL_MODEL_POSTING_MESSAGE)
      .doc(model.idPosting);

    const docResult2 = await admin
      .firestore()
      .runTransaction((t: any) => t.get(result2));
    const posting: ModelPosting = { ...docResult2.data() };

    if (typeof user.listOfLikes === 'undefined') throw new Error('No list of likes in ModelUser');
    if (typeof posting.listOfLikes === 'undefined') throw new Error('No list of likes in ModelPosting');


    user.listOfLikes = removeElementFromArray(model.idPosting, user.listOfLikes);

    posting.listOfLikes = removeElementFromArray(
      model.idUser,
      posting.listOfLikes
    );

    // slow down
    await admin
      .database()
      .ref(ModelUserUrls.MODEL_USER_LOG)
      .child(container.url)
      .child(container.id)
      .set(Object.assign({}, model));
    await admin
      .database()
      .ref(ModelUserUrls.MODEL_USER_LOG)
      .child(ModelUserUrls.URL_MODEL_USER_ADMINS)
      .child(model.idAdmin)
      .child(container.id)
      .set(Object.assign({}, log));



    // make this as late as possible
    await Promise.all([
      docResult1.ref.update({ listOfLikes: user.listOfLikes }),
      docResult2.ref.update({ listOfLikes: posting.listOfLikes }),
    ]);



    // make this as late as possible
    await Promise.all([
      admin
        .database()
        .ref(ModelPostingUrls.URL_REF_MODEL_USER_POSTING_MESSAGE_LIKE)
        .child(model.idUser)
        .child(model.idPosting)
        .set(null),
      admin
        .database()
        .ref(ModelPostingUrls.URL_REF_MODEL_POSTING_MESSAGE_USER_LIKE)
        .child(model.idPosting)
        .child(model.idUser)
        .set(null),
      index.partialUpdateObject({ listOfLikes: posting.listOfLikes, objectID })
    ]);

    return await admin
      .database()
      .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
      .child(container.payload.idAdmin)
      .child(container.id)
      .set(
        Object.assign(
          {},
          {
            timestamp: Date.now() * -1,
            msg: 'RESOLVED: dtoUpdateFalsePostingLike',
            longMsg: '',
          }
        )
      );
  } catch (error) {
    console.log(error);
    return admin
      .database()
      .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
      .child(container.payload.idAdmin)
      .child(container.id)
      .set(
        Object.assign(
          {},
          {
            timestamp: Date.now() * -1,
            msg: 'REJECTED: dtoUpdateFalsePostingLike',
            longMsg: error.toString(),
          }
        )
      );
  }
}

function removeElementFromArray(element: string, list: string[]): string[] {
  const origin = [...list];
  const index = origin.indexOf(element);
  if (index > -1) {
    origin.splice(index, 1);
  }
  return origin;
}
