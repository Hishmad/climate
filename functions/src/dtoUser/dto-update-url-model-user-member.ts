import { ModelUserMemberV2 } from './../../../shared-logic/model-user/model-user-member-v2';
import { ModelUserLog } from './../../../shared-logic/model-user/model-user-log';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';

/**
 * This function is only to create the log, the real update object will be POST
 * directly from the user's side to the DataModel
 * @param admin
 * @param context
 * @param container
 */
export async function dtoUpdateUrlModelUserMember(
  admin: any,
  context: any,
  container: any
): Promise<any> {
  try {
    /** initialize new objects */
    console.log('dtoUpdateUrlModelUserMember');

    /** the user log */
    const log: ModelUserLog = new ModelUserLog();
    log.id = container.payload.id;
    log.idUser = container.payload.id; /** uid */
    log.sourceUrl = `${container.url}`;
    log.targetUrl = `${container.targetUrl}/${container.payload.id}`;
    log.descriptions = `dtoUpdate`;
    log.timestamp = container.payload.timestamp;

    const model: ModelUserMemberV2 = { ...container.payload };


    await Promise.all([
      admin
        .database()
        .ref(ModelUserUrls.MODEL_USER_LOG)
        .child(ModelUserUrls.DTO_UPDATE_URL_MODEL_USER_MEMBER)
        .child(container.id)
        .set(Object.assign({}, model)),
      admin
        .database()
        .ref(ModelUserUrls.MODEL_USER_LOG)
        .child(ModelUserUrls.URL_MODEL_USER_MEMBERS_V2)
        .child(model.id)
        .child(container.id)
        .set(Object.assign({}, log)),
      admin
        .firestore()
        .collection(ModelUserUrls.URL_MODEL_USER_MEMBERS_V2)
        .doc(model.id)
        .set(Object.assign({}, model))
    ]);

    /** return a promise */
    return admin
      .database()
      .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
      .child(container.payload.idAdmin)
      .child(container.id)
      .set(Object.assign({}, {
        timestamp: Date.now() * -1,
        msg: 'RESOLVED: dtoUpdateUrlModelUserMember',
        longMsg: ''
      }));
  } catch (error) {
    console.log(error);
    return admin
      .database()
      .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
      .child(container.payload.idAdmin)
      .child(container.id)
      .set(Object.assign({}, {
        timestamp: Date.now() * -1,
        msg: 'REJECTED: dtoUpdateUrlModelUserMember',
        longMsg: error.toString()
      }));
  }
}
