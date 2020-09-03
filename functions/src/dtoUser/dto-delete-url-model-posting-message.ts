import { ALGOLIA_INDEX_NAME_MODEL_POSTING, CLOUDINARY } from './../environments/keys';
import { ModelPostingUrls } from '../../../shared-logic/model-posting/model-posting-urls';
import { ModelUserUrls } from '../../../shared-logic/model-user/model-user-urls';
import { ModelPosting } from '../../../shared-logic/model-posting/model-posting';
import { ModelUserLog } from '../../../shared-logic/model-user/model-user-log';
const cloudinary = require('cloudinary').v2;


export async function dtoDeleteUrlModelPostingMessage(
    admin: any,
    context: any,
    container: any,
    algoliasearch: any
): Promise<any> {
    console.log('dtoDeleteUrlModelPostingMessage');

    const index = algoliasearch.initIndex(`${ALGOLIA_INDEX_NAME_MODEL_POSTING}`);
    cloudinary.config(CLOUDINARY);

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
                .delete(),
           
            admin
                .database()
                .ref(ModelPostingUrls.URL_REF_MODEL_POSTING_MESSAGE_USER)
                .child(model.idAdmin)
                .child(model.id)
                .set(null),
            admin
                .database()
                .ref(ModelPostingUrls.URL_REF_MODEL_POSTING_MESSAGE_USER_LIKE)
                .child(model.id)
                .set(null),
            index.deleteObject(objectID),
            deleteImages(model, cloudinary),
            deleteEveryUserLike(admin, model)
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
                        msg: 'RESOLVED: dtoDeleteUrlModelPostingMessage',
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
                        msg: 'REJECTED: dtoDeleteUrlModelPostingMessage',
                        longMsg: error.toString(),
                    }
                )
            );
    }
}


async function deleteImages(model: ModelPosting, cloudinary: any): Promise<void> {

    if (typeof model.listOfCloudinaryImages === 'undefined') return;

    const dtoDelete = { ...model };
    const listOfPublicId = dtoDelete.listOfCloudinaryImages.map(item => item.public_id);

    await cloudinary.api.delete_resources([...listOfPublicId],
        (error: any) => { console.log(error); });

}


async function deleteEveryUserLike(admin: any, model: ModelPosting): Promise<void> {

    if (typeof model.listOfLikes === 'undefined') return;

    const dtoDelete = { ...model };
    dtoDelete.listOfLikes.forEach(userId => {
        admin
            .database()
            .ref(ModelPostingUrls.URL_REF_MODEL_USER_POSTING_MESSAGE_LIKE)
            .child(userId)
            .child(dtoDelete.id)
            .set(null);
    });

}
