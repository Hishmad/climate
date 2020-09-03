import { ModelReviewV2 } from './../../../shared-logic/model-review/model-review-v2';
import { ModelReviewUrls } from './../../../shared-logic/model-review/model-review-urls';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { ModelUserLog } from './../../../shared-logic/model-user/model-user-log';
export async function dtoCreateUrlModelMessage(
    admin: any,
    context: any,
    container: any
): Promise<any> {

    console.log('dtoCreateUrlModelMessage');

    try {

        const log: ModelUserLog = new ModelUserLog();
        log.id = container.payload.id;
        log.idUser = container.payload.idAdmin;
        log.sourceUrl = `${container.url}`;
        log.targetUrl = `${container.targetUrl}/${container.payload.id}`;
        log.descriptions = `dtoCreate`;
        log.timestamp = Date.now();

        const model: ModelReviewV2 = { ...container.payload };


        await Promise.all([
            admin
                .database()
                .ref(ModelUserUrls.MODEL_USER_LOG)
                .child(container.url)
                .child(container.id)
                .set(Object.assign({}, model)),
            admin
                .database()
                .ref(ModelUserUrls.MODEL_USER_LOG)
                .child(ModelUserUrls.URL_MODEL_USER_ADMINS)
                .child(model.idAdmin)
                .child(container.id)
                .set(Object.assign({}, log)),
            admin
                .firestore()
                .collection(ModelReviewUrls.URL_MODEL_MESSAGE)
                .doc(model.id)
                .set(Object.assign({}, model)),
        ]);

        return await admin
            .database()
            .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
            .child(container.payload.idAdmin)
            .child(container.id)
            .set(Object.assign({}, {
                timestamp: Date.now() * -1,
                msg: 'RESOLVED: dtoCreateUrlModelMessage',
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
                msg: 'REJECTED: dtoCreateUrlModelMessage',
                longMsg: error.toString()
            }));
    }
}
