import { appMainStateKey } from '..';
import { AppMainState } from '../index';

import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectModelReviewState = createFeatureSelector<AppMainState>(
  appMainStateKey
);

export const selectModelReviews = createSelector(
  selectModelReviewState,
  (state: AppMainState) => state.modelReviewReducer.modelReviews
);

export const selectModelReview = createSelector(
  selectModelReviewState,
  (state: AppMainState) => state.modelReviewReducer.selectedModelReview
);
