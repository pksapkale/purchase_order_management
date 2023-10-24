import { Component, ViewChild, inject } from '@angular/core';
import { DocketsServiceService } from './services/dockets-service.service';
import { Docket } from './model/Docket';
import { UpsertDocketComponent } from './upsert-docket/upsert-docket.component';
import { DocketListComponent } from './docket-list/docket-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'po_ui';

  @ViewChild(UpsertDocketComponent) upserDocketComponent: any = UpsertDocketComponent;
  @ViewChild(DocketListComponent) docketListComponent: any = DocketListComponent;

  _docketService: DocketsServiceService = inject(DocketsServiceService);
  docketList: Docket[] = [];
  poList: any[] = [];
  poListFinal: any[] = [];
  currentDocket: Docket | null = null;
  addDocketBtn: any;


  async ngOnInit() {
    try {
      await this.getPoData(); // Getting purchase orders list
      await this.fillEmptyFieldPo(); // Filling empty fields of po data
      await this.getDocketList(); // Getting existing docket list
      this.addDocketBtn = document.getElementById('add-docket-btn');
      let docketModal = document.getElementById('docket-modal');
      docketModal?.addEventListener('hidden.bs.modal', (event: any) => {  // On modal close resetting current docket
        this.currentDocket = null;
        this.upserDocketComponent.resetUpsertData();
      });
    } catch (err) {
      console.log('Error in {ngOnInit} in {docket-list-component-ts}, Error ----->>>>>', err);
    }
  }

  // For getting po list data
  async getPoData() {
    return new Promise((res, rej) => {
      this._docketService.getPoData.subscribe({
        next: (data) => {
          if (data.status) {
            this.poList = data.data[0].data;  // Po xlsx files data is here
            res(true);
          } else {
            console.log('Error in getting docket list data');
            rej();
          }
        },
        error: (err) => {
          console.log('Error in getting docket list, ----->>>>>', err);
          rej(err);
        },
      });
    });
  }

  // For filling empty fields of po list
  async fillEmptyFieldPo() {
    return new Promise((res) => {
      this.poListFinal = JSON.parse(JSON.stringify(this.poList));
      for (let i = 0; i < this.poListFinal[0].length; i++) {  // Iterating of headers
        let currentFieldValue = '';
        for (let j = 1; j < this.poListFinal.length; j++) { // Iterating on xlsx rows and ignoring header row here
          if (this.poListFinal[j][i]) {
            currentFieldValue = this.poListFinal[j][i];
          }
          else {
            this.poListFinal[j][i] = currentFieldValue;
          }
        }
      }
      res(true);
    });
  }

  // For getting docket list
  async getDocketList() {
    this.docketListComponent.loading = true;
    return new Promise((res, rej) => {
      this._docketService.getDocketList.subscribe({
        next: (data) => {
          if (data.status) {
            this.docketList = data.data;
            this.docketListComponent.loading = false;
            res(true);
          } else {
            console.log('Error in getting docket list data');
            this.docketListComponent.loading = false;
            rej();
          }
        },
        error: (err) => {
          console.log('Error in getting docket list, ----->>>>>', err);
          this.docketListComponent.loading = false;
          rej();
        },
      });
    });
  }

  // For handle edit click
  editClickHandler(id: number) {
    let currentElement = this.docketList.find(e => e.docket_id == id);
    this.currentDocket = JSON.parse(JSON.stringify(currentElement));
    this.addDocketBtn.click();
  }

  // For handle delete click
  deleteClickHandler(id: number) {
    this.docketListComponent.loading = true;
    let obj = {
      docket_id: id
    }
    this._docketService.deleteDocket(obj).subscribe({
      next: (data) => {
        if(data.status){
          this.getDocketList();
        }
        else {
          console.log('Error in deleting docket, Error ----->>>>>');
          this.docketListComponent.loading = false;
        }
      },
      error: err => {
        console.log('Error in deleting docket, Error ----->>>>>', err);
        this.docketListComponent.loading = false;
      }
    });
  }

  // After successfully upsert
  afterUpsert() {
    this.getDocketList();
  }

}
