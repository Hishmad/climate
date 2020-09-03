import { ModelReviewV2 } from './../../../shared-logic/model-review/model-review-v2';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { ModelReviewUrls } from './../../../shared-logic/model-review/model-review-urls';
import { ModelUserLog } from './../../../shared-logic/model-user/model-user-log';
export async function dtoCreateUrlMessageReply(
    admin: any,
    context: any,
    container: any
): Promise<any> {

    console.log('dtoCreateUrlMessageReply');

    try {

        const log: ModelUserLog = new ModelUserLog();
        log.id = container.payload.id;
        log.idUser = container.payload.idAdmin;
        log.sourceUrl = `${container.url}`;
        log.targetUrl = `${container.targetUrl}/${container.payload.id}`;
        log.descriptions = `dtoCreate`;
        log.timestamp = Date.now();

        const model: ModelReviewV2 = { ...container.payload };

        const result1 = await admin
            .firestore()
            .collection(
                ModelReviewUrls.URL_MODEL_MESSAGE
            )
            .doc(model.id)

        const docResult1 = await admin
            .firestore()
            .runTransaction((t: any) => t.get(result1));

        const reply = getReply({ ...docResult1.data() }, model);


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
                .child(model.reply[0].idAdmin)
                .child(container.id)
                .set(Object.assign({}, log)),
            docResult1.ref.update({ reply })
        ]);

        return await admin
            .database()
            .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
            .child(container.payload.reply[0].idAdmin)
            .child(container.id)
            .set(Object.assign({}, {
                timestamp: Date.now() * -1,
                msg: 'RESOLVED: dtoCreateUrlMessageReply',
                longMsg: ''
            }));
    } catch (error) {
        console.log(error);
        return admin
            .database()
            .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
            .child(container.payload.reply[0].idAdmin)
            .child(container.id)
            .set(Object.assign({}, {
                timestamp: Date.now() * -1,
                msg: 'REJECTED: dtoCreateUrlMessageReply',
                longMsg: error.toString()
            }));
    }
}

function getReply(source: ModelReviewV2, model: ModelReviewV2): ModelReviewV2[] {

    if (source.reply) {
        const getFirstElementFromReplyArray: any = { ...model.reply[0] };
        source.reply.push(getFirstElementFromReplyArray);
        return [...source.reply];
    } else {
        return [...model.reply];
    }

}

