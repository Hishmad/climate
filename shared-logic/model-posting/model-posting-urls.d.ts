export declare class ModelPostingUrls {
    static DTO_CREATE_URL_MODEL_POSTING_MESSAGE: string;
    static DTO_DELETE_URL_MODEL_POSTING_MESSAGE: string;
    static DTO_CREATE_URL_MODEL_REPOSTING_MESSAGE: string;
    static DTO_UPDATE_URL_MODEL_POSTING_MEDIA_LIST: string;
    static DTO_DELETE_URL_MODEL_POSTING_MEDIA_LIST: string;
    static DTO_UPDATE_TRUE_POSTING_LIKE: string;
    static DTO_UPDATE_FALSE_POSTING_LIKE: string;
    /**
     * Below are the URLs for database collections
     */
    /**  /lessgoModelPostingMessage/{id} */
    static URL_MODEL_POSTING_MESSAGE: string;
    /** /lessgoRefModelPostingMessage/{idUser}/{id} */
    static URL_REF_MODEL_POSTING_MESSAGE_USER: string;
    /** /lessgoRefModelPostingMessageUserLike/{idPosting}/{idUser} */
    static URL_REF_MODEL_POSTING_MESSAGE_USER_LIKE: string;
    /** /lessgoRefModelUserMessagePostingLike/{idUser}/{idPosting} */
    static URL_REF_MODEL_USER_POSTING_MESSAGE_LIKE: string;
    constructor();
}
