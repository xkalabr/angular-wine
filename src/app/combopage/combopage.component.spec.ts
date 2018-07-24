import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombopageComponent } from './combopage.component';

describe('CombopageComponent', () => {
  let component: CombopageComponent;
  let fixture: ComponentFixture<CombopageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombopageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
