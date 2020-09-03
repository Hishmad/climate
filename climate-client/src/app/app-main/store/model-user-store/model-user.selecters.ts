import { AppMainState } from './../index';
import { appMainStateKey } from '..';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectModelUserState = createFeatureSelector<AppMainState>(
  appMainStateKey
);

export const selectModelUser = createSelector(
  selectModelUserState,
  (state: AppMainState) => state.modelUserReducer.selectedModelUser
);
