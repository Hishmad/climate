export class ModelPostingUrls {


  static DTO_CREATE_URL_MODEL_POSTING_MESSAGE =
    'dtoCreateUrlModelPostingMessage';
  static DTO_DELETE_URL_MODEL_POSTING_MESSAGE =
    'dtoDeleteUrlModelPostingMessgae';
  static DTO_CREATE_URL_MODEL_REPOSTING_MESSAGE =
    'dtoCreateUrlModelRepostingMessage';

  static DTO_UPDATE_URL_MODEL_POSTING_MEDIA_LIST =
    'dtoUpdateUrlModelPostingMediaList';
  static DTO_DELETE_URL_MODEL_POSTING_MEDIA_LIST =
    'dtoDeleteUrlModelPostingMediaList';

    
  static DTO_UPDATE_TRUE_POSTING_LIKE = 'dtoUpdateTruePostingLike';
  static DTO_UPDATE_FALSE_POSTING_LIKE = 'dtoUpdateFalsePostingLike';

 
  static MAIN_URL = 'mainModelPostingUrls'

  /**  /lessgoModelPostingMessage/{id} */
  static URL_MODEL_POSTING_MESSAGE = 'V1UrlModelPostingMessage';

  /** /lessgoRefModelPostingMessage/{idUser}/{id} */
  static URL_REF_MODEL_POSTING_MESSAGE_USER =
    'V1RefModelPostingMessageUser';

  /** /lessgoRefModelPostingMessageUserLike/{idPosting}/{idUser} */
  static URL_REF_MODEL_POSTING_MESSAGE_USER_LIKE =
    'V1RefModelPostingMessageUserLike';

  /** /lessgoRefModelUserMessagePostingLike/{idUser}/{idPosting} */
  static URL_REF_MODEL_USER_POSTING_MESSAGE_LIKE =
    'V1RefModelUserMessagePostingLike';

  constructor() {}
}
