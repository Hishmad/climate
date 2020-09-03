import { ALGOLIA_INDEX_NAME_MODEL_POSTING } from './../environments/keys';
import { ModelPostingUrls } from './../../../shared-logic/model-posting/model-posting-urls';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { ModelUserLog } from './../../../shared-logic/model-user/model-user-log';
import { ModelPosting } from '../../../shared-logic/model-posting/model-posting';

export async function dtoCreateUrlModelReostingMessage(
    admin: any,
    context: any,
    container: any,
    algoliasearch: any
): Promise<any> {
    console.log('dtoCreateUrlModelReostingMessage');
    const index = algoliasearch.initIndex(`${ALGOLIA_INDEX_NAME_MODEL_POSTING}`);

    try {
        const log: ModelUserLog = new ModelUserLog();
        log.id = container.payload.id;
        log.idUser = container.payload.idAdmin;
        log.sourceUrl = `${container.url}`;
        log.targetUrl = `${container.targetUrl}/${container.payload.id}`;
        log.descriptions = `dtoCreate`;
        log.timestamp = Date.now();

        const model: ModelPosting = { ...container.payload };
        const objectID = model.id;

        // check if the user is valid user otherwise just return null
        const result1 = await admin
            .firestore()
            .collection(ModelUserUrls.URL_MODEL_USERS)
            .doc(model.idAdmin);

        const docResult1 = await admin
            .firestore()
            .runTransaction((t: any) => t.get(result1));

        if (!docResult1.exists) throw new Error('User does not exists');
        if (model.idUser !== model.idAdmin) throw new Error('the idAdmin hacks other users id');

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
                .collection(ModelPostingUrls.URL_MODEL_POSTING_MESSAGE)
                .doc(model.id)
                .update({ timestamp: model.timestamp }),
            admin
                .database()
                .ref(ModelPostingUrls.URL_REF_MODEL_POSTING_MESSAGE_USER)
                .child(model.idAdmin)
                .child(model.id)
                .set(Object.assign({}, model)),
            index.partialUpdateObject({ timestamp: model.timestamp, objectID })
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
                        msg: 'RESOLVED: dtoCreateUrlModelPostingMessage',
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
                        msg: 'REJECTED: dtoCreateUrlModelPostingMessage',
                        longMsg: error.toString(),
                    }
                )
            );
    }
}
