import { DataModelService } from './../../../services/data-model.services';
import { GeoAddress } from './../../../../../../shared-logic/geo-document/geo-address';
import { ModelPostingLike } from './../../../../../../shared-logic/model-posting/model-posting-like';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRefService } from './../../../services/window-ref.service';
import { ModelPosting } from './../../../../../../shared-logic/model-posting/model-posting';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-public-tab',
  templateUrl: './user-public-tab.component.html',
  styleUrls: ['./user-public-tab.component.scss']
})
export class UserPublicTabComponent implements OnInit {

  listing$: Observable<ModelPosting[]>;

  constructor(
    private winRef: WindowRefService,
    private route: ActivatedRoute,
    private router: Router,
    private localService: DataModelService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onDetailPosting(model: ModelPosting): Promise<boolean> {
    return this.router.navigate(['/main/landing/listDetail', model.id]);

  }

  onUpdateLike(model: ModelPostingLike): void {
    this.localService.wrapperUpdatePostLike(model);
  }

  onLocation(address: GeoAddress) {
    const location = `https://www.google.com/maps/search/?api=1&query=${address.lat},${address.lng}`;
    this.winRef.nativeWindow.open(location, '_blank,noopener');
  }

  private fetchData(): void {
    this.listing$ = this.localService.getListOfUserPublicPosting$(this.route);

  }

}
