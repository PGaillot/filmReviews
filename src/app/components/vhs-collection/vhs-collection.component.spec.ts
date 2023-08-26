import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhsCollectionComponent } from './vhs-collection.component';

describe('VshCollectionComponent', () => {
  let component: VhsCollectionComponent;
  let fixture: ComponentFixture<VhsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VhsCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VhsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
