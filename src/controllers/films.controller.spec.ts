import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from '../services/films.service';
import { mockFilm, mockFilm2, mockFilm3 } from '../../test/film.mock';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockFilm),
            findAll: jest
              .fn()
              .mockResolvedValue([mockFilm, mockFilm2, mockFilm3]),
            findOne: jest.fn().mockResolvedValue(mockFilm),
            update: jest.fn().mockResolvedValue(mockFilm),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Testa o findAll', () => {
    it('deve retornar uma lista de filmes', async () => {
      //Act
      const result = await controller.findAll();

      //Assert
      expect(result).toEqual([mockFilm, mockFilm2, mockFilm3]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('deve falhar', () => {
      //Arrange
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.findAll).rejects.toThrow();
    });
  });
  describe('Testa o create', () => {
    it('deve criar um filme', async () => {
      //Act
      const result = await controller.create(mockFilm);

      //Assert
      expect(result).toEqual(mockFilm);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(mockFilm);
    });
    it('deve retornar um erro ao falhar', () => {
      //Arrange
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.create).rejects.toThrow();
    });
  });
  describe('Testa o findOne', () => {
    it('deve retornar um filme', async () => {
      //Act
      const result = await controller.findOne('1');

      //Assert
      expect(result).toEqual(mockFilm);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
    it('deve ocorrer um erro', () => {
      //Arrange
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.findOne).rejects.toThrow();
    });
  });
  describe('Testa o update', () => {
    it('deve atualizar um filme', async () => {
      //Act
      const result = await controller.update('1', mockFilm);

      //Assert
      expect(result).toEqual(mockFilm);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(1, mockFilm);
    });
    it('deve falhar', () => {
      //Arrange
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.update).rejects.toThrow();
    });
  });
  describe('Testa o remove', () => {
    it('deve remover um filme', async () => {
      //Act
      const result = await controller.remove('1');

      //Assert
      expect(result).toBeUndefined();
    });
    it('deve retornar um erro', () => {
      //Arrange
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.remove).rejects.toThrow();
    });
  });
});
