import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appMainStateKey } from '..';
import { AppMainState } from './../index';

const selectModelUserMemberState = createFeatureSelector<AppMainState>(
  appMainStateKey
);

export const selectModelUserMemberv2 = createSelector(
  selectModelUserMemberState,
  (state: AppMainState) =>
    state.modelUserMemberV2Reducer.selectedModelMemberV2User
);
