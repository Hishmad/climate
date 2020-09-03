import { ModelPostingUrls } from './../../../shared-logic/model-posting/model-posting-urls';
import { ModelReviewUrls } from './../../../shared-logic/model-review/model-review-urls';
import { ModelUserUrls } from './../../../shared-logic/model-user/model-user-urls';
import { Dto } from './../../../shared-logic/dto-container/dto';
import { dtoUpdateUrlModelUserMember } from '../dtoUser/dto-update-url-model-user-member';
import { adminSdk } from '../fb';
import { client } from '../fb';

import { dtoCreateUrlModelMessage } from '../dtoUser/dto-create-url-model-message';
import { dtoCreateUrlMessageReply } from '../dtoUser/dto-create-url-message-reply';
import { dtoCreateUrlModelPostingMessage } from '../dtoUser/dto-create-url-model-posting-message';
import { dtoUpdateTruePostingLike } from '../dtoUser/dto-update-true-posting-like';
import { dtoUpdateFalsePostingLike } from '../dtoUser/dto-update-false-posting-like';
import { dtoDeleteUrlModelUserMemberImages } from '../dtoUser/dto-delete-url-model-user-member-images';
import { dtoDeleteUrlModelPostingImages } from '../dtoUser/dto-delete-url-model-posting-images';
import { dtoDeleteUrlModelPostingMessage } from '../dtoUser/dto-delete-url-model-posting-message';
import { dtoCreateUrlModelReostingMessage } from '../dtoUser/dto-create-url-model-reposting-message';

export async function dtoUser(event: any, context: any): Promise<any> {
  /** Only edit data when it is first created **/
  if (event.before.exists()) {
    console.log('Not created first: ', context.timestamp);
    return null;
  }

  /** Exit when the data is deleted **/
  if (!event.after.exists()) {
    console.log('data been deleted: ', context.timestamp);
    return null;
  }

  /** get some data from the context & event */
  const container: Dto = event.after.val();
  const url = container.url;
  const eventId = context.eventId;

  try {
    switch (url) {
      case ModelUserUrls.DTO_UPDATE_URL_MODEL_USER_MEMBER: {
        return dtoUpdateUrlModelUserMember(adminSdk, context, container);
      }
      case ModelUserUrls.DTO_DELETE_URL_MODEL_USER_MEMBER_IMAGES: {
        return dtoDeleteUrlModelUserMemberImages(adminSdk, context, container);
      }
      case ModelReviewUrls.DTO_CREATE_MESSGAE: {
        return dtoCreateUrlModelMessage(adminSdk, context, container);
      }
      case ModelReviewUrls.DTO_CREATE_MESSAGE_REPLY: {
        return dtoCreateUrlMessageReply(adminSdk, context, container);
      }
      case ModelPostingUrls.DTO_CREATE_URL_MODEL_POSTING_MESSAGE: {
        return dtoCreateUrlModelPostingMessage(adminSdk, context, container, client);
      }
      case ModelPostingUrls.DTO_DELETE_URL_MODEL_POSTING_MESSAGE: {
        return dtoDeleteUrlModelPostingMessage(adminSdk, context, container, client);
      }
      case ModelPostingUrls.DTO_CREATE_URL_MODEL_REPOSTING_MESSAGE: {
        return dtoCreateUrlModelReostingMessage(adminSdk, context, container, client);
      }
      case ModelPostingUrls.DTO_DELETE_URL_MODEL_POSTING_MEDIA_LIST: {
        return dtoDeleteUrlModelPostingImages(adminSdk, context, container);
      }
      case ModelPostingUrls.DTO_UPDATE_TRUE_POSTING_LIKE: {
        return dtoUpdateTruePostingLike(adminSdk, context, container, client);
      }
      case ModelPostingUrls.DTO_UPDATE_FALSE_POSTING_LIKE: {
        return dtoUpdateFalsePostingLike(adminSdk, context, container, client);
      }

    }
  } catch (error) {
    const userreference = {
      timestamp: Date.now() * -1,
      msg: 'REJECTED: dtoUser',
      longMsg: error.toString(),
    };

    return adminSdk
      .database()
      .ref(ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION)
      .child('dtoUser')
      .child(eventId)
      .set(Object.assign({}, userreference));
  }
}
