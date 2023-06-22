import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSessionComponent } from './sort-session.component';

describe('SortSessionComponent', () => {
  let component: SortSessionComponent;
  let fixture: ComponentFixture<SortSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
