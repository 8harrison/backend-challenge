import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { mockUser_1, mockUser_2, mockUser_3 } from '../../test/user.mock';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockReturnValue(mockUser_1),
            create: jest.fn().mockResolvedValue(mockUser_1),
            find: jest
              .fn()
              .mockResolvedValue([mockUser_1, mockUser_2, mockUser_3]),
            findOne: jest.fn().mockResolvedValue(mockUser_1),
          },
        },
        {
          provide: getEntityManagerToken(),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testa o create', () => {
    it('deve criar um usuário', async () => {
      //Act
      const result = await service.create(mockUser_1);

      //Assert
      expect(result).toEqual(mockUser_1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
    });

    it('deve falhar ao criar usuário', () => {
      //Arrange
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.create(mockUser_1)).rejects.toThrow();
    });
  });

  describe('Testa o findAll', () => {
    it('deve retornar uma lista com os usuários', async () => {
      //Act
      const result = await service.findAll();

      //Assert
      expect(result).toEqual([mockUser_1, mockUser_2, mockUser_3]);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });
    it('deve falhar', () => {
      //Arrange
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.findAll()).rejects.toThrow();
    });
  });

  describe('Testa o findOneByUsername', () => {
    it('deve encontrar um usuário', async () => {
      //Act
      const result = await service.findOneByUsername(mockUser_1.username);

      //Assert
      expect(result).toEqual(mockUser_1);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('deve falhar', () => {
      //Arrange
      jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.findOneByUsername(mockUser_1.username)).rejects.toThrow();
    });
  });
});
