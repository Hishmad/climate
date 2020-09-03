import { ModelUser } from '../../../../../../shared-logic/model-user/model-user';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  MetaReducer,
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ModelUserActions from './model-user.actions';

export const modelUserStateFeatureKey = 'modelUserState';

export interface ModelUserState {
  error: any;
  selectedModelUser: ModelUser;
}

export const adapter: EntityAdapter<ModelUserState> = createEntityAdapter<
  ModelUserState
>();

export const initialState: ModelUserState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedModelUser: undefined,
});

const _reducer = createReducer(
  initialState,
  on(ModelUserActions.loadModelUserSuccess, (state, action) => {
    return {
      ...state,
      selectedModelUser: action.selectedModelUser,
    };
  }),
  on(ModelUserActions.loadModelUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelUserActions.signoutModelUser, (state, action) => {
    return {
      ...state,
      selectedModelUser: undefined,
    };
  })
);

export function reducer(state: ModelUserState | undefined, action: Action) {
  return _reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
