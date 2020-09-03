import { DataModelService } from '../../../services/data-model.services';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromModelReviewAction from './model-review.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelReviewEffects {
  getListOfModelReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelReviewAction.loadModelReviews),
      mergeMap(({ id }) =>
        this.dataModelService.getListOfChatQuery$(id).pipe(
          map((modelReviews) =>
            fromModelReviewAction.loadModelReviewsSuccess({ modelReviews })
          ),
          catchError((error) =>
            of(fromModelReviewAction.loadModelReviewsFailure({ error }))
          )
        )
      )
    )
  );

  createModelReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelReviewAction.createModelReview),
      mergeMap(({ modelReview }) =>
        this.dataModelService.wrapperCreateMessage(modelReview).pipe(
          map((modelReview) =>
            fromModelReviewAction.createModelReviewSuccess({
              modelReview,
            })
          ),
          catchError((error) =>
            of(
              fromModelReviewAction.createModelReviewFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  updateModelReviewReply$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelReviewAction.updateModelReviewReply),
      mergeMap(({ modelReview }) =>
        this.dataModelService.wrapperUpdateMessageReply(modelReview).pipe(
          map((modelReview) =>
            fromModelReviewAction.updateModelReviewReplySuccess({
              modelReview,
            })
          ),
          catchError((error) =>
            of(
              fromModelReviewAction.updateModelReviewReplyFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataModelService: DataModelService,
    private router: Router
  ) { }
}
