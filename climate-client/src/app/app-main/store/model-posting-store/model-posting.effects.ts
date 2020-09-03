import { DataModelService } from './../../../services/data-model.services';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromModelPostingAction from './model-posting.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelPostingEffects {
  getListOfModelPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelPostingAction.loadModelPostings),
      mergeMap((_) =>
        this.dataModelService.getListOfPosting$().pipe(
          map((modelPostings) =>
            fromModelPostingAction.loadModelPostingsSuccess({ modelPostings })
          ),
          catchError((error) =>
            of(fromModelPostingAction.loadModelPostingsFailure({ error }))
          )
        )
      )
    )
  );

  getListOfModelPostingQueryUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelPostingAction.loadModelPostingsQueryUser),
      mergeMap(({ id }) =>
        this.dataModelService.getListOfUserPublicPosting$(id).pipe(
          map((modelPostings) =>
            fromModelPostingAction.loadModelPostingsQueryUserSuccess({
              modelPostings,
            })
          ),
          catchError((error) =>
            of(
              fromModelPostingAction.loadModelPostingsQueryUserFailure({ error })
            )
          )
        )
      )
    )
  );

  getListOfModelPostingQueryLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelPostingAction.loadModelPostingsQueryLikes),
      mergeMap(({ id }) =>
        this.dataModelService.getListOfUserLike$(id).pipe(
          map((modelPostings) =>
            fromModelPostingAction.loadModelPostingsQueryLikesSuccess({
              modelPostings,
            })
          ),
          catchError((error) =>
            of(
              fromModelPostingAction.loadModelPostingsQueryLikesFailure({
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
      ofType(fromModelPostingAction.loadModelPosting),
      mergeMap(({ id }) =>
        this.dataModelService.getDocumentPosting$(id).pipe(
          map((selectedModelPosting) =>
            fromModelPostingAction.loadModelPostingSuccess({
              selectedModelPosting,
            })
          ),
          catchError((error) =>
            of(fromModelPostingAction.loadModelPostingFailure({ error }))
          )
        )
      )
    )
  );

  /** [new post v1 component] create new posting */
  createModelPosting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelPostingAction.addModelPosting),
      mergeMap(({ modelPosting }) =>
        this.dataModelService.wrapperCreateNewPost(modelPosting).pipe(
          map((modelPosting) =>
            fromModelPostingAction.addModelPostingSuccess({ modelPosting })
          ),
          catchError((error) =>
            of(fromModelPostingAction.addModelPostingFailure({ error }))
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
      ofType(fromModelPostingAction.deleteModelPosting),
      mergeMap(({ modelPosting }) =>
        this.dataModelService.wrapperDeleteModelPosting(modelPosting).pipe(
          map((modelPosting) =>
            fromModelPostingAction.deleteModelPostingSuccess({ modelPosting })
          ),
          catchError((error) =>
            of(fromModelPostingAction.deleteModelPostingFailure({ error }))
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
