"use strict";
exports.__esModule = true;
exports.ModelUserUrls = void 0;
var ModelUserUrls = /** @class */ (function () {
    function ModelUserUrls() {
    }
    ModelUserUrls.DTO_CREATE_URL_MODEL_USER_ADMINS = 'dtoCreateUrlModelUserAdmins';
    ModelUserUrls.DTO_UPDATE_URL_MODEL_USER_ADMINS = 'dtoUpdateUrlModelUserAdmins';
    ModelUserUrls.DTO_DELETE_URL_MODEL_USER_ADMINS = 'dtoDeleteUrlModelUserAdmins';
    ModelUserUrls.DTO_UPDATE_URL_MODEL_USER_MEMBER = 'dtoUpdateUrlModelUserMember';
    ModelUserUrls.DTO_DELETE_URL_MODEL_USER_MEMBER_IMAGES = 'dtoDeleteUrlModelUserMemberImages';
    ModelUserUrls.MAIN_URL = 'mainModelUserUrls';
    /** /zzzModelUsers/{id} */
    ModelUserUrls.URL_MODEL_USERS = 'V1ModelUsers';
    /** /zzzModelUserAdmins/{id} */
    ModelUserUrls.URL_MODEL_USER_ADMINS = 'V1ModelUserAdmins';
    /** /zzzModelUserMembers/{id} */
    ModelUserUrls.URL_MODEL_USER_MEMBERS_V2 = 'V1ModelUserMembersV2';
    /** status/{uid}/model */
    ModelUserUrls.USER_PRESENCE = 'status';
    /** /aaaModelUserLog{id} */
    ModelUserUrls.MODEL_USER_LOG = 'V1ModelUserLog';
    /** /zzzUserPresenceLog/{timestamp}  */
    ModelUserUrls.USER_PRESENCE_LOG = 'V1UserPresenceLog';
    /** /refUserPresenceLog/id/timestamp */
    ModelUserUrls.REF_USER_PRESENCE_LOG = 'V1refUserPresenceLog';
    /** /refUserActivityNotification/{idUser}/{idDto}/{timestamp: number, msg: string, longMsg: string} */
    ModelUserUrls.REF_USER_ACTIVITY_NOTIFICATION = 'V1refUserActivityNotification';
    return ModelUserUrls;
}());
exports.ModelUserUrls = ModelUserUrls;
