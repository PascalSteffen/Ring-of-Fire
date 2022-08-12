import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerdialogComponent } from './add-playerdialog.component';

describe('AddPlayerdialogComponent', () => {
  let component: AddPlayerdialogComponent;
  let fixture: ComponentFixture<AddPlayerdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayerdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlayerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
