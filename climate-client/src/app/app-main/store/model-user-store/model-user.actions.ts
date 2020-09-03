import { ModelUser } from '../../../../../../shared-logic/model-user/model-user';
import { createAction, props } from '@ngrx/store';

// [START] get user
export const loadModelUser = createAction(
    '[ModelUser App Main Component] Load User'
);

export const signoutModelUser = createAction(
    '[ModelUser App Main Component] User Singout'
);

export const loadModelUserSuccess = createAction(
    '[ModelUser App Main Effect] Load ModelUser',
    props<{ selectedModelUser: ModelUser }>()
);

export const loadModelUserFailure = createAction(
    '[ModelUser App Main Effect] Load ModelUser',
    props<{ error: any }>()
);
// [END] get user