import UserServices from '../../services/userServices';
import { UserRepository } from '../../repositories/userRepository';
import { NotificationHelper } from '../../helpers/notificationHelper';

describe('UserServices', () => {
  let userService: UserServices;

  // typed mocks
  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const mockNotificationHelper = {
    sendWelcome: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    userService = new UserServices(
      mockRepository as unknown as UserRepository,
      mockNotificationHelper as unknown as NotificationHelper
    );
  });

  describe('createNewUser', () => {
    it('should create user and send welcome notification', async () => {
      // Arrange
      const userData = { name: 'Megharaj', email: 'megharaj@test.com', password: 'password123',contact: '9876543210',};
      const createdUser = { _id: 'u1', ...userData };

      mockRepository.create.mockResolvedValue(createdUser);
      mockNotificationHelper.sendWelcome.mockResolvedValue(undefined);

      // Act
      const result = await userService.createNewUser(userData);

      // Assert
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledWith(userData);

      expect(mockNotificationHelper.sendWelcome).toHaveBeenCalledTimes(1);
      expect(mockNotificationHelper.sendWelcome).toHaveBeenCalledWith(createdUser);

      expect(result).toEqual(createdUser);
    });

    it('should throw error if repository.create fails', async () => {
      // Arrange
      const userData = { name: 'Megharaj', email: 'megharaj@test.com',password: 'password123',
  contact: '9876543210' };
      const dbError = new Error('DB failure');

      mockRepository.create.mockRejectedValue(dbError);

      // Act + Assert
      await expect(userService.createNewUser(userData)).rejects.toThrow('DB failure');

      expect(mockNotificationHelper.sendWelcome).not.toHaveBeenCalled();
    });
  });

  describe('fetchAllUsers', () => {
    it('should return all users', async () => {
      // Arrange
      const users = [
        { _id: 'u1', name: 'User1' },
        { _id: 'u2', name: 'User2' },
      ];

      mockRepository.findAll.mockResolvedValue(users);

      // Act
      const result = await userService.fetchAllUsers();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });
});