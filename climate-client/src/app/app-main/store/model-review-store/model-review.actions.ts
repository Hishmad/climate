import { ModelReviewV2 } from './../../../../../../shared-logic/model-review/model-review-v2';
import { createAction, props } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

export const loadModelReviews = createAction(
  '[ModelReviewV2 List Detail V1 Component] Load Reviews',
  props<{ id: ActivatedRoute }>()
);

export const loadModelReviewsSuccess = createAction(
  '[ModelReviewV2 List Detail V1 Component] Load Reviews Success',
  props<{ modelReviews: ModelReviewV2[] }>()
);

export const loadModelReviewsFailure = createAction(
  '[ModelReviewV2 List Detail V1 Component] Load Reviews Failure',
  props<{ error: any }>()
);

export const createModelReview = createAction(
  '[ModelReviewV2 List Detail V1 Component] Create',
  props<{ modelReview: ModelReviewV2 }>()
);

export const destroyModelReview = createAction(
  '[ModelReviewV2 List Detail V1 Component] Destroy'
);

export const createModelReviewSuccess = createAction(
  '[ModelReviewV2 Create Effect] Create Success',
  props<{ modelReview: ModelReviewV2 }>()
);

export const createModelReviewFailure = createAction(
  '[ModelReviewV2 Create Effect] Create Failure',
  props<{ error: any }>()
);

export const updateModelReviewReply = createAction(
  '[ModelReviewV2 List Detail V1 Component] Update Reply',
  props<{ modelReview: ModelReviewV2 }>()
);

export const updateModelReviewReplySuccess = createAction(
  '[ModelReviewV2 Update Effect] Update Reply Success',
  props<{ modelReview: ModelReviewV2 }>()
);

export const updateModelReviewReplyFailure = createAction(
  '[ModelReviewV2 Update Effect] Update Reply Failure',
  props<{ error: any }>()
);
