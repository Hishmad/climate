import { CLOUDINARY } from './../environments/keys';
import { ModelPostingUrls } from './../../../shared-logic/model-posting/model-posting-urls';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { ModelPosting } from './../../../shared-logic/model-posting/model-posting';
import { ModelUserLog } from './../../../shared-logic/model-user/model-user-log';
const cloudinary = require('cloudinary').v2;

export async function dtoDeleteUrlModelPostingImages(
    admin: any,
    context: any,
    container: any
): Promise<any> {

    cloudinary.config(CLOUDINARY);

    try {
        /** initialize new objects */
        console.log('dtoDeleteUrlModelPostingImages');

        /** the user log */
        const log: ModelUserLog = new ModelUserLog();
        log.id = container.payload.id;
        log.idUser = container.payload.id; /** uid */
        log.sourceUrl = `${container.url}`;
        log.targetUrl = `${container.targetUrl}/${container.payload.id}`;
        log.descriptions = `dtoUpdate`;
        log.timestamp = container.payload.timestamp;

        const model: ModelPosting = { ...container.payload };


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
                .child(model.id)
                .child(container.id)
                .set(Object.assign({}, log)),
            cloudinary.api.delete_resources([...model.listOfImagePublicId],
                (error: any) => { console.log(error); }),
                updatePosting(admin, model)
        ]);


        /** return a promise */
        return admin
            .database()
            .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
            .child(container.payload.idAdmin)
            .child(container.id)
            .set(Object.assign({}, {
                timestamp: Date.now() * -1,
                msg: 'RESOLVED: dtoDeleteUrlModelPostingImages',
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
                msg: 'REJECTED: dtoDeleteUrlModelPostingImages',
                longMsg: error.toString()
            }));
    }
}


async function updatePosting(admin: any, model: ModelPosting): Promise<void> {

    const result1 = await admin
        .firestore()
        .collection(
            ModelPostingUrls.URL_MODEL_POSTING_MESSAGE
        )
        .doc(model.id);

    const docResult1 = await admin
        .firestore()
        .runTransaction((t: any) => t.get(result1));

    if (docResult1.exists) {
        const posting: ModelPosting = { ...docResult1.data() };
        const listOfCloudinaryImages = posting.listOfCloudinaryImages
        .filter(item => !model.listOfImagePublicId.some(id => item.public_id === id));
        await docResult1.ref.update({ listOfCloudinaryImages });
    }

}
