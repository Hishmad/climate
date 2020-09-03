import { Observable } from 'rxjs';
import { ModelUserMemberV2 } from './../../../../../../shared-logic/model-user/model-user-member-v2';
import { createAction, props } from '@ngrx/store';
import { ModelUser } from '../../../../../../shared-logic/model-user/model-user';
import { ActivatedRoute } from '@angular/router';

// [START] get ModelUserMemberV2
export const loadModelUserMemberV2 = createAction(
    '[ModelUserMemberV2 App Main Component] Load Request',
    props<{ user$: Observable<ModelUser> }>()
);

export const signoutModelUserMemberV2 = createAction(
    '[ModelUserMemberV2 App Main Component] Singout'
);

export const loadModelUserMemberV2Success = createAction(
    '[ModelUserMemberV2 App Main Effect] Load Success',
    props<{ selectedModelMemberV2User: ModelUserMemberV2 }>()
);

export const loadModelUserMemberV2Failure = createAction(
    '[ModelUserMemberV2 App Main Effect] Load Failure',
    props<{ error: any }>()
);
// [END] get ModelUserMemberV2

// [START] edit user member v2
export const loadModelUserMemberV2Edit = createAction(
    '[ModelUserMemberV2 Edit User Member Component] Load Request',
    props<{ route: ActivatedRoute }>()
);

export const loadModelUserMemberV2EditSuccess = createAction(
    '[ModelUserMemberV2 Edit User Member Effect] Load Success',
    props<{ selectedModelMemberV2User: ModelUserMemberV2 }>()
);

export const loadModelUserMemberV2EditFailure = createAction(
    '[ModelUserMemberV2 Edit User Member Effect] Load Failure',
    props<{ error: any }>()
);
// [END] edit ModelUserMemberV2

// [START] Add new ModelUserMemberV2
export const updateModelUserMemberV2Edit = createAction(
    '[ModelUserMemberV2 Edit User Member Component] Add ModelUserMemberV2',
    props<{ selectedModelMemberV2User: ModelUserMemberV2 }>()
);

export const updateModelUserMemberV2EditSuccess = createAction(
    '[ModelUserMemberV2 Edit User Member Effect] Add ModelUserMemberV2 Success',
    props<{ selectedModelMemberV2User: ModelUserMemberV2 }>()
);

export const updateModelUserMemberV2EditFailure = createAction(
    '[ModelUserMemberV2 Edit User Member Effect] Add ModelUserMemberV2 Failure',
    props<{ error: any }>()
);
//. [END] Add new ModelUserMemberV2
