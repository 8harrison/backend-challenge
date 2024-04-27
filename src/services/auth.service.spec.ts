import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { mockToken, mockUser_1 } from '../../test/user.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // {
        //     provide: AuthService,
        //     useValue: {
        //         //validateUser: jest.fn().mockResolvedValue(mockToken),
        //         createToken: jest.fn(),
        //     }
        // },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser_1),
          },
        },
        {
          provide: getEntityManagerToken(),
          useValue: {},
        },
        JwtService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(mockToken),
          },
        },
        UserService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Testa validateUser', () => {
    it('deve validar um usuário', async () => {
      //Act
      const result = await service.validateUser(
        mockUser_1.username,
        mockUser_1.password,
      );

      //Assert

      expect(result).toEqual(mockToken);
    });
    it('caso de falha de validateUser', () => {
      //Arrange
      jest.spyOn(service, 'validateUser').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.validateUser).rejects.toThrow();
    });
    it('caso de falha de createToken', () => {
      //Arrange
      jest.spyOn(service, 'createToken').mockRejectedValueOnce(new Error());

      //Assert
      expect(service.createToken).rejects.toThrow();
    });
  });
});
