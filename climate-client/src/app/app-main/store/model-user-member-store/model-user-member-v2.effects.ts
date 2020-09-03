import { Router } from '@angular/router';
import { DataModelService } from '../../../services/data-model.services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromModelUserMemberV2Action from './model-user-member-v2.actions';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelUserMemberV2Effects {
  getUserMemberEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelUserMemberV2Action.loadModelUserMemberV2),
      mergeMap(({ user$ }) =>
        this.dataModelService.getUserMemberV2$(user$).pipe(
          map((data) =>
            fromModelUserMemberV2Action.loadModelUserMemberV2Success({
              selectedModelMemberV2User: data,
            })
          ),
          catchError((error) =>
            of(
              fromModelUserMemberV2Action.loadModelUserMemberV2Failure({
                error,
              })
            )
          )
        )
      )
    )
  );

  getUserMemberEditEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelUserMemberV2Action.loadModelUserMemberV2Edit),
      mergeMap(({ route }) =>
        this.dataModelService.getUserMemberV2Edit$(route).pipe(
          map((data) =>
            fromModelUserMemberV2Action.loadModelUserMemberV2EditSuccess({
              selectedModelMemberV2User: data,
            })
          ),
          catchError((error) =>
            of(
              fromModelUserMemberV2Action.loadModelUserMemberV2EditFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  updateUserMemberEditEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromModelUserMemberV2Action.updateModelUserMemberV2Edit),
      mergeMap(({ selectedModelMemberV2User }) =>
        this.dataModelService
          .wrapperUpdateUserMember(selectedModelMemberV2User)
          .pipe(
            map((data) =>
              fromModelUserMemberV2Action.updateModelUserMemberV2EditSuccess({
                selectedModelMemberV2User: data,
              })
            ),
            catchError((error) =>
              of(
                fromModelUserMemberV2Action.updateModelUserMemberV2EditFailure({
                  error,
                })
              )
            )
          )
      ),
      tap(() => {
        this.router.navigate(['/main/landing/welcome']);
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dataModelService: DataModelService,
    private router: Router
  ) {}
}
