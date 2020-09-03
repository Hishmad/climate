import { DataModelService } from '../../../services/data-model.services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromModelUserAction from './model-user.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelUserEffects {
  getUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelUserAction.loadModelUser),
      mergeMap((_) =>
        this.dataModelService.user$.pipe(
          map((selectedModelUser) =>
            fromModelUserAction.loadModelUserSuccess({
              selectedModelUser,
            })
          ),
          catchError((error) =>
            of(fromModelUserAction.loadModelUserFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataModelService: DataModelService
  ) {}
}
