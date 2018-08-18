import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStartComponent } from './project-start.component';

describe('ProjectStartComponent', () => {
  let component: ProjectStartComponent;
  let fixture: ComponentFixture<ProjectStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
