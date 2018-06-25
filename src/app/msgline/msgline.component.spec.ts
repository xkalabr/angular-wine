import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsglineComponent } from './msgline.component';

describe('MsglineComponent', () => {
  let component: MsglineComponent;
  let fixture: ComponentFixture<MsglineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsglineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsglineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
