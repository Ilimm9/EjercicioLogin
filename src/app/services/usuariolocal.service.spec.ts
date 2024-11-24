import { TestBed } from '@angular/core/testing';

import { UsuariolocalService } from './usuariolocal.service';

describe('UsuariolocalService', () => {
  let service: UsuariolocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariolocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
