
export class ModelUserUrls {


    static DTO_CREATE_URL_MODEL_USER_ADMINS = 'dtoCreateUrlModelUserAdmins';
    static DTO_UPDATE_URL_MODEL_USER_ADMINS = 'dtoUpdateUrlModelUserAdmins';
    static DTO_DELETE_URL_MODEL_USER_ADMINS = 'dtoDeleteUrlModelUserAdmins';

    static DTO_UPDATE_URL_MODEL_USER_MEMBER = 'dtoUpdateUrlModelUserMember';
    static DTO_DELETE_URL_MODEL_USER_MEMBER_IMAGES = 'dtoDeleteUrlModelUserMemberImages';


    static MAIN_URL = 'mainModelUserUrls'


    /** /zzzModelUsers/{id} */
    static URL_MODEL_USERS = 'V1ModelUsers';

    /** /zzzModelUserAdmins/{id} */
    static URL_MODEL_USER_ADMINS = 'V1ModelUserAdmins';


    /** /zzzModelUserMembers/{id} */
    static URL_MODEL_USER_MEMBERS_V2 = 'V1ModelUserMembersV2';

    /** status/{uid}/model */
    static USER_PRESENCE = 'status';

    /** /aaaModelUserLog{id} */
    static MODEL_USER_LOG = 'V1ModelUserLog';

    /** /zzzUserPresenceLog/{timestamp}  */
    static USER_PRESENCE_LOG = 'V1UserPresenceLog';

    /** /refUserPresenceLog/id/timestamp */
    static REF_USER_PRESENCE_LOG = 'V1refUserPresenceLog';

    /** /refUserActivityNotification/{idUser}/{idDto}/{timestamp: number, msg: string, longMsg: string} */
    static REF_USER_ACTIVITY_NOTIFICATION = 'V1refUserActivityNotification';



    private constructor() { }
}