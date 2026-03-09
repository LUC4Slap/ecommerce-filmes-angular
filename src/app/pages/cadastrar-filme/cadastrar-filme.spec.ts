import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFilme } from './cadastrar-filme';

describe('CadastrarFilme', () => {
  let component: CadastrarFilme;
  let fixture: ComponentFixture<CadastrarFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarFilme],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarFilme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
