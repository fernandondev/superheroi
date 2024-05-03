import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroiService } from './superheroi.service';

describe('SuperheroiService', () => {
  let service: SuperheroiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroiService],
    }).compile();

    service = module.get<SuperheroiService>(SuperheroiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
