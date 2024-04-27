import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { data, mockFilm, mockFilm2, mockFilm3 } from '../../test/film.mock';
import { Director } from '../entities/director.entity';
import { Genre } from '../entities/genre.entity';
import { Actor } from '../entities/actor.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: Repository<Film>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: {
            save: jest.fn().mockReturnValue(data),
            find: jest.fn().mockResolvedValue([mockFilm, mockFilm2, mockFilm3]),
            findOne: jest.fn().mockResolvedValue(mockFilm),
            findOneBy: jest.fn().mockResolvedValue(mockFilm),
            delete: jest.fn().mockReturnValue(undefined),
            create: jest.fn().mockResolvedValue(data),
          },
        },
        {
          provide: getRepositoryToken(Director),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Genre),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Actor),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getEntityManagerToken(),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testa o findAll', () => {
    it('deve retornar uma lista de filmes', async () => {
      //Act
      const result = await service.findAll();
      //Assert
      expect(filmRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockFilm, mockFilm2, mockFilm3]);
    });

    it('deve falhar', () => {
      //Arrange
      jest.spyOn(filmRepository, 'find').mockRejectedValueOnce(new Error());
      //Assert
      expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('Testa o findOne', () => {
    it('deve retornar um filme', async () => {
      //Act
      const result = await service.findOne(1);

      //Assert
      expect(filmRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockFilm);
    });

    it('deve falhar', () => {
      //Arrange
      jest
        .spyOn(filmRepository, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      //Assert
      expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('Testa o create', () => {
    it('deve criar um filme', async () => {
      //Act
      const result = await service.create(data);

      //Assert
      expect(result).toEqual(data);
      expect(filmRepository.create).toHaveBeenCalledTimes(1);
      expect(filmRepository.save).toHaveBeenCalledTimes(1);
    });

    it('deve falhar', () => {
      //Arrange
      jest.spyOn(filmRepository, 'save').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.create(data)).rejects.toThrow();
    });
  });

  describe('Testa o update', () => {
    it('deve atualizar um filme', async () => {
      //Arrange
      jest.spyOn(filmRepository, 'save').mockResolvedValueOnce(mockFilm);

      //Act
      const result = await service.update(1, mockFilm);

      //Assert
      expect(result).toEqual(mockFilm);
    });

    it('deve retornar um erro para um id inválido', () => {
      //Arrange
      jest
        .spyOn(filmRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(service.update(1, mockFilm)).rejects.toThrow();
    });

    it('deve retornar um erro ao não conseguir salvar', () => {
      //Arrange
      jest.spyOn(filmRepository, 'save').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.update(1, mockFilm)).rejects.toThrow();
    });
  });

  describe('Testa o remove', () => {
    it('deve remover um filme', async () => {
      // Act
      const result = await service.remove(1);

      //Assert
      expect(result).toBeUndefined();
      expect(filmRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('deve retornar um erro ao tentar excluir', () => {
      //Arrange
      jest.spyOn(filmRepository, 'delete').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.remove(1)).rejects.toThrow();
    });
  });
});
