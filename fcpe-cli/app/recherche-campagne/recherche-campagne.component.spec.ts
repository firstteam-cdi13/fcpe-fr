import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCampagneComponent } from './recherche-campagne.component';

describe('RechercheCampagneComponent', () => {
  let component: RechercheCampagneComponent;
  let fixture: ComponentFixture<RechercheCampagneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheCampagneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
