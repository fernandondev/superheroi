import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroiController } from './superheroi.controller';

describe('SuperheroiController', () => {
  let controller: SuperheroiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroiController],
    }).compile();

    controller = module.get<SuperheroiController>(SuperheroiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
