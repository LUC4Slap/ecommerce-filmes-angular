import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFilme } from './card-filme';

describe('CardFilme', () => {
  let component: CardFilme;
  let fixture: ComponentFixture<CardFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFilme],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFilme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
