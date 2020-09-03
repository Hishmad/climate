import { ModelPostingLike } from '../../../../../../shared-logic/model-posting/model-posting-like';
import { createAction, props } from '@ngrx/store';

export const updateModelPostingLike = createAction(
  '[ModelPostingLike Welcome & User Asset Component] Update',
  props<{ modelPostingLike: ModelPostingLike }>()
);

export const signoutModelPostingLike = createAction(
  '[ModelPostingLike App Main Component] Singout'
);

export const updateModelPostingLikeSuccess = createAction(
  '[ModelPostingLike Update Posting Like Effect] Update Success',
  props<{ modelPostingLike: ModelPostingLike }>()
);

export const updateModelPostingLikeFailure = createAction(
  '[ModelPostingLike Update Posting Like Effect] Update Failure',
  props<{ error: any }>()
);
