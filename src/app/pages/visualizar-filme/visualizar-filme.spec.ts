import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFilme } from './visualizar-filme';

describe('VisualizarFilme', () => {
  let component: VisualizarFilme;
  let fixture: ComponentFixture<VisualizarFilme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarFilme],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarFilme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
