import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxReceipeComponent } from './tx-receipe.component';

describe('TxReceipeComponent', () => {
  let component: TxReceipeComponent;
  let fixture: ComponentFixture<TxReceipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxReceipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxReceipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
