import { selectModelUserMemberv2 } from './../store/model-user-member-store/model-user-member-v2.selecters';
import { DataModelService } from './../../services/data-model.services';
import { loadModelUserMemberV2Edit, updateModelUserMemberV2Edit } from './../store/model-user-member-store/model-user-member-v2.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModelUserMemberV2 } from '../../../../../shared-logic/model-user/model-user-member-v2';
import { Store, select } from '@ngrx/store';
import { ModelUserMemberV2State } from '../store/model-user-member-store/model-user-member-v2.reducer';

@Component({
  selector: 'app-edit-user-member',
  templateUrl: './edit-user-member.component.html',
  styleUrls: ['./edit-user-member.component.scss'],
})
export class EditUserMemberComponent implements OnInit, OnDestroy {
  id: string;
  userMember: ModelUserMemberV2;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dataModelService: DataModelService,
    private store: Store<ModelUserMemberV2State>
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onUserUpdate(userMember: ModelUserMemberV2):void {
    const selectedModelMemberV2User = { ...userMember };
    this.store.dispatch(updateModelUserMemberV2Edit({selectedModelMemberV2User}));
  }

  onDeleteImages(userMember: ModelUserMemberV2): void {
    const dtoCreate = { ...userMember };
    this.dataModelService.deleteUserMemberImages(dtoCreate);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchData(): void {
    this.id = this.route.snapshot.params.id;
    this.store.dispatch(
      loadModelUserMemberV2Edit({ route: this.route })
    );
     const userMember$ = this.store.pipe(
      select(selectModelUserMemberv2)
    );

    this.subscription.add(
      userMember$.subscribe(user => this.userMember = user)
    );
  }
}
