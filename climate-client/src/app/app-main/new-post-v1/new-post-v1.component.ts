import { addModelPosting } from './../store/model-posting-store/model-posting.actions';
import { ModelPostingState } from './../store/model-posting-store/model-posting.reducer';
import { DataModelService } from './../../services/data-model.services';
import { ModelPosting } from './../../../../../shared-logic/model-posting/model-posting';
import { selectModelUserMemberv2 } from './../store/model-user-member-store/model-user-member-v2.selecters';
import { ModelUserMemberV2 } from './../../../../../shared-logic/model-user/model-user-member-v2';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ModelUserMemberV2State } from '../store/model-user-member-store/model-user-member-v2.reducer';

@Component({
  selector: 'app-new-post-v1',
  templateUrl: './new-post-v1.component.html',
  styleUrls: ['./new-post-v1.component.scss'],
})
export class NewPostV1Component implements OnInit {

  user$: Observable<ModelUserMemberV2>;
  isSpinner = false;

  constructor(
    private router: Router,
    private storeUserMember: Store<ModelUserMemberV2State>,
    private dataModelService: DataModelService,
    private store: Store<ModelPostingState>
  ) {

  }

  ngOnInit(): void {
    this.fetchData();
  }

  onDetailNewPost(model: ModelPosting): void {
    this.isSpinner = true;
    const modelPosting = { ...model };
    /** to model.posting.effects */
    this.store.dispatch(addModelPosting({modelPosting}));
   

  }

  onDeleteImages(model: ModelPosting): void {
    const dtoCreate = { ...model };
    this.dataModelService.deletePostImages(dtoCreate);
  }

  private fetchData(): void {
    this.user$ =this.storeUserMember.select(selectModelUserMemberv2);
  }

}
