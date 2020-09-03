"use strict";
exports.__esModule = true;
var ModelPostingUrls = /** @class */ (function () {
    function ModelPostingUrls() {
    }
    ModelPostingUrls.DTO_CREATE_URL_MODEL_POSTING_MESSAGE = 'dtoCreateUrlModelPostingMessage';
    ModelPostingUrls.DTO_DELETE_URL_MODEL_POSTING_MESSAGE = 'dtoDeleteUrlModelPostingMessgae';
    ModelPostingUrls.DTO_CREATE_URL_MODEL_REPOSTING_MESSAGE = 'dtoCreateUrlModelRepostingMessage';
    ModelPostingUrls.DTO_UPDATE_URL_MODEL_POSTING_MEDIA_LIST = 'dtoUpdateUrlModelPostingMediaList';
    ModelPostingUrls.DTO_DELETE_URL_MODEL_POSTING_MEDIA_LIST = 'dtoDeleteUrlModelPostingMediaList';
    ModelPostingUrls.DTO_UPDATE_TRUE_POSTING_LIKE = 'dtoUpdateTruePostingLike';
    ModelPostingUrls.DTO_UPDATE_FALSE_POSTING_LIKE = 'dtoUpdateFalsePostingLike';
    /**
     * Below are the URLs for database collections
     */
    /**  /lessgoModelPostingMessage/{id} */
    ModelPostingUrls.URL_MODEL_POSTING_MESSAGE = 'lessgoUrlModelPostingMessage';
    /** /lessgoRefModelPostingMessage/{idUser}/{id} */
    ModelPostingUrls.URL_REF_MODEL_POSTING_MESSAGE_USER = 'lessgoRefModelPostingMessageUser';
    /** /lessgoRefModelPostingMessageUserLike/{idPosting}/{idUser} */
    ModelPostingUrls.URL_REF_MODEL_POSTING_MESSAGE_USER_LIKE = 'lessgoRefModelPostingMessageUserLike';
    /** /lessgoRefModelUserMessagePostingLike/{idUser}/{idPosting} */
    ModelPostingUrls.URL_REF_MODEL_USER_POSTING_MESSAGE_LIKE = 'lessgoRefModelUserMessagePostingLike';
    return ModelPostingUrls;
}());
exports.ModelPostingUrls = ModelPostingUrls;
