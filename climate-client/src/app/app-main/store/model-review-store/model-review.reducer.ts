import { ModelReviewV2 } from './../../../../../../shared-logic/model-review/model-review-v2';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ModelReviewActions from './model-review.actions';

export const modelReviewFeatureKey = 'modelReviewFeatureKey';

export interface ModelReviewState extends EntityState<ModelReviewV2> {
  // additional entities state properties
  error: any;
  selectedModelReview: ModelReviewV2;
  modelReviews: ModelReviewV2[];
}

export const adapter: EntityAdapter<ModelReviewV2> = createEntityAdapter<
  ModelReviewV2
>();

export const initialState: ModelReviewState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedModelReview: undefined,
  modelReviews: undefined,
});

const _reducer = createReducer(
  initialState,
  on(ModelReviewActions.loadModelReviewsSuccess, (state, action) => {
    return {
      ...state,
      modelReviews: action.modelReviews,
    };
  }),
  on(ModelReviewActions.loadModelReviewsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelReviewActions.createModelReviewSuccess, (state, action) => {
    return {
      ...state,
      selectedModelReview: action.modelReview,
    };
  }),
  on(ModelReviewActions.createModelReviewFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelReviewActions.updateModelReviewReplySuccess, (state, action) => {
    return {
      ...state,
      selectedModelReview: action.modelReview,
    };
  }),
  on(ModelReviewActions.updateModelReviewReplyFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelReviewActions.destroyModelReview, (state, action) => {
    return {
      ...state,
      selectedModelReview: undefined,
      modelReviews: undefined,
    };
  })
);

export function reducer(state: ModelReviewState | undefined, action: Action) {
  return _reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
