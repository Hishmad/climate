import { ModelUserMemberV2 } from './../../../../../../shared-logic/model-user/model-user-member-v2';
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
import * as ModelUserMemberV2Actions from './model-user-member-v2.actions';

export const modelUserMemberStateFeatureKey = 'modelUserMemberV2State';

export interface ModelUserMemberV2State extends EntityState<ModelUserMemberV2> {
  error: any;
  selectedModelMemberV2User: ModelUserMemberV2;
}

export const adapter: EntityAdapter<ModelUserMemberV2> = createEntityAdapter<
  ModelUserMemberV2
>();

export const initialState: ModelUserMemberV2State = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedModelMemberV2User: undefined,
});

const _reducer = createReducer(
  initialState,
  // [START] get ModelUserMemberV2
  on(ModelUserMemberV2Actions.loadModelUserMemberV2Success, (state, action) => {
    return {
      ...state,
      selectedModelMemberV2User: action.selectedModelMemberV2User,
    };
  }),
  on(ModelUserMemberV2Actions.loadModelUserMemberV2Failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ModelUserMemberV2Actions.signoutModelUserMemberV2, (state, action) => {
    return {
      ...state,
      selectedModelMemberV2User: undefined,
    };
  }),
  // [START] edit user member v2
  on(
    ModelUserMemberV2Actions.loadModelUserMemberV2EditSuccess,
    (state, action) => {
      return {
        ...state,
        selectedModelMemberV2User: action.selectedModelMemberV2User,
      };
    }
  ),
  on(
    ModelUserMemberV2Actions.loadModelUserMemberV2EditFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  // [START] Add new ModelUserMemberV2
  on(
    ModelUserMemberV2Actions.updateModelUserMemberV2EditSuccess,
    (state, action) => {
      return {
        ...state,
        selectedModelMemberV2User: action.selectedModelMemberV2User,
      };
    }
  ),
  on(
    ModelUserMemberV2Actions.updateModelUserMemberV2EditFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);

export function reducer(
  state: ModelUserMemberV2State | undefined,
  action: Action
) {
  return _reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
