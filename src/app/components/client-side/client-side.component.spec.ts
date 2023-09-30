import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSideComponent } from './client-side.component';

describe('ClientSideComponent', () => {
  let component: ClientSideComponent;
  let fixture: ComponentFixture<ClientSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSideComponent]
    });
    fixture = TestBed.createComponent(ClientSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
