import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Docket } from '../model/Docket';

@Component({
  selector: 'app-docket-list',
  templateUrl: './docket-list.component.html',
  styleUrls: ['./docket-list.component.css'],
})
export class DocketListComponent implements OnInit {
  docketList: any[] = [];
  docketHeader: string[] = [];
  loading: boolean = true; // We are handling this variable from app-component-ts
  currentDocketId: number = -1;
  confirmBoxOpenButton: any;

  @Output() editClickEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteClickEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Input('docketList') set setDocketList(docket: Docket[]) {
    this.docketList = docket;
    if (this.docketList && this.docketList.length > 0) {
      this.docketHeader = Object.keys(this.docketList[0]);
    }
  }

  ngOnInit(): void {
    this.confirmBoxOpenButton = document.getElementById('confirm-box-open-button');
    let confirmModal = document.getElementById('docket-modal');
    confirmModal?.addEventListener('hidden.bs.modal', (event: any) => {  // On modal close resetting current docket
      this.currentDocketId = -1;
    });
  }

  confirmDelete() {
    if (this.currentDocketId > -1) {
      this.deleteClickEmitter.emit(this.currentDocketId);
    }
  }

  deleteClickHandler(id: number) {
    this.currentDocketId = id;
    this.confirmBoxOpenButton.click();
  }

  editClickHandler(id: number) {
    this.editClickEmitter.emit(id);
  }
}
