import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateUserPageComponent } from './add-update-user-page.component';

describe('AddUpdateUserPageComponent', () => {
  let component: AddUpdateUserPageComponent;
  let fixture: ComponentFixture<AddUpdateUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
