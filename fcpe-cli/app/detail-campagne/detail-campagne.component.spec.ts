import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCampagneComponent } from './detail-campagne.component';

describe('DetailCampagneComponent', () => {
  let component: DetailCampagneComponent;
  let fixture: ComponentFixture<DetailCampagneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCampagneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
