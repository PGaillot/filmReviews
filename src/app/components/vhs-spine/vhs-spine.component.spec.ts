import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhsSpineComponent } from './vhs-spine.component';

describe('VhsSpineComponent', () => {
  let component: VhsSpineComponent;
  let fixture: ComponentFixture<VhsSpineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VhsSpineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VhsSpineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
