import { ModelPostingLike } from '../../../../../../shared-logic/model-posting/model-posting-like';
import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ModelPostingLikeActions from './model-posting-like.actions';

export const modelPostingLikeFeatureKey = 'modelPostingLikeFeatureKey';

export interface ModelPostingLikeState extends EntityState<ModelPostingLike> {
  // additional entities state properties
  error: any;
  selectedModelPostingLike: ModelPostingLike;
}

export const adapter: EntityAdapter<ModelPostingLike> = createEntityAdapter<
ModelPostingLike
>();

export const initialState: ModelPostingLikeState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedModelPostingLike: undefined,
});

const _reducer = createReducer(
  initialState,
  /** [New Post V1 Component]  Add new ModelPosting */
  on(ModelPostingLikeActions.updateModelPostingLikeSuccess, (state, action) =>
  {
    return {
      ...state,
      selectedModelPostingLike: action.modelPostingLike,
    };   
  }
  ),
  on(ModelPostingLikeActions.updateModelPostingLikeFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelPostingLikeActions.signoutModelPostingLike, (state, action) => {
    return {
      ...state,
      selectedModelPostingLike: undefined,
    };
  }),
  
);

export function reducer(state: ModelPostingLikeState | undefined, action: Action) {
  return _reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
