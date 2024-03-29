import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaSpy, PrismaSpy } from 'test/unit-tests';
import { PrismaService } from '../services/prisma.service';
import { BaseRepository } from './base.repository';

describe('BaseRepository', () => {
  let repository: BaseRepository;
  let prismaSpy: PrismaSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseRepository,
        {
          provide: PrismaService,
          useValue: createPrismaSpy(['foos']),
        },
      ],
    }).compile();
    repository = module.get(BaseRepository);
    prismaSpy = module.get(PrismaService);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('find()', () => {
    beforeEach(() => {
      prismaSpy.foos.findMany.mockResolvedValue([{}]);
    });

    it('should return array of foos', () => {
      return expect(repository.find('foos')).resolves.toEqual([{}]);
    });
  });

  describe('findOne()', () => {
    beforeEach(() => {
      prismaSpy.foos.findFirst.mockResolvedValue({});
    });

    it('should return a foo', async () => {
      return expect(repository.findOne(1, 'foos')).resolves.toEqual({});
    });
  });
});
