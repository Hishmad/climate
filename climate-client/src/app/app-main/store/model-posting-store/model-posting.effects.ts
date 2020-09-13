import { DataModelService } from './../../../services/data-model.services';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromActions from './model-posting.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelPostingEffects {
  getListOfModelPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadModelPostings),
      mergeMap((_) =>
        this.dataModelService.getListOfPosting$().pipe(
          map((modelPostings) =>
          fromActions.loadModelPostingsSuccess({ modelPostings })
          ),
          catchError((error) =>
            of(fromActions.loadModelPostingsFailure({ error }))
          )
        )
      )
    )
  );

  getListOfModelPostingQueryUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadModelPostingsQueryUser),
      mergeMap(({ id }) =>
        this.dataModelService.getListOfUserPublicPosting$(id).pipe(
          map((modelPostings) =>
          fromActions.loadModelPostingsQueryUserSuccess({
              modelPostings,
            })
          ),
          catchError((error) =>
            of(
              fromActions.loadModelPostingsQueryUserFailure({ error })
            )
          )
        )
      )
    )
  );

  getListOfModelPostingQueryLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadModelPostingsQueryLikes),
      mergeMap(({ id }) =>
        this.dataModelService.getListOfUserLike$(id).pipe(
          map((modelPostings) =>
          fromActions.loadModelPostingsQueryLikesSuccess({
              modelPostings,
            })
          ),
          catchError((error) =>
            of(
              fromActions.loadModelPostingsQueryLikesFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  getModelPostingById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadModelPosting),
      mergeMap(({ id }) =>
        this.dataModelService.getDocumentPosting$(id).pipe(
          map((selectedModelPosting) =>
          fromActions.loadModelPostingSuccess({
              selectedModelPosting,
            })
          ),
          catchError((error) =>
            of(fromActions.loadModelPostingFailure({ error }))
          )
        )
      )
    )
  );

  /** [new post v1 component] create new posting */
  createModelPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addModelPosting),
      mergeMap(({ modelPosting }) =>
        this.dataModelService.wrapperCreateNewPost(modelPosting).pipe(
          map((modelPosting) =>
          fromActions.addModelPostingSuccess({ modelPosting })
          ),
          catchError((error) =>
            of(fromActions.addModelPostingFailure({ error }))
          )
        )
      ),
      tap(() => {
        setTimeout(() => {
          this.router.navigate(['/main/landing/welcome']);
        }, 4000);
      })
    )
  );

  deleteModelPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.deleteModelPosting),
      mergeMap(({ modelPosting }) =>
        this.dataModelService.wrapperDeleteModelPosting(modelPosting).pipe(
          map((modelPosting) =>
          fromActions.deleteModelPostingSuccess({ modelPosting })
          ),
          catchError((error) =>
            of(fromActions.deleteModelPostingFailure({ error }))
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
