import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBetFormComponent } from './open-bet-form.component';

describe('OpenBetFormComponent', () => {
  let component: OpenBetFormComponent;
  let fixture: ComponentFixture<OpenBetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenBetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
