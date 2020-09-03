import { createAction, props } from '@ngrx/store';

import { ModelPosting } from '../../../../../../shared-logic/model-posting/model-posting';
import { ActivatedRoute } from '@angular/router';

// [START] list of modelPostings
export const loadModelPostings = createAction(
  '[ModelPosting Welcome Component] Load ModelPostings'
);

export const loadModelPostingsSuccess = createAction(
  '[ModelPosting List Effect] Load ModelPostings Success',
  props<{ modelPostings: ModelPosting[] }>()
);

export const loadModelPostingsFailure = createAction(
  '[ModelPosting List Effect] Load ModelPostins Failure',
  props<{ error: any }>()
);
//. [END] list of modelPostings



// [START] ModelPosting detail
export const loadModelPosting = createAction(
  '[ModelPosting List Detail V1 Component] Load ModelPosting',
  props<{ id: ActivatedRoute }>()
);

export const loadModelPostingDestroy = createAction(
  '[ModelPosting List Detail V1 Component] Load ModelPosting Destroy',
);

export const loadModelPostingSuccess = createAction(
  '[ModelPosting List Detail V1 Effect] Load ModelPosting Success',
  props<{ selectedModelPosting: ModelPosting }>()
);

export const loadModelPostingFailure = createAction(
  '[ModelPosting List Detail V1 Effect] Load ModelPosting Failure',
  props<{ error: any }>()
);
//. [END] ModelPosting detail




// [START] Add new ModelPosting
export const addModelPosting = createAction(
  '[ModelPosting New Post V1 Component] Add ModelPosting',
  props<{ modelPosting: ModelPosting }>()
);

export const signoutModelPosting = createAction(
  '[ModelPosting App Main Component] Singout'
);

export const addModelPostingSuccess = createAction(
  '[ModelPosting New Post Effect] Add ModelPosting Success',
  props<{ modelPosting: ModelPosting }>()
);

export const addModelPostingFailure = createAction(
  '[ModelPosting New Post Effect] Add ModelPosting Failure',
  props<{ error: any }>()
);
//. [END] Add ModelPosting




export const loadModelPostingsQueryUser = createAction(
  '[ModelPosting User Asset Component] Query User ModelPostings',
  props<{ id: ActivatedRoute }>()
);

export const loadModelPostingsQueryUserSuccess = createAction(
  '[ModelPosting User Asset Effect] Query User ModelPosting Success',
  props<{ modelPostings: ModelPosting[] }>()
);

export const loadModelPostingsQueryUserFailure = createAction(
  '[ModelPosting User Asset Effect] Query User ModelPosting Failure',
  props<{ error: any }>()
);


export const loadModelPostingsQueryLikes = createAction(
  '[ModelPosting User Asset Component] Query Likes ModelPostings',
  props<{ id: ActivatedRoute }>()
);

export const loadModelPostingsQueryLikesSuccess = createAction(
  '[ModelPosting User Asset Effect] Query Likes ModelPosting Likes Success',
  props<{ modelPostings: ModelPosting[] }>()
);

export const loadModelPostingsQueryLikesFailure = createAction(
  '[ModelPosting User Asset Effect] Query Likes ModelPosting Likes Failure',
  props<{ error: any }>()
);

export const destroyModelPostingsQuery = createAction(
  '[ModelPosting User Asset Component] Destroy Query ModelPosting'
);

export const deleteModelPosting = createAction(
  '[ModelPosting User Asset Component] Delete ModelPosting',
  props<{ modelPosting: ModelPosting }>()
);

export const deleteModelPostingSuccess = createAction(
  '[ModelPosting User Asset Effect] Delete ModelPosting Success',
  props<{ modelPosting: ModelPosting }>()
);

export const deleteModelPostingFailure = createAction(
  '[ModelPosting User Asset Effect] Delete ModelPosting Failure',
  props<{ error: any }>()
);