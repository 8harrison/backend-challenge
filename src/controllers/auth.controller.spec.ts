import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { mockToken, mockUser_1 } from '../../test/user.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue(mockToken),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser_1),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Testa o register', () => {
    it('deve registrar um usuário', async () => {
      //Act
      const result = await controller.register(mockUser_1);

      //Assert
      expect(result).toEqual(mockUser_1);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('deve falhar', () => {
      //Arrange
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.register).rejects.toThrow();
    });
  });
  describe('Testa o login', () => {
    it('deve logar um usuário', async () => {
      //Act
      const result = await controller.login(mockUser_1);

      //Assert
      expect(result).toEqual(mockToken);
      expect(authService.validateUser).toHaveBeenCalledTimes(1);
      expect(authService.validateUser).toHaveBeenCalledWith(
        mockUser_1.username,
        mockUser_1.password,
      );
    });
    it('deve retornar um erro ao falhar', () => {
      //Arrange
      jest
        .spyOn(authService, 'validateUser')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.login).rejects.toThrow();
    });
  });
});
