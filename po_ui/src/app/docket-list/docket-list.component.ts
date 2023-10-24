import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Docket } from '../model/Docket';

@Component({
  selector: 'app-docket-list',
  templateUrl: './docket-list.component.html',
  styleUrls: ['./docket-list.component.css'],
})
export class DocketListComponent {
  docketList: any[] = [];
  docketHeader: string[] = [];
  loading: boolean = false;

  @Output() editClickEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteClickEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Input('docketList') set setDocketList(docket: Docket[]) {
    this.docketList = docket;
    if (this.docketList && this.docketList.length > 0) {
      this.docketHeader = Object.keys(this.docketList[0]);
    }
  }

  deleteClickHandler(id: number) {
    this.deleteClickEmitter.emit(id);
  }
  
  editClickHandler(id: number) {
    this.editClickEmitter.emit(id);
  }
}
