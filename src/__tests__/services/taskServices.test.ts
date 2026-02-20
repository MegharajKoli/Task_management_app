import taskServices from "../../services/taskServices";
import { Status } from "../../domain/taskEnums";
import { AppError } from "../../middlewares/appError";
import { TaskMapper } from "../../helpers/mapperUtility";

// 🔹 mock mapper (static)
jest.mock("../../helpers/mapperUtility", () => ({
  TaskMapper: {
    toPersistence: jest.fn(),
  },
}));

describe("taskServices", () => {
  let service: taskServices;

  // 🔹 mocks
  let mockRepo: any;
  let mockAssignment: any;
  let mockActivity: any;
  let mockDomain: any;
  let mockNotification: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRepo = {
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    mockAssignment = {
      resolveUser: jest.fn(),
    };

    mockActivity = {
      taskCreated: jest.fn(),
      taskDeleted: jest.fn(),
      taskUpdated: jest.fn(),
    };

    mockDomain = {
      changeStatus: jest.fn(),
    };

    mockNotification = {
      taskCreated: jest.fn(),
      taskUpdated: jest.fn(),
    };

    service = new taskServices(
      mockRepo,
      mockAssignment,
      mockActivity,
      mockDomain,
      mockNotification
    );
  });

  // =====================================================
  // ✅ CREATE TASK
  // =====================================================

  describe("createNewTask", () => {
    it("should create task successfully", async () => {
      const mockUser = { _id: "user123" };
      const mockTask = { _id: "task123" };

      mockAssignment.resolveUser.mockResolvedValue(mockUser);
      mockRepo.create.mockResolvedValue(mockTask);

      const result = await service.createNewTask({
        title: "Test Task",
        assigned_to: "email@test.com",
      } as any);

      // assertions
      expect(mockAssignment.resolveUser).toHaveBeenCalled();
      expect(mockRepo.create).toHaveBeenCalled();
      expect(mockNotification.taskCreated).toHaveBeenCalled();
      expect(mockActivity.taskCreated).toHaveBeenCalled();
      expect(result).toBe(mockTask);
    });
  });

  // =====================================================
  // ✅ DELETE TASK
  // =====================================================

  describe("delete", () => {
    it("should delete task", async () => {
      mockRepo.delete.mockResolvedValue(true);

      await service.delete("task1");

      expect(mockRepo.delete).toHaveBeenCalledWith("task1");
      expect(mockActivity.taskDeleted).toHaveBeenCalledWith("task1");
    });

    it("should throw error if task not found", async () => {
      mockRepo.delete.mockResolvedValue(false);

      await expect(service.delete("bad-id")).rejects.toThrow(AppError);
    });
  });

  // =====================================================
  // ✅ UPDATE TASK
  // =====================================================

  describe("update", () => {
    it("should update status and assignment", async () => {
      const existingTask = { status: Status.Open };
      const mockUser = { _id: "user123" };
      const updatedTask = { _id: "task1" };

      mockRepo.findById.mockResolvedValue(existingTask);
      mockAssignment.resolveUser.mockResolvedValue(mockUser);
      (TaskMapper.toPersistence as jest.Mock).mockReturnValue({
        assigned_to: "user123",
      });
      mockRepo.update.mockResolvedValue(updatedTask);

      const result = await service.update("task1", {
        status: Status.InProgress,
        assigned_to: "email@test.com",
      } as any);

      expect(mockDomain.changeStatus).toHaveBeenCalled();
      expect(mockRepo.update).toHaveBeenCalled();
      expect(mockActivity.taskUpdated).toHaveBeenCalledWith("task1");
      expect(mockNotification.taskUpdated).toHaveBeenCalled();
      expect(result).toBe(updatedTask);
    });

    it("should throw if task not found", async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.update("bad-id", {} as any)).rejects.toThrow(
        AppError
      );
    });
  });

  // =====================================================
  // ✅ FETCH ALL
  // =====================================================

  describe("fetchAllTask", () => {
    it("should return all tasks", async () => {
      const tasks = [{ id: 1 }];
      mockRepo.findAll.mockResolvedValue(tasks);

      const result = await service.fetchAllTask();

      expect(result).toBe(tasks);
    });
  });
});