import { DataModelService } from '../../../services/data-model.services';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromModelPostingLikeAction from './model-posting-like.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelPostingLikeEffects {

  updateModelPostingLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelPostingLikeAction.updateModelPostingLike),
      mergeMap(({modelPostingLike}) =>
        this.dataModelService.wrapperUpdatePostLike(modelPostingLike)
        .pipe(
          map((modelPostingLike) =>
          fromModelPostingLikeAction.updateModelPostingLikeSuccess({ modelPostingLike })
          ),
          catchError((error) =>
            of(fromModelPostingLikeAction.updateModelPostingLikeFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataModelService: DataModelService,
    private router: Router
  ) {}
}
