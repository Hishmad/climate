import { ModelPosting } from './../../../../../../shared-logic/model-posting/model-posting';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ModelPostingActions from './model-posting.actions';

export const modelPostingsFeatureKey = 'modelPostingsFeatureKey';

export interface ModelPostingState extends EntityState<ModelPosting> {
  // additional entities state properties
  error: any;
  selectedModelPosting: ModelPosting;
  modelPostings: ModelPosting[];
  modelPostingsQueryLikes: ModelPosting[];
  modelPostingsQueryUser: ModelPosting[];
}

export const adapter: EntityAdapter<ModelPosting> = createEntityAdapter<
  ModelPosting
>();

export const initialState: ModelPostingState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedModelPosting: undefined,
  modelPostings: undefined,
  modelPostingsQueryLikes: undefined,
  modelPostingsQueryUser: undefined,
});

const _reducer = createReducer(
  initialState,
  /** [New Post V1 Component]  Add new ModelPosting */
  on(ModelPostingActions.addModelPostingSuccess, (state, action) =>
  {
    return {
      ...state,
      selectedModelPosting: action.modelPosting,
    };
  }
  ),
  on(ModelPostingActions.addModelPostingFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelPostingActions.signoutModelPosting, (state, action) => {
    return {
      ...state,
      selectedModelPosting: undefined,
    };
  }),
  /** [welcome component] list of model posting */
  on(ModelPostingActions.loadModelPostingsSuccess, (state, action) =>
  {
    return {
      ...state,
      modelPostings: action.modelPostings,
    };
  }
  ),
  on(ModelPostingActions.loadModelPostingsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  /** [list-detail-v1 component] detail posting */
  on(ModelPostingActions.loadModelPostingSuccess, (state, action) => {
    return {
      ...state,
      selectedModelPosting: action.selectedModelPosting,
    };
  }),
  on(ModelPostingActions.loadModelPostingDestroy, (state, action) => {
    return {
      ...state,
      selectedModelPosting: undefined,
    };
  }),
  on(ModelPostingActions.loadModelPostingFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelPostingActions.loadModelPostingsQueryUserSuccess, (state, action) => {
    return {
      ...state,
      modelPostingsQueryUser: action.modelPostings,
    };
  }),
  on(ModelPostingActions.loadModelPostingsQueryUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelPostingActions.loadModelPostingsQueryLikesSuccess, (state, action) => {
    return {
      ...state,
      modelPostingsQueryLikes: action.modelPostings,
    };
  }),
  on(ModelPostingActions.loadModelPostingsQueryLikesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelPostingActions.destroyModelPostingsQuery, (state, action) => {
    return {
      ...state,
      modelPostingsQueryLikes: undefined,
      modelPostingsQueryUser: undefined
    };
  }),
  on(ModelPostingActions.deleteModelPostingSuccess, (state, action) => {
    return {
      ...state,
      selectedModelPosting: undefined,
    };
  }),
  on(ModelPostingActions.deleteModelPostingFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
);

export function reducer(state: ModelPostingState | undefined, action: Action) {
  return _reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
