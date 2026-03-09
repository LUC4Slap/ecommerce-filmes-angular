import { TestBed } from '@angular/core/testing';

import { BuscarFilmes } from './buscar-filmes';

describe('BuscarFilmes', () => {
  let service: BuscarFilmes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarFilmes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
