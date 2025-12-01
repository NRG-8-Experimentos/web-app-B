import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFloatingList } from './notification-floating-list';

describe('NotificationFloatingList', () => {
  let component: NotificationFloatingList;
  let fixture: ComponentFixture<NotificationFloatingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationFloatingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFloatingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
