import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListSelectionComponent } from './movies-list-selection.component';

describe('MoviesListSelectionComponent', () => {
  let component: MoviesListSelectionComponent;
  let fixture: ComponentFixture<MoviesListSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesListSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
