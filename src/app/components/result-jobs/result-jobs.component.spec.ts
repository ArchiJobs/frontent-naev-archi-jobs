import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultJobsComponent } from './result-jobs.component';

describe('ResultJobsComponent', () => {
  let component: ResultJobsComponent;
  let fixture: ComponentFixture<ResultJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
