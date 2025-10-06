import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullswingAngularLibraryComponent } from './fullswing-angular-library.component';

describe('FullswingAngularLibraryComponent', () => {
  let component: FullswingAngularLibraryComponent;
  let fixture: ComponentFixture<FullswingAngularLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullswingAngularLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullswingAngularLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
