import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Docket } from '../model/Docket';
import { DocketsServiceService } from '../services/dockets-service.service';

@Component({
  selector: 'app-upsert-docket',
  templateUrl: './upsert-docket.component.html',
  styleUrls: ['./upsert-docket.component.css'],
})
export class UpsertDocketComponent implements OnChanges, OnInit {

  _docketService: DocketsServiceService = inject(DocketsServiceService);
  loading: boolean = false;
  closeBtn: any;
  supplierArr: any = [];
  purchaseOrderArr: any = [];
  purchaseOrderArrFull: any = [];


  @Output() afterUpsertEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Input() currentDocket: Docket | null = null;
  @Input() poList: any[] = [];

  docketForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    no_of_hours_worked: new FormControl('', [Validators.required]),
    rate_per_hour: new FormControl('', [Validators.required]),
    supplier_name: new FormControl(null, [Validators.required]),
    purchase_order: new FormControl(null, [Validators.required]),
  });


  ngOnInit(): void {
    this.closeBtn = document.getElementById('close-btn');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentDocket) {  // If we have current docket value already then it is the case of update
      let obj = JSON.parse(JSON.stringify(this.currentDocket));
      delete obj.docket_id;
      this.docketForm.setValue(obj);
    }

    if (this.poList && this.poList.length > 0) {
      this.setDataInSupplierArr();  // Setting value in supplier arr
      this.setDataInPurchaseDataArr(); // Setting value in purchase order arr
    }
  }


  changeSupplierHandle(data: any) {
    this.purchaseOrderArr = [];
    let currentSupplier = data.target.value;
    this.purchaseOrderArr = this.purchaseOrderArrFull.filter((e: any) => e.supplier_name == currentSupplier);
  }


  getControl(name: string): AbstractControl | null {
    return this.docketForm.get(name);
  }


  setDataInSupplierArr() {
    let supplierIndex = this.poList[0].findIndex((e: any) => e == 'Supplier');
    this.supplierArr = JSON.parse(JSON.stringify([...new Set(this.poList.filter((e, i) => i !== 0).map((e, i) => e[supplierIndex]))]));
  }


  setDataInPurchaseDataArr() {
    let supplierIndex = this.poList[0].findIndex((e: any) => e == 'Supplier');
    let descIndex = this.poList[0].findIndex((e: any) => e == 'Description');
    let poNumberIndex = this.poList[0].findIndex((e: any) => e == 'PO Number');

    this.purchaseOrderArrFull = this.poList.filter((e, i) => i !== 0).map(e => {
      let obj = {
        name: `${e[poNumberIndex]} - ${e[descIndex]}`,
        value: e[descIndex],
        supplier_name: e[supplierIndex]
      }

      return obj
    });

    if(this.currentDocket && this.currentDocket.docket_id) {
      this.purchaseOrderArr = JSON.parse(JSON.stringify(this.purchaseOrderArrFull.filter((e: any) => e.supplier_name == this.currentDocket?.supplier_name)));
    }
    else {
      this.purchaseOrderArr = [];
    }
  }


  // For submit docket form data
  docketFormSubmit() {
    this.loading = true;
    Object.values(this.docketForm.controls).forEach(control => {
      control.markAsTouched();
    });
    if (this.docketForm.status == 'INVALID') {  // If form data is invalid then return from here
      this.loading = false;
      return;
    }
    let obj = JSON.parse(JSON.stringify(this.docketForm.value));
    if (this.currentDocket && this.currentDocket.docket_id) {  // If docket id is exists then adding it to obj
      obj.docket_id = this.currentDocket.docket_id;
    }
    this._docketService.upsertDockets(obj).subscribe({
      next: data => {
        if (data.status) {
          this.afterUpsertEmitter.emit();
          this.loading = false;
          this.resetUpsertData();
          this.closeBtn.click();
        }
        else {
          console.log('Error in upserting docket');
          this.loading = false;
        }
      },
      error: err => {
        console.log('Error in upserting docket');
        this.loading = false;
      }
    });
  }


  resetUpsertData() {
    this.docketForm.reset();
  }


}
