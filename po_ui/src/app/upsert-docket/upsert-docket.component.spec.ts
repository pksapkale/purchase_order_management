import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertDocketComponent } from './upsert-docket.component';

describe('UpsertDocketComponent', () => {
  let component: UpsertDocketComponent;
  let fixture: ComponentFixture<UpsertDocketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertDocketComponent]
    });
    fixture = TestBed.createComponent(UpsertDocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
