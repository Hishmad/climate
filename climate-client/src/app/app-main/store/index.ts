import { ActionReducerMap } from '@ngrx/store';
import * as modelUserReducers from './model-user-store/model-user.reducer';
import * as modelUserMemberV2Reducers from './model-user-member-store/model-user-member-v2.reducer';
import * as modelPostingReducer from './model-posting-store/model-posting.reducer';
import * as modelPostingLikeReducer from './model-posting-like-store/model-posting-like.reducer';
import * as modelReviewReducer from './model-review-store/model-review.reducer';

export const appMainStateKey = 'appMainStateKey';

export interface AppMainState {
  modelUserReducer: modelUserReducers.ModelUserState;
  modelUserMemberV2Reducer: modelUserMemberV2Reducers.ModelUserMemberV2State;
  modelPostingReducer: modelPostingReducer.ModelPostingState;
  modelPostingLikeReducer: modelPostingLikeReducer.ModelPostingLikeState;
  modelReviewReducer: modelReviewReducer.ModelReviewState;
}

export const reducers: ActionReducerMap<AppMainState> = {
  modelUserReducer: modelUserReducers.reducer,
  modelUserMemberV2Reducer: modelUserMemberV2Reducers.reducer,
  modelPostingReducer: modelPostingReducer.reducer,
  modelPostingLikeReducer: modelPostingLikeReducer.reducer,
  modelReviewReducer: modelReviewReducer.reducer,
};
