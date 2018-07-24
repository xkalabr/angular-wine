import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventComponent } from './advent.component';

describe('AdventComponent', () => {
  let component: AdventComponent;
  let fixture: ComponentFixture<AdventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
