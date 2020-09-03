import { appMainStateKey } from '..';
import { AppMainState } from './../index';

import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectModelPostingState = createFeatureSelector<AppMainState>(
  appMainStateKey
);

export const selectModelPostings = createSelector(
  selectModelPostingState,
  (state: AppMainState) => state.modelPostingReducer.modelPostings
);

export const selectModelPosting = createSelector(
  selectModelPostingState,
  (state: AppMainState) => state.modelPostingReducer.selectedModelPosting
);

export const selectModelPostingsQueryUser = createSelector(
  selectModelPostingState,
  (state: AppMainState) => state.modelPostingReducer.modelPostingsQueryUser
);

export const selectModelPostingsQueryLikes = createSelector(
  selectModelPostingState,
  (state: AppMainState) => state.modelPostingReducer.modelPostingsQueryLikes
);
