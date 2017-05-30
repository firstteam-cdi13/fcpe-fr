import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifieUtilisateurComponent } from './identifie-utilisateur.component';

describe('IdentifieUtilisateurComponent', () => {
  let component: IdentifieUtilisateurComponent;
  let fixture: ComponentFixture<IdentifieUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifieUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifieUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
